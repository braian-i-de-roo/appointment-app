package com.braian.springBackend.config;

import com.mongodb.client.MongoClient;
import dev.morphia.Datastore;
import dev.morphia.Morphia;
import dev.morphia.mapping.MapperOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MorphiaConfiguration {
    private final MongoClient mongoClient;

    @Autowired
    public MorphiaConfiguration(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Bean
    public Datastore datastore() {
        MapperOptions mapperOptions = MapperOptions.builder()
                .storeEmpties(true)
                .build();
        final Datastore datastore = Morphia.createDatastore(mongoClient, "core", mapperOptions);
        datastore.getMapper().mapPackage("com.braian.springBackend.models");
        datastore.ensureIndexes();
        return datastore;
    }
}
