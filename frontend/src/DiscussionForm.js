import React, { useState } from "react";

function DiscussionForm({ addDiscussion }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addDiscussion(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
      <input
        type="text"
        className="form-control me-2"
        style={{ maxWidth: "600px" }}   // ✅ wider input
        placeholder="Start a new discussion..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
}

export default DiscussionForm;
