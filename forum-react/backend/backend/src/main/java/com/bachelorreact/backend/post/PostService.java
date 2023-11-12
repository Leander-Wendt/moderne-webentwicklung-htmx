package com.bachelorreact.backend.post;

import com.bachelorreact.backend.config.JwtService;
import com.bachelorreact.backend.exception.ApiNotFoundException;
import com.bachelorreact.backend.user.User;
import com.bachelorreact.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service

public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final JwtService jwtService;

    public PostService(PostRepository postRepository, UserRepository userRepository, JwtService jwtService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post getPost(UUID id) {
        var post = postRepository.findById(id);
        if (post.isEmpty()) {
            throw new ApiNotFoundException("Post with given ID doesn't exist.");
        }
        return post.get();
    }

    public Post addPost(Post post, String token) {
        User user = userRepository.findByUsername(jwtService.extractUsername(token.split(" ")[1])).get();
        post.setAuthor(user);
        return postRepository.save(post);
    }

    public void updatePost(UUID id, Post post) {
        if (postRepository.getReferenceById(id) == null) {
            throw new EntityNotFoundException();
        }
        postRepository.save(post);
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }
}
