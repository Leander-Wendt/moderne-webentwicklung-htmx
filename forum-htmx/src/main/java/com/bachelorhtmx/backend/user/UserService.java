package com.bachelorhtmx.backend.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    final static String USER_NOT_FOUND_MSG = "User with username %s not found.";
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, username)));
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(UUID id) {
        return userRepository.getReferenceById(id);
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(UUID id, User user) {
        if (userRepository.getReferenceById(id) == null) {
            throw new EntityNotFoundException("User with given ID doesn't exist.");
        }
        userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }


    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }
}
