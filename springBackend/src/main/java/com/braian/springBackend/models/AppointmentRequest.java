package com.braian.springBackend.models;


import dev.morphia.annotations.*;
import lombok.Data;

import java.time.Instant;

@Data
public class AppointmentRequest {
    @Property("doctor_name")
    private String doctorName;

    private Instant time;
}
