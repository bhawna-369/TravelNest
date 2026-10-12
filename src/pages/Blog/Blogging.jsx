import React, { useEffect, useState } from "react";
import BlogForm from "../../component/Blog/BlogForm";
import BlogCard from "../../component/Blog/BlogCard";
import CommentSection from "../../component/Blog/CommentSection";

import {
  getBlogs,
  saveBlog,
  deleteBlog,
  toggleLike,
} from "../../utils/blogStorage";

const Blogging = () => {
  const [blogs, setBlogs] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, [refresh]);

  const loadBlogs = () => {
    setBlogs(getBlogs());
  };

  // Create Blog

  const handleCreate = (values) => {
    const newBlog = {
      id: Date.now(),

      title: values.title,

      destination: values.destination,

      category: values.category,

      description: values.description,

      image: values.image,

      budget: values.budget,

      rating: values.rating,

      bestTime: values.bestTime,

      author: "Samaira",

      likes: 0,

      comments: [],

      createdAt: new Date().toISOString().split("T")[0],
    };

    saveBlog(newBlog);

    setShowForm(false);

    setRefresh((prev) => !prev);
  };

  // Delete Blog

  const handleDelete = (id) => {
    deleteBlog(id);

    setSelectedBlog(null);

    setRefresh((prev) => !prev);
  };

  // Like Blog

  const handleLike = (id) => {
    toggleLike(id);

    setRefresh((prev) => !prev);
  };

  // Search + Filter

  const filteredBlogs = blogs.filter((blog) => {
    const searchMatch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.destination.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ? true : blog.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="container mt-5">
      {/* Hero */}

      <div className="p-5 mb-4 bg-light rounded-4 shadow">
        <h1>Travel Stories 🌍</h1>

        <p>Share your travel experience with other travelers</p>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Create Blog"}
        </button>
      </div>

      {/* Form */}

      {showForm && (
        <div className="mb-5">
          <BlogForm onSubmit={handleCreate} />
        </div>
      )}

      {/* Search */}

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="Search blog or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>

            <option>Mountain</option>

            <option>Beach</option>

            <option>City</option>

            <option>Adventure</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}

      <div className="row">
        {filteredBlogs.length === 0 ? (
          <h4 className="text-center">No Blogs Available</h4>
        ) : (
          filteredBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <BlogCard
                blog={blog}
                onLike={handleLike}
                onDelete={handleDelete}
                onView={() => setSelectedBlog(blog)}
              />
            </div>
          ))
        )}
      </div>

      {/* Blog Details */}

      {selectedBlog && (
        <div className="card mt-5 p-4 shadow">
          <button
            className="btn btn-danger mb-3"
            onClick={() => setSelectedBlog(null)}
          >
            Close
          </button>

          <img src={selectedBlog.image} className="img-fluid rounded" alt="" />

          <h2 className="mt-3">{selectedBlog.title}</h2>

          <p>📍 {selectedBlog.destination}</p>

          <p>{selectedBlog.description}</p>

          <button
            className="btn btn-danger"
            onClick={() => handleLike(selectedBlog.id)}
          >
            ❤️ {selectedBlog.likes}
          </button>

          <CommentSection blog={selectedBlog} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
};

export default Blogging;
