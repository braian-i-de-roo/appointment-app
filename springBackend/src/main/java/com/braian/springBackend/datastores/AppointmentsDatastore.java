package com.braian.springBackend.datastores;

import com.braian.springBackend.models.Appointment;
import dev.morphia.Datastore;
import dev.morphia.query.FindOptions;
import dev.morphia.query.experimental.filters.Filters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AppointmentsDatastore {

    private final Datastore datastore;

    @Autowired
    private AppointmentsDatastore(Datastore datastore) {
        this.datastore = datastore;
    }

    public List<Appointment> getByUserId(String id) {
        var query = datastore.find(Appointment.class)
                .filter(Filters.eq("owner_id", id));
        return query.iterator(new FindOptions()).toList();
    }
}
