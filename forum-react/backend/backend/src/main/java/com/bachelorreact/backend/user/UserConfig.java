package com.bachelorreact.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User userA = new User("Bernd", "Bernd123", UserRole.USER, "Bernd");
            User userB = new User("JD", "JD123", UserRole.USER, "JD");
            User userC = new User("Admin", "12345678", UserRole.ADMIN, "Admin");

            repository.saveAll(List.of(userA, userB, userC));
        };
    }
}