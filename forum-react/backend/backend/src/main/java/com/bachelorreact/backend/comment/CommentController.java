package com.bachelorreact.backend.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @RequestMapping("/comments")
    public List<Comment> getAllComments() {
        return commentService.getComments();
    }

    @RequestMapping("/comments/{id}")
    public Comment getComment(@PathVariable UUID id) {
        return commentService.getComment(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/comments")
    public void addComment(@RequestBody Comment comment) {
        commentService.addComment(comment);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/comments/{id}")
    public void updateComment(@RequestBody Comment comment, @PathVariable UUID id) {
        commentService.updateComment(id, comment);
    }

    @RequestMapping(value = "/comments/{id}", method = RequestMethod.DELETE)
    public void deleteComment(@PathVariable UUID id) {
        commentService.deleteComment(id);
    }
}
