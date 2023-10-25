package com.bachelorreact.backend.post;

import com.bachelorreact.backend.comment.Comment;
import com.bachelorreact.backend.user.User;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Builder
@Table
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String title;
    private String body;
    private Date created_at;
    private Date updated_at;
    @ManyToOne
    private User author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> comments;


    public Post() {
    }

    public Post(UUID id, String title, String body, Date created_at, Date updated_at, User author, Set<Comment> comments) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.author = author;
        this.comments = comments;
    }

    public User getUser() {
        return author;
    }

    public void setUser(User user) {
        this.author = author;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
}