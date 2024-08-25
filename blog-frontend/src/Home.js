import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdatePostModal from "./UpdatePostModal";
import DeletePostModal from "./DeletePostModal";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        console.log("Posts fetched:", response.data); // Debugging line
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
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
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        console.log("Posts refreshed:", response.data); // Debugging line
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold my-4">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="mt-2 flex flex-col gap-2">
                <Link to={`/posts/${post._id}`} className="text-blue-600">
                  Read more
                </Link>
                <button
                  onClick={() => handleUpdateClick(post._id)}
                  className="bg-blue-600 text-white w-fit px-3 py-1 rounded flex items-center space-x-1"
                >
                  <PencilAltIcon className="w-5 h-5" />
                  <span>Update</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  className="bg-red-600 text-white w-fit px-3 py-1 rounded flex items-center space-x-1"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

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
}

export default Home;
