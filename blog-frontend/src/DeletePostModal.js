import React from "react";
import axios from "axios";

function DeletePostModal({ postId, onClose, onDelete }) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/posts/${postId}`)
      .then(() => {
        onDelete();
        onClose();
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this post?</p>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
        >
          Delete Post
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePostModal;
