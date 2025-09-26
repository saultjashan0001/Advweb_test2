package com.discussionboard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.discussionboard.model.Discussion;

public interface DiscussionRepository extends MongoRepository<Discussion, String> {
}
