import React, { useState } from "react";

function PostList({ posts, deletePost, currentUser, addComment }) {
  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  if (!posts.length) {
    return <p className="text-muted">No posts yet.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{post.author}</h5>
              {currentUser === post.author && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletePost(post.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
            <p className="card-text">{post.text}</p>
            {post.fileUrl && (
              <div className="mb-2">
                <a
                  href={post.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  View File
                </a>
              </div>
            )}

            {/* Comments Section */}
            <div className="comments mt-3">
              <h6>Comments</h6>
              {post.comments && post.comments.length > 0 ? (
                <ul className="list-group mb-2">
                  {post.comments.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>
                        <strong>{c.author}: </strong> {c.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No comments yet.</p>
              )}

              {/* Add Comment Input */}
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.id, e.target.value)
                  }
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddComment(post.id)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
