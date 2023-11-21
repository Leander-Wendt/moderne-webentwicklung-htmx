package com.bachelorhtmx.backend.htmx;

import com.bachelorhtmx.backend.post.Post;
import com.bachelorhtmx.backend.post.PostService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Controller
public class HtmxController {

    // TODO:
    // Form Input Validation
    // Auth Flow
    // Dynamic nav
    // Input Validation in React and Thymeleaf, especially no empty title for create/update Post
    private final PostService postService;

    public HtmxController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("posts", postService.getPosts());
        return "index.html";
    }
    @GetMapping("/login")
    public String login() {
        return "Login";
    }

    @GetMapping("/register")
    public String register() {
        return "Register";
    }

    @GetMapping("/post/new")
    public String createPost(Model model) {
        model.addAllAttributes(Map.of("formTitle", "Create Post", "title", "", "body", "", "buttonValue", "Post"));
        return "PostForm";
    }

    @RequestMapping("/post/{id}")
    public String getPost(@PathVariable UUID id, Model model) {
        Post post = postService.getPost(id);
        model.addAttribute("post", post);
        model.addAttribute("subtitle", String.format(post.getAuthor().getDisplayname() + " posted on " + new SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY).format(post.getUpdated_at())));
        return "Post";
    }

    @GetMapping(value = "/favicon.ico")
    public @ResponseBody byte[] getImage() throws IOException {
        Resource resource = new ClassPathResource("favicon.ico");
        return resource.getContentAsByteArray();
    }

    @GetMapping("/posts")
    public String getPosts(Model model) {
        model.addAttribute("posts", postService.getPosts());
        return "fragments/Posts";
    }

    @RequestMapping("/post/{id}/edit")
    public String editPost(@PathVariable UUID id, Model model) {
        Post post = postService.getPost(id);
        model.addAllAttributes(Map.of("formTitle", "Edit Post", "title", post.getTitle(), "body", post.getBody(), "buttonValue", "Update"));
        return "PostForm";
    }
}
