import React, { useState } from "react";

function PostForm({ addPost }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    addPost(text.trim(), file);
    setText("");
    setFile(null);
    e.target.reset();
  };

  return (
    <form onSubmit={submit} className="mt-3">
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="2"
          placeholder="Write something…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="btn btn-primary">Post</button>
      </div>
    </form>
  );
}

export default PostForm;
