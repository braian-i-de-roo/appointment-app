package com.braian.springBackend.services;

import com.braian.springBackend.datastores.AppointmentsDatastore;
import com.braian.springBackend.models.Appointment;
import com.braian.springBackend.models.AppointmentRequest;
import com.braian.springBackend.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentsService {

    private final AppointmentsDatastore appointmentsDatastore;
    private final SessionUtil sessionUtil;
    private final UserService userService;

    @Autowired
    private AppointmentsService(AppointmentsDatastore appointmentsDatastore,
                                SessionUtil sessionUtil,
                                UserService userService) {
        this.appointmentsDatastore = appointmentsDatastore;
        this.sessionUtil = sessionUtil;
        this.userService = userService;
    }

    public List<Appointment> getAppointments() {
        var userName = sessionUtil.getUserName();
        var user = userService.getByName(userName);
        if (user.isPresent()) {
            return appointmentsDatastore.getByUserId(user.get().getId());
        } else {
            return new ArrayList<>();
        }
    }

    public Optional<Appointment> requestAppointment(AppointmentRequest appointmentRequest) {
        return Optional.empty();
    }
}
