package com.bachelorreact.backend.post;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service

public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post getPost(UUID id) {
        return postRepository.getReferenceById(id);
    }

    public void addPost(Post post) {
        postRepository.save(post);
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
