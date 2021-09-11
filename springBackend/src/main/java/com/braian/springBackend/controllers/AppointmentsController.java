package com.braian.springBackend.controllers;

import com.braian.springBackend.annotation.ApiController;
import com.braian.springBackend.models.Appointment;
import com.braian.springBackend.models.AppointmentRequest;
import com.braian.springBackend.roles.UserRoles;
import com.braian.springBackend.services.AppointmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@ApiController
public class AppointmentsController {
    private final AppointmentsService appointmentsService;

    @Autowired
    public AppointmentsController(AppointmentsService appointmentsService) {
        this.appointmentsService = appointmentsService;
    }

    @RolesAllowed(UserRoles.REGISTERED_USER)
    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        return appointmentsService.getAppointments();
    }

    @RolesAllowed(UserRoles.REGISTERED_USER)
    @PostMapping("/appointments")
    public Optional<Appointment> requestAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        return appointmentsService.requestAppointment(appointmentRequest);
    }
}
