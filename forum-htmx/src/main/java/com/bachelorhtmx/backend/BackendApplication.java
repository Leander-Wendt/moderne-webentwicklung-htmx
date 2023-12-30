package com.bachelorhtmx.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.util.Properties;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class BackendApplication {
    public static void main(String[] args) {
        if (System.getenv("DB_URL") != null) {
            Properties appProps = new Properties();
            appProps.setProperty("spring.datasource.url", System.getenv("DB_URL"));
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}
