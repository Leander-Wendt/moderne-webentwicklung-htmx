package com.bachelorhtmx.backend.user;

import com.bachelorhtmx.backend.post.Post;
import jakarta.persistence.*;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity(name = "_user")
@Builder

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String username;
    private String displayname;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    @OneToMany(mappedBy = "author")
    private List<Post> posts;

    public User(UUID id, String username, String displayname, String password, UserRole userRole, List<Post> posts) {
        this.id = id;
        this.username = username;
        this.displayname = displayname;
        this.password = password;
        this.userRole = userRole;
        this.posts = posts;
    }

    public User(String username, String password, UserRole userRole, String displayname) {
        super();
        this.username = username;
        this.password = password;
        this.userRole = userRole;
        this.displayname = displayname;
        this.posts = new ArrayList<>();
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", displayname='" + displayname + '\'' +
                ", appUserRole=" + userRole +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
    }

    public UserRole getAppUserRole() {
        return userRole;
    }

    public void setAppUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UUID getId() {
        return id;
    }
}
