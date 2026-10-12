import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BlogCard from "../../component/Blog/BlogCard";

import { getBlogs, deleteBlog, toggleLike } from "../../utils/blogStorage";

const Blog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, [refresh]);

  const loadBlogs = () => {
    const data = getBlogs();

    setBlogs(data);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this blog?");

    if (confirmDelete) {
      deleteBlog(id);

      setRefresh((prev) => !prev);
    }
  };

  const handleLike = (id) => {
    toggleLike(id);

    setRefresh((prev) => !prev);
  };

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

        <p>Share your travel experience with the world</p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-blog")}
        >
          ✍️ Create Blog
        </button>
      </div>

      {/* Search Filter */}

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search destination or title..."
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
          <div className="text-center">
            <h4>No Blogs Found 😔</h4>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <BlogCard
                blog={blog}
                onLike={handleLike}
                onDelete={handleDelete}
                onView={(blog) => navigate(`/blog/${blog.id}`)}
                onEdit={(blog) =>
                  navigate("/create-blog", {
                    state: {
                      blog,
                    },
                  })
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
