package com.bachelorhtmx.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional(readOnly = true)

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    User getUserByUsername(String username);
}
