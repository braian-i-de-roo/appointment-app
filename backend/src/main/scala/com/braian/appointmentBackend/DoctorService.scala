package com.braian.appointmentBackend

import zio.*
import zio.json.*

import java.time.Instant

case class Doctor(name: String)

object Doctor:
  implicit val encoder: JsonEncoder[Doctor] = DeriveJsonEncoder.gen[Doctor]

case class TimeSlot(hour: Int, minute: Int, prettyName: String)

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
  private val doctors: Map[String, Doctor] = Map(
    "Pepe" -> Doctor("Pepe"),
    "Juan" -> Doctor("Juan"),
    "Roberto" -> Doctor("Roberto"),
    "Jose" -> Doctor("Jose"),
  )
  private val times: Map[String, List[TimeSlot]] = Map(
    "Pepe" -> List(TimeSlot(9, 0, "9 AM"), TimeSlot(10, 0, "10 AM"), TimeSlot(15, 0, "3 PM")),
    "Juan" -> List(TimeSlot(10, 0, "10 AM"), TimeSlot(11, 0, "11 AM")),
    "Roberto" -> List(TimeSlot(16, 0, "4 PM"), TimeSlot(17, 0, "5 PM"), TimeSlot(18, 0, "6 PM")),
    "Jose" -> List(TimeSlot(1, 0, "1 AM"), TimeSlot(2, 0, "2 AM")),
  )
  def make: ULayer[Has[DoctorService]] =
    (for {
      r <- Ref.make(doctors)
      t <- Ref.make(times)
    } yield LiveDoctorService(r, t)).toLayer
