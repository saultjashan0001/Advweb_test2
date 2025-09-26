package com.discussionboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.discussionboard.model.Discussion;
import com.discussionboard.model.Post;
import com.discussionboard.repository.DiscussionRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    // ✅ Get all discussions
    @GetMapping
    public List<Discussion> getAll() {
        return discussionRepository.findAll();
    }

    // ✅ Create new discussion thread
    @PostMapping
    public Discussion create(@RequestBody Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    // ✅ Respond to a thread
    @PostMapping("/{id}/posts")
    public Discussion addPost(@PathVariable String id, @RequestBody Post post) {
        Optional<Discussion> optional = discussionRepository.findById(id);
        if (optional.isPresent()) {
            Discussion discussion = optional.get();
            discussion.getPosts().add(post);
            return discussionRepository.save(discussion);
        }
        throw new RuntimeException("Discussion not found");
    }

    // ✅ Delete a response
    @DeleteMapping("/{discussionId}/posts/{postIndex}")
    public Discussion deletePost(@PathVariable String discussionId, @PathVariable int postIndex) {
        Optional<Discussion> optional = discussionRepository.findById(discussionId);
        if (optional.isPresent()) {
            Discussion discussion = optional.get();
            if (postIndex >= 0 && postIndex < discussion.getPosts().size()) {
                discussion.getPosts().remove(postIndex);
                return discussionRepository.save(discussion);
            }
            throw new RuntimeException("Invalid post index");
        }
        throw new RuntimeException("Discussion not found");
    }

    // ✅ Delete thread only if no responses
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        Optional<Discussion> optional = discussionRepository.findById(id);
        if (optional.isPresent()) {
            Discussion discussion = optional.get();
            if (discussion.getPosts() == null || discussion.getPosts().isEmpty()) {
                discussionRepository.deleteById(id);
                return "Discussion deleted";
            } else {
                return "Cannot delete: thread has responses";
            }
        }
        return "Discussion not found";
    }
}
