package com.braian.springBackend.datastores;

import com.braian.springBackend.models.User;
import dev.morphia.Datastore;
import dev.morphia.query.experimental.filters.Filters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class UserDatastore {

    private final Datastore datastore;

    @Autowired
    private UserDatastore(Datastore datastore) {
        this.datastore = datastore;
    }

    public User save(User data) {
        data.setId(UUID.randomUUID().toString());
        return datastore.save(data);
    }

    public Optional<User> getById(String id) {
        var query = datastore.find(User.class)
                .filter(Filters.eq("_id", id));
        return Optional.ofNullable(query.first());
    }

    public Optional<User> getByName(String name) {
        var query = datastore.find(User.class)
                .filter(Filters.eq("name", name));
        return Optional.ofNullable(query.first());
    }
}
