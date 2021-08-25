package com.braian.appointmentBackend

import zio.*
import zio.random.Random
import zio.json.*
import java.time.Instant

case class AppointmentRequest(desiredTime: Instant, doctorName: String)

object AppointmentRequest:
  implicit val decoder: JsonDecoder[AppointmentRequest] = DeriveJsonDecoder.gen[AppointmentRequest]

case class Appointment(time: Instant, doctorName: String)

object Appointment:
  implicit val encoder: JsonEncoder[Appointment] = DeriveJsonEncoder.gen[Appointment]


trait UserService:
  def getAppointments(user: String): UIO[List[Appointment]]
  def requestAppointment(user: String, desiredTime: Instant, doctorName: String): UIO[Option[Long]]

object UserService:
  def getAppointments(user: String) =
    ZIO.service[UserService] >>= (_.getAppointments(user))

  def requestAppointment(user: String, desiredTime: Instant, doctorName: String) =
    ZIO.service[UserService] >>= (_.requestAppointment(user, desiredTime, doctorName))

case class LiveUserService(m: Ref[Map[String, List[Long]]], appointments: Ref[Map[Long, Appointment]], random: Random.Service) extends UserService:
  override def getAppointments(user: String): UIO[List[Appointment]] =
    for
      ma <- m.get.map(_.get(user))
      res <- ma match
        case Some(value) =>
          for
            ap <- appointments.get
            res = value.map(ap.get).flatten
          yield res
        case None => ZIO.succeed(List())
    yield res

  override def requestAppointment(user: String, desiredTime: Instant, doctorName: String): UIO[Option[Long]] =
    for
      r <- random.nextDouble.map(x => if (x > 0.75) false else true)
      res <- if (r) then
        for
          id <- random.nextLongBounded(Long.MaxValue) // I'm willing to take the risk
          oldList <- m.get.map(_.get(user))
          _ <- oldList match
            case Some(l) => m.update(_.updated(user, l :+ id))
            case None => m.update(_.updated(user, List(id)))
          newTime <- random.nextLongBounded(2000).map(_ - 1000).map( desiredTime.minusSeconds)
          _ <- appointments.update(_.updated(id, Appointment(newTime, doctorName)))
        yield Some(id)
      else
        ZIO.succeed(None)
    yield res


object LiveUserService:
  def make: ZLayer[Random, Nothing, Has[UserService]] =
    (for
      m <- Ref.make(Map.empty[String, List[Long]])
      a <- Ref.make(Map.empty[Long, Appointment])
      r <- ZIO.service[Random.Service]
    yield LiveUserService(m, a, r)).toLayer
