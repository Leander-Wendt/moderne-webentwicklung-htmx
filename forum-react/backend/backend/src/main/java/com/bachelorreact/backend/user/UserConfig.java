package com.bachelorreact.backend.user;

import com.bachelorreact.backend.comment.Comment;
import com.bachelorreact.backend.post.Post;
import com.bachelorreact.backend.post.PostRepository;
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
    CommandLineRunner commandLineRunner(UserRepository userRepository, PostRepository postRepository) {
        return args -> {
            User userA = new User("Bernd", passwordEncoder.encode("Bernd123"), UserRole.USER, "Bernd");
            User userB = new User("JD", passwordEncoder.encode("JD123"), UserRole.USER, "JD");
            User userC = new User("Admin", passwordEncoder.encode("123"), UserRole.ADMIN, "Admin");

            Post commentA = new Post("This restaurant is amazing!", "Im talking about my place in made up street 3", userA);
            Post commentB = new Post("I love this new Game by Game Company.", "Its the most amazing I've ever seen, can't wait until its released.", userB);
            Post commentC = new Post("Working in the Hospital is so much fun.", "I love to help all these people and learn new stuff every day.", userB);
            Post commentD = new Post("Planned maintenance on Thursday.", "", userC);

            userRepository.saveAll(List.of(userA, userB, userC));
            postRepository.saveAll(List.of(commentA, commentB, commentC, commentD));
        };
    }
}