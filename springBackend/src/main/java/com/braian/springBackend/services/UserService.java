package com.braian.springBackend.services;

import com.braian.springBackend.datastores.UserDatastore;
import com.braian.springBackend.models.User;
import com.braian.springBackend.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDatastore userDatastore;

    @Autowired
    private UserService(UserDatastore appointmentsDatastore) {
        this.userDatastore = appointmentsDatastore;
    }

    public Optional<User> getByName(String name) {
        return userDatastore.getByName(name);
    }
}
