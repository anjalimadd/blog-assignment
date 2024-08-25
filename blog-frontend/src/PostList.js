import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdatePostModal from "./UpdatePostModal";
import DeletePostModal from "./DeletePostModal";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleUpdateClick = (id) => {
    setSelectedPostId(id);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedPostId(id);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedPostId(null);
  };

  const refreshPosts = () => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded-lg shadow-sm">
            <Link to={`/posts/${post._id}`}>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
            <div className="mt-2">
              <button
                onClick={() => handleUpdateClick(post._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(post._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showUpdateModal && (
        <UpdatePostModal
          postId={selectedPostId}
          onClose={closeModals}
          onUpdate={refreshPosts}
        />
      )}
      {showDeleteModal && (
        <DeletePostModal
          postId={selectedPostId}
          onClose={closeModals}
          onDelete={refreshPosts}
        />
      )}
    </div>
  );
};

export default PostList;
