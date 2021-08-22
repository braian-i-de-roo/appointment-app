name := "backend"

version := "0.1"

scalaVersion := "3.0.1"

libraryDependencies ++= Seq(
  "dev.zio" %% "zio" % "1.0.11",
  "io.d11" %% "zhttp" % "1.0.0.0-RC17",
  "dev.zio" %% "zio-json" % "0.2.0-M1",
)
