package com.bachelorhtmx.backend.htmx;

import com.bachelorhtmx.backend.post.PostService;
import com.bachelorhtmx.backend.user.User;
import com.bachelorhtmx.backend.user.UserService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("/validation")
public class ValidationController {
    private final PostService postService;
    private final UserService userService;

    public ValidationController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.TEXT_HTML_VALUE)
    public String validateUsername(Model model, @RequestParam Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        User user = userService.getUserByUsername(username);
        Boolean disabled = username == null || password == null;

        model.addAllAttributes(Map.of("usernameValue", username, "displaynameValue", body.get("displayname"), "passwordValue", password));

        if (username != null && (username.length() < 2 || username.length() > 24)) {
            model.addAttribute("usernameMessage", "Username must be between 2 and 24 characters long.");
            disabled = true;
        } else if (user != null) {
            model.addAttribute("usernameMessage", "Username is already taken.");
            disabled = true;
        }

        if (password.length() > 0 && (password.length() < 8 || password.length() > 40)) {
            model.addAttribute("passwordMessage", "Password must be between 8 and 40 characters long.");
            disabled = true;
        }

        model.addAttribute("disabled", disabled);
        return "Register";
    }

    @GetMapping("/login")
    public String login() {
        return "Login";
    }
}
