package com.bachelorreact.backend.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @RequestMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getPosts();
    }

    @RequestMapping("/posts/{id}")
    public Post getPost(@PathVariable UUID id) {
        return postService.getPost(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/posts")
    public void addPost(@RequestBody Post post, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        postService.addPost(post, token);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/posts/{id}")
    public void updatePost(@RequestBody Post post, @PathVariable UUID id) {
        postService.updatePost(id, post);
    }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE)
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }
}
