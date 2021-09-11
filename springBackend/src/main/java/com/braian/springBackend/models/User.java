package com.braian.springBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Id;
import dev.morphia.annotations.Property;
import lombok.Data;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;
        import dev.morphia.annotations.Entity;
        import dev.morphia.annotations.*;
        import lombok.Data;

        import java.time.Instant;

@Data
@Entity(value = "appointment", useDiscriminator = false)
public class User {
    @Id
    @JsonIgnore
    private String id;

    private String name;
}
