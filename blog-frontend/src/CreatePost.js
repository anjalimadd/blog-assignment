import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      const excerpt = content.slice(0,5);
    axios
      .post("http://localhost:5000/posts", { title, excerpt, content }) // Include excerpt
      .then(() => navigate("/"))
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold my-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
