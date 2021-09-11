package com.braian.springBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.morphia.annotations.Entity;
import dev.morphia.annotations.*;
import lombok.Data;

import java.time.Instant;

@Data
@Entity(value = "appointment", useDiscriminator = false)
public class Appointment {
    @Id
    @JsonIgnore
    private String id;

    @Property("doctor_name")
    private String doctorName;

    private Instant time;
}
