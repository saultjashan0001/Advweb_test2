package com.discussionboard.model;

import java.util.Date;

public class Post {
    private String author;
    private String text;
    private String image;
    private Date createdAt = new Date();

    // Getters and setters
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
