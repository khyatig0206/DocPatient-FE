import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/autoplay'; 
import { Autoplay, Pagination } from 'swiper/modules'; 

const BlogPostCreationPage = () => {
  
  const userId = window.localStorage.getItem('user_id');
  const navigate = useNavigate();
  
  const [blogData, setBlogData] = useState({
    title: '',
    image: null, 
    categories: [],
    summary: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [userBlogs, setUserBlogs] = useState({ published_posts: [], draft_posts: [] });
  const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/`);
                setCategories(response.data);
                setFilteredCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredCategories(categories);
        } else {
            setFilteredCategories(categories.filter(category =>
                category.name.toLowerCase().includes(query)
            ));
        }
    };
    const handleCategorySelect = (category) => {
        if (!selectedCategories.some(selected => selected.id === category.id)) {
            const updatedSelectedCategories = [...selectedCategories, category];
            setSelectedCategories(updatedSelectedCategories);
            // Update blogData.categories as an array of IDs
            setBlogData({ ...blogData, categories: updatedSelectedCategories.map(c => c.id) }); // Ensure IDs are stored
        }
        setFilteredCategories(categories);
        setSearchQuery(''); // Clear search query after selection
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    // Remove selected category
    const removeCategory = (indexToRemove) => {
        const updatedCategories = selectedCategories.filter((_, index) => index !== indexToRemove);
        const updatedCategoryIds = updatedCategories.map(category => category.id); // Ensure we get IDs
        setSelectedCategories(updatedCategories);
        setBlogData({ ...blogData, categories: updatedCategoryIds });
    };

    
  useEffect(() => {
    // Fetch user's blog posts (published and drafts)
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user-blogs/?userId=${userId}`);
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Failed to fetch user blogs:', error);
      }
    };

    fetchUserBlogs();
  }, [userId]);

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

  const handleSubmit = async (e, isDraft) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('image', blogData.image);
    blogData.categories.forEach(catId => {
      formData.append('categories', catId);
    });
    formData.append('summary', blogData.summary);
    formData.append('content', blogData.content);
    formData.append('draft', isDraft);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-blog/?userId=${userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert(isDraft ? 'Draft saved successfully!' : 'Blog post created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to create blog post.');
    }
  };


  return (
    <div className="bg-buttoncolor min-h-screen">
      <div className="container mx-auto px-4 py-6 grid grid-cols-3 gap-8">
        {/* Blog creation form - Left 2/3 section */}
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-textcolor mb-4 text-center">Create Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500">{error}</div>}
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={blogData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  accept="image/*"
                />
              </div>
               {/* Search and Select Categories */}
               <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Select Categories</label>
                              {loading ? (
                                  <p>Loading categories...</p>
                              ) : (
                                  <>
                                      {/* Search Input */}
                                      <input
                                          type="text"
                                          value={searchQuery}
                                          onFocus={() => setIsDropdownOpen(true)}
                                          onChange={handleSearchChange}
                                          placeholder="Enter category"
                                          className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
                                      />

                                      {isDropdownOpen && (
                                          <div className="relative" ref={dropdownRef}>
                                              <ul className="absolute bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto w-full">
                                                  {filteredCategories.map(category => (
                                                      <li
                                                          key={category.id}
                                                          onClick={() => handleCategorySelect(category)}
                                                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                      >
                                                          {category.name}
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      )}
                                  </>
                              )}
                          </div>

                          {/* Display selected categories */}
                          <div className="flex flex-wrap mb-2 mt-2">
                              {selectedCategories.map((category, index) => (
                                  <div
                                      key={index}
                                      className="flex items-center bg-buttoncolor px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                                  >
                                      {category.name}
                                      <button
                                          type="button"
                                          onClick={() => removeCategory(index)}
                                          className="ml-2 text-red-600 hover:text-red-900"
                                      >
                                          ×
                                      </button>
                                  </div>
                              ))}
                          </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={blogData.summary}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  rows="6"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  className="w-full py-2 bg-mycolor text-white rounded-md hover:bg-buttoncolor2"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* User blog posts - Right 1/3 section */}
        <div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2 text-mycolor">My Drafts</h2>
      {userBlogs.draft_posts.length > 0 ? (
        <Swiper
          slidesPerView={1} // Show one post at a time
          spaceBetween={10} // Space between slides
          autoplay={{
            delay: 3000, // 3 seconds per slide
            disableOnInteraction: false, // Keep autoplay working even when user interacts
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
                return (
                  `<span class="${className}" style="background-color:'#008e76'}"></span>`
                );
              } // Allow users to click to change slides
          }}
          loop={true}
          modules={[Autoplay, Pagination]} // Enable autoplay and pagination
          className="mySwiper"
        >
          {userBlogs.draft_posts.map((draft) => (
            <SwiperSlide key={draft.id}>
              <div className="mb-8">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${draft.image}`}
                  alt={draft.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold truncate">{draft.title}</h3>
                <p className="text-sm">{draft.truncated_summary}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-sm text-gray-500">You have no drafts.</p>
      )}
    </div>

    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2 text-mycolor">Published Posts</h2>
      {userBlogs.published_posts.length > 0 ? (
        <Swiper
          slidesPerView={1} // Show one post at a time
          spaceBetween={10} // Space between slides
          autoplay={{
            delay: 3000, // 3 seconds per slide
            disableOnInteraction: false, // Keep autoplay working even when user interacts
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
                return (
                  `<span class="${className}" style="background-color:'#008e76'}"></span>`
                );
              }
          }}
          loop={true}
          modules={[Autoplay, Pagination]} // Enable autoplay and pagination
          className="mySwiper"
        >
          {userBlogs.published_posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="mb-8">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${post.image}`}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                <span className="text-sm">{post.truncated_summary}</span>
                <br></br>
                <span className="text-xs text-gray-500">
                  Published on {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-sm text-gray-500">You have no posts.</p>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCreationPage;
