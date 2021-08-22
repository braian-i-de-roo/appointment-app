package com.braian.appointmentBackend

import zhttp.http.*
import zhttp.service.Server
import zio.*
import zio.json.*

object Main extends App :

  val app = HttpApp.collectM {
    case Method.GET -> Root / "appointments" / user =>
      Service.getAppointments(user)
        .map(_.toJson)
        .map(x => Response.jsonString(x))
    case req@Method.POST -> Root / "appointments" / user =>
      val maybeBody = req.getBodyAsString
      maybeBody match
        case Some(body) =>
          println("body")
          println(body)
          val maybeRequest = body.fromJson[AppointmentRequest]
          maybeRequest match
            case Left(err) =>
              println("error")
              println(err)
              ZIO.succeed(Response.fromHttpError(HttpError.BadRequest("incorrect body")))
            case Right(request) =>
              Service.requestAppointment(user, request.desiredTime, request.doctorName)
                .map {
                  case Some(id) =>
                    Response.jsonString(id.toJson)
                  case None =>
                    Response.fromHttpError(HttpError.InternalServerError("random internal error"))
                }
        case None => ZIO.succeed(Response.fromHttpError(HttpError.BadRequest("no body")))
  }

  override def run(args: List[String]): URIO[zio.ZEnv, ExitCode] =
    Server.start(8091, CORS(app))
      .provideCustomLayer(LiveService.make)
      .exitCode
