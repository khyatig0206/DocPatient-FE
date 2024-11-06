import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const postsPerPage = 6;

  // Fetch blog posts and categories
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const categoryFilter = selectedCategories.length ? `&categories[]=${selectedCategories.join('&categories[]=')}` : '';
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/filtered_blogposts/?offset=${page * postsPerPage}&limit=${postsPerPage}${categoryFilter}`);
        
        setPosts(response.data.blogposts);
        setCategories(response.data.categories);
        setTotalCount(response.data.total_count);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, [page, selectedCategories]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
    setPage(0)
  };

  // Handle pagination
  const handleNextPage = () => {
    if ((page + 1) * postsPerPage < totalCount) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className='bg-buttoncolor'>
    <div className="container py-4">
      <div className="flex">
        {/* Sidebar for Category Filter */}
        <div className="w-1/5 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-lg text-mycolor font-bold mb-4">Filter by Categories</h3>
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="form-checkbox accent-mycolor"
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Blog Post Listing */}
        <div className="w-4/5 pl-4">
          <div className="grid gap-3 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform cursor-pointer hover:scale-95 duration-300 z-10">
                <img 
                  src={`${import.meta.env.VITE_BASE_URL}${post.image}`} 
                  alt={post.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <h2 className="text-sm font-semibold truncate">{post.title}</h2>
                  <span className="text-xs text-gray-500">{`By ${post.author_name}`}</span>
                  <br></br>
                  <span className="text-xs text-gray-500">{`Categories: ${post.categories.join(', ')}`}</span>
                  <p className="text-xs text-gray-800">{post.truncated_summary}</p>
                  
                  <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="bg-mycolor text-white md:text-lg sm:text-sm px-4 py-2 rounded mt-4 hover:bg-buttoncolor2 transition-transform transform hover:scale-95 disabled:opacity-50 "
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={(page + 1) * postsPerPage >= totalCount}
              className="bg-mycolor text-white md:text-lg sm:text-sm px-4 py-2 rounded mt-4 hover:bg-buttoncolor2 transition-transform transform hover:scale-95 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BlogPage;
