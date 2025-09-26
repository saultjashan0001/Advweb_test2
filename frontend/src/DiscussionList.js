import React from "react";

function DiscussionList({ discussions, selectDiscussion, deleteDiscussion, currentUser, toggleLike, toggleDislike }) {
  if (!discussions || discussions.length === 0) {
    return <p className="text-center text-muted">No discussions yet. Start one!</p>;
  }

  return (
    <div className="list-group">
      {discussions.map((d) => (
        <div key={d.id} className="list-group-item mb-3">
          {/* Title */}
          <div className="d-flex justify-content-between align-items-center">
            <span
              style={{ cursor: "pointer", fontWeight: "500" }}
              onClick={() => selectDiscussion(d)}
            >
              {d.title} <small className="text-muted">by {d.createdBy}</small>
            </span>

            {/* Delete (only creator) */}
            {currentUser === d.createdBy && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteDiscussion(d.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>

          {/* Like/Dislike under each discussion */}
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => toggleLike(d.id, currentUser)}
            >
              👍 {d.likes.length}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => toggleDislike(d.id, currentUser)}
            >
              👎 {d.dislikes.length}
            </button>
          </div>

          {/* Show who liked/disliked */}
          <div className="mt-1 small text-muted">
            {d.likes.length > 0 && <div>Liked by: {d.likes.join(", ")}</div>}
            {d.dislikes.length > 0 && <div>Disliked by: {d.dislikes.join(", ")}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DiscussionList;
