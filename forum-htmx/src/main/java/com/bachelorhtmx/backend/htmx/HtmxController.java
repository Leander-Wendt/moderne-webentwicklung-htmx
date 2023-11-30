package com.bachelorhtmx.backend.htmx;

import com.bachelorhtmx.backend.config.JwtService;
import com.bachelorhtmx.backend.post.Post;
import com.bachelorhtmx.backend.post.PostService;
import com.bachelorhtmx.backend.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
    // FIX BE Server Security, validate JWTs !!!!
    // Form Input Validation
    // Auth Flow
    // Dynamic nav
    // https://stackoverflow.com/questions/19281821/spring-mvc-when-to-use-cookievalue
    // https://attacomsian.com/blog/cookies-spring-boot
    private final PostService postService;
    private final JwtService jwtService;
    private final UserService userService;

    private final UserDetailsService userDetailsService;

    public HtmxController(PostService postService, JwtService jwtService, UserService userService, UserDetailsService userDetailsService) {
        this.postService = postService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/")
    public String index(Model model, @CookieValue(value = "jwt", required = false) String jwtCookie) {
        Boolean loggedIn;

        if (jwtCookie == null) {
            loggedIn = false;
        } else {
            String username = jwtService.extractUsername(jwtCookie);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            loggedIn = jwtService.isTokenValid(jwtCookie, userDetails);
        }

        model.addAllAttributes(Map.of("posts", postService.getPosts(), "loggedIn", loggedIn));
        return "index.html";
    }

    @GetMapping(value = "/favicon.ico")
    public @ResponseBody byte[] getImage() throws IOException {
        Resource resource = new ClassPathResource("favicon.ico");
        return resource.getContentAsByteArray();
    }

    @GetMapping("/htmx/login")
    public String login(Model model, @CookieValue(value = "jwt", required = false) String jwtCookie) {
        model.addAttribute("loggedIn", jwtCookie != null);
        return "Login";
    }

    @GetMapping("/htmx/logout")
    public String logout(Model model, HttpServletResponse response) {
        model.addAllAttributes(Map.of("posts", postService.getPosts(), "loggedIn", false));
        Cookie cookie = new Cookie("jwt", "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return "index";
    }

    @GetMapping("/htmx/register")
    public String register(Model model, @CookieValue(value = "jwt", required = false) String jwtCookie) {
        model.addAllAttributes(Map.of("disabled", true, "loggedIn", jwtCookie != null));
        return "Register";
    }

    @GetMapping("/htmx/post/new")
    public String createPost(Model model) {
        model.addAllAttributes(Map.of("formTitle", "Create Post", "title", "", "body", "", "buttonValue", "Post"));
        return "PostForm";
    }

    @RequestMapping("/htmx/post/{id}")
    public String getPost(@PathVariable UUID id, Model model, @CookieValue(value = "jwt", required = false) String jwtCookie) {
        final Boolean isOwner;
        Post post = postService.getPost(id);

        if (jwtCookie.isEmpty()) {
            isOwner = false;
        } else {
            String username = jwtService.extractUsername(jwtCookie);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            isOwner = post.getAuthor().getUsername().equals(username) && jwtService.isTokenValid(jwtCookie, userDetails);
        }

        model.addAllAttributes(Map.of("post", post, "isOwner", isOwner, "subtitle", String.format(post.getAuthor().getDisplayname() + " posted on " + new SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY).format(post.getUpdated_at()))));

        return "Post";
    }

    @GetMapping("/htmx/posts")
    public String getPosts(Model model) {
        model.addAttribute("posts", postService.getPosts());
        return "fragments/Posts";
    }

    @RequestMapping("/htmx/post/{id}/edit")
    public String editPost(@PathVariable UUID id, Model model) {
        Post post = postService.getPost(id);
        model.addAllAttributes(Map.of("formTitle", "Edit Post", "title", post.getTitle(), "body", post.getBody(), "buttonValue", "Update"));
        return "PostForm";
    }
}
