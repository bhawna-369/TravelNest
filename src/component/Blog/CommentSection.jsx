import React, { useState } from "react";
import { addComment, deleteComment } from "../../utils/blogStorage";
const CommentSection = ({ blog, setRefresh }) => {
  const [text, setText] = useState("");
  const handleComment = () => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),

      user: "Traveler",

      text: text,
    };
    addComment(blog.id, newComment);
    setText("");
    setRefresh((prev) => !prev);
  };
  const handleDelete = (id) => {
    deleteComment(blog.id, id);
    setRefresh((prev) => !prev);
  };
  return (
    <div className="mt-4">
      <h4>Comments 💬</h4>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleComment}>
          Add
        </button>
      </div>

      {blog.comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        blog.comments.map((comment) => (
          <div key={comment.id} className="border rounded p-2 mb-2">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{comment.user}</strong>

                <p className="mb-0">{comment.text}</p>
              </div>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
