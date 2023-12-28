package com.bachelorreact.backend.post;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @RequestMapping("/public/posts")
    public List<Post> getAllPosts() {
        return postService.getPosts();
    }

    @RequestMapping("/public/posts/{id}")
    public Post getPost(@PathVariable UUID id) {
        return postService.getPost(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/posts")
    public Post addPost(@RequestBody Post post, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return postService.addPost(post, token);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/posts/{id}")
    public Post updatePost(@RequestBody Post post, @PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return postService.updatePost(id, post, token);
    }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE)
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }
}
