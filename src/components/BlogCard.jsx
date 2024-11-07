import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 // Import custom CSS for animations

const BlogCard = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 4; // Number of posts per page
  const [totalCount, setTotalCount] = useState(0);

  const fetchPosts = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/blogposts/`, {
      params: {
        offset,
        limit,
      },
    })
      .then(response => {
        setPosts(response.data.blogposts);
        setTotalCount(response.data.total_count);
      })
      .catch(error => {
        console.error('Error fetching the blog posts:', error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [offset]);

  const handleNext = () => {
    setOffset(offset + 1);
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  return (
    <div className="flex flex-col items-center relative bg-buttoncolor2 ">
      {/* Heading and View All button */}
      <div className="w-full flex justify-between items-center mb-4 px-4 mt-4 ">
        <h2 className="text-2xl font-bold text-gray-700">Recent Blog Posts</h2>
        <Link to="/blogs">
        <button className="bg-gray-100 text-textcolor px-4 py-2 rounded hover:bg-buttoncolor transition-transform transform hover:scale-95" >
          View All
        </button>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-4 px-4 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
        
        {posts.map(post => (
          <div 
            key={post.id} 
            className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform cursor-pointer hover:scale-105 duration-300 animate-cardFade"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
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

      {/* Navigation Buttons */}
      <button 
        onClick={handlePrev} 
        disabled={offset === 0} 
        className="sm:hidden md:block absolute left-3 top-1/2 bg-mycolor text-white p-2 rounded disabled:opacity-50"
      >
        &lt;
      </button>
      <button 
        onClick={handleNext} 
        disabled={offset + limit >= totalCount} 
        className="sm:hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 bg-mycolor text-white p-2 rounded disabled:opacity-50"
      >
        &gt;
      </button>

      {/* Mobile Buttons */}
      <button 
        onClick={handlePrev} 
        disabled={offset === 0} 
        className="md:hidden sm:block absolute top-14 text-2xl left-1/2 transform -translate-x-1/2 bg-mycolor text-white p-2 rounded-full disabled:opacity-50 transition-transform duration-200 hover:scale-110"
      >
        ▲
      </button>
      <button 
        onClick={handleNext} 
        disabled={offset + limit >= totalCount} 
        className="md:hidden sm:block absolute bottom-1 text-2xl left-1/2 transform -translate-x-1/2 bg-mycolor text-white p-2 rounded-full disabled:opacity-50 transition-transform duration-200 hover:scale-110"
      >
        ▼
      </button>
    </div>
  );
};

export default BlogCard;

