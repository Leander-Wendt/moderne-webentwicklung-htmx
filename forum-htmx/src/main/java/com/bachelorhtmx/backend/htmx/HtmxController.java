package com.bachelorhtmx.backend.htmx;

import com.bachelorhtmx.backend.post.Post;
import com.bachelorhtmx.backend.post.PostService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@Controller
public class HtmxController {

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
    public String createPost() {
        return "CreatePost";
    }

    @RequestMapping("/post/{id}")
    public String getPost(@PathVariable UUID id, Model model) {
        model.addAttribute("post", postService.getPost(id));
        return "Post";
    }

    @GetMapping(value = "/favicon.ico")
    public @ResponseBody byte[] getImage() throws IOException {
        Resource resource = new ClassPathResource("favicon.ico");
        return resource.getContentAsByteArray();
    }
}
