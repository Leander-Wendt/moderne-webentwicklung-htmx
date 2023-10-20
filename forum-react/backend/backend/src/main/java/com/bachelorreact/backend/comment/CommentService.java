package com.bachelorreact.backend.comment;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    public Comment getComment(UUID id) {
        return commentRepository.getReferenceById(id);
    }

    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    public void updateComment(UUID id, Comment comment) {
        if (commentRepository.getReferenceById(id) == null) {
            throw new EntityNotFoundException("Comment with given Id doesn't exist.");
        }
        commentRepository.save(comment);
    }

    public void deleteComment(UUID id) {
        commentRepository.deleteById(id);
    }
}
