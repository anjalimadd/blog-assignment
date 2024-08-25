import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdatePostModal({ postId, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch the current post details for update
    axios
      .get(`http://localhost:5000/posts/${postId}`)
      .then((response) => {
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const excerpt = content.slice(0, 5); // Limit excerpt to 5 characters for simplicity
    axios
      .put(`http://localhost:5000/posts/${postId}`, { title, excerpt, content })
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto">
        <h2 className="text-2xl font-bold mb-6">Update Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostModal;
