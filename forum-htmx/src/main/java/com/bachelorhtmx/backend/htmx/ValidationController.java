package com.bachelorhtmx.backend.htmx;

import com.bachelorhtmx.backend.auth.RegisterRequest;
import com.bachelorhtmx.backend.post.Post;
import com.bachelorhtmx.backend.post.PostService;
import com.bachelorhtmx.backend.user.User;
import com.bachelorhtmx.backend.user.UserService;
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
@RequestMapping("/validation")
public class ValidationController {
    private final PostService postService;
    private final UserService userService;

    public ValidationController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/register/username")
    public String validateUsername(Model model, @RequestBody RegisterRequest request) {
        User user = userService.getUserByUsername(request.getUsername());
        System.out.println(request);
        System.out.println(user);

        if (request.getUsername().length() < 2) {
            model.addAttribute("message", "Username must be between 2 and 24 characters long.");
        } else if (user != null) {
            model.addAttribute("message", "Username is already taken.");
        } else {
            model.addAttribute("message", "");
        }
        return "validation/UsernameInput";
    }

    @GetMapping("/login")
    public String login() {
        return "Login";
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
}
