package com.bachelorreact.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {

    private final PasswordEncoder passwordEncoder;

    public UserConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User userA = new User("Bernd", passwordEncoder.encode("Bernd123"), UserRole.USER, "Bernd");
            User userB = new User("JD", passwordEncoder.encode("JD123"), UserRole.USER, "JD");
            User userC = new User("Admin", passwordEncoder.encode("12345678"), UserRole.ADMIN, "Admin");

            repository.saveAll(List.of(userA, userB, userC));
        };
    }
}