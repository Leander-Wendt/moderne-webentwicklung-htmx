package com.bachelorreact.backend.post;

import com.bachelorreact.backend.user.User;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "title", columnDefinition = "VARCHAR(255)")
    private String title;
    @Column(name = "body", columnDefinition = "VARCHAR(1024)")
    private String body;
    private Date created_at;
    private Date updated_at;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String author_name = user.getDisplayname();

    public Post() {

    }

    public Post(UUID id, String title, String body, Date created_at, Date updated_at, User user, String author_name) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user = user;
        this.author_name = author_name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
