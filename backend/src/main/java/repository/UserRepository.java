package com.discussionboard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.discussionboard.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
