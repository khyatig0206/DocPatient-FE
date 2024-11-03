import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/blogposts/`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the blog posts:', error);
      });
  }, []);

  return (
    <div className="grid bg-buttoncolor2 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform cursor-pointer"
          style={{ transitionDuration: '200ms', maxWidth: '100%' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src={`${import.meta.env.VITE_BASE_URL}${post.image}`} 
            alt={post.title} 
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <h2 className="text-sm font-semibold truncate">{post.title}</h2>
            <p className="text-xs text-gray-500">By {post.author_name}</p>
            <p className="text-xs text-gray-500">Categories: {post.categories.join(', ')}</p>
            <p className="text-xs text-gray-800">{post.truncated_summary}</p>
            <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
