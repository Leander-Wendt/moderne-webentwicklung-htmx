package com.bachelorreact.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Properties;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        if (System.getenv("DB_URL") == null) {
            Properties appProps = new Properties();
            appProps.setProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/postgres");
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}
