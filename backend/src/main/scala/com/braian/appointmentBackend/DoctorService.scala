package com.braian.appointmentBackend

import zio.*
import zio.json.*

import java.time.Instant

case class Doctor(name: String)

object Doctor:
  implicit val encoder: JsonEncoder[Doctor] = DeriveJsonEncoder.gen[Doctor]

case class TimeSlot(time: Instant, prettyName: String)

object TimeSlot:
  implicit val encoder: JsonEncoder[TimeSlot] = DeriveJsonEncoder.gen[TimeSlot]

trait DoctorService:
  def getDoctors: UIO[List[Doctor]]
  def getAvailableTimes(doctor: String): UIO[List[TimeSlot]]

object DoctorService:
  def getDoctors =
    ZIO.service[DoctorService] >>= (_.getDoctors)

  def getAvailableTimes(doctor: String) =
    ZIO.service[DoctorService] >>= (_.getAvailableTimes(doctor))

case class LiveDoctorService(m: Ref[Map[String, Doctor]], t: Ref[Map[String, List[TimeSlot]]]) extends DoctorService:
  override def getDoctors =
    m.get.map(_.values.toList)

  override def getAvailableTimes(doctor: String) =
    t.get.map(_.get(doctor)).some.orElse(ZIO.succeed(List()))

object LiveDoctorService:
  def make: ULayer[Has[DoctorService]] =
    (for {
      r <- Ref.make(Map.empty[String, Doctor])
      t <- Ref.make(Map.empty[String, List[TimeSlot]])
    } yield LiveDoctorService(r, t)).toLayer
