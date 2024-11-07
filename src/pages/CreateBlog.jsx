import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogPostCreationPage = () => {
  const userId = window.localStorage.getItem('user_id'); // Get userId from local storage
  const navigate = useNavigate();
  
  const [blogData, setBlogData] = useState({
    title: '',
    image: null, 
    categories: '',
    summary: '',
    content: '',
    draft: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setBlogData({
      ...blogData,
      image: e.target.files[0] // Store the uploaded file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(); // Create FormData for file uploads and other fields
    formData.append('title', blogData.title);
    formData.append('image', blogData.image);
    formData.append('categories', blogData.categories); // Assuming categories is a single string (comma separated), adjust if necessary
    formData.append('summary', blogData.summary);
    formData.append('content', blogData.content);
    formData.append('draft', blogData.draft);

    try {
      // Make POST request with form data, including userId in the query params
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-blog/?userId=${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Necessary for file uploads
          }
        }
      );
      
      alert('Blog post created successfully!');
      navigate('/'); // Redirect to home page or any other page
    } catch (error) {
      console.error(error);
      setError('Failed to create blog post.');
    }
  };

  return (
    <div className="bg-buttoncolor">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg max-w-md mx-auto mt-4 mb-5 p-6">
          <h1 className="text-2xl font-semibold text-textcolor mb-2 text-center">Create Blog Post</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="flex justify-center bg-red-100 rounded-lg p-2 text-red-500 text-sm">{error}</div>}
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
                accept="image/*"
              />
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium">Categories</label>
              <input
                type="text"
                id="categories"
                name="categories"
                value={blogData.categories}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
                placeholder="Comma-separated categories"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={blogData.summary}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
                rows="3"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium">Content</label>
              <textarea
                id="content"
                name="content"
                value={blogData.content}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
                rows="6"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="draft"
                name="draft"
                checked={blogData.draft}
                onChange={() => setBlogData({ ...blogData, draft: !blogData.draft })}
                className="mr-2"
              />
              <label htmlFor="draft" className="text-sm font-medium">Save as Draft</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-mycolor text-white rounded-md hover:bg-buttoncolor2 transition-colors"
            >
              Create Blog Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCreationPage;
