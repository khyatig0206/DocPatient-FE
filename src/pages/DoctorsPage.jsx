import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchLocationTemp, setSearchLocationTemp] = useState(''); 
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const categoryFilter = selectedCategories.length ? `&categories[]=${selectedCategories.join('&categories[]=')}` : '';
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/doctors/?offset=${page * postsPerPage}&limit=${postsPerPage}&location=${searchLocation}${categoryFilter}`);
        setDoctors(response.data.doctors);
        setCategories(response.data.categories);
        setTotalCount(response.data.total_count);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, [page, selectedCategories, searchLocation]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
    setPage(0);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    setSearchLocation(searchLocationTemp); // Set the actual location for the API call
    setPage(0); // Reset page to 0 when a new search is triggered
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e); // Trigger the search when Enter key is pressed
    }
  };

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-mycolor font-bold mb-4">Doctors</h1>

      
      <form onSubmit={handleSearch} className='flex items-center space-x-6 mb-4'>
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocationTemp} // Temporary input value
          onChange={(e) => setSearchLocationTemp(e.target.value)} // Update the temp input state
          onKeyDown={handleEnterPress} // Detect Enter key press
          className="p-2 shadow-sm border border-gray-300 rounded outline-mycolor flex-grow"
        />
        <button
          type="submit"
          className="bg-mycolor shadow-md text-white md:text-base sm:text-sm px-4 py-2 rounded hover:bg-buttoncolor2 transition-transform transform hover:scale-95 z-10 ">
          Search
        </button>
      </form>

      <div className="flex">
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
        <div className="w-4/5 pl-4">
          <div className="grid gap-3 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform cursor-pointer hover:scale-95 duration-300">
                <div className="flex justify-center px-2 pt-2">
                <img
                src={`${import.meta.env.VITE_BASE_URL}${doctor.profile.profile_picture}`}
                alt={doctor.profile.user.username}
                className="w-28 h-28 rounded-full object-contain"
                />
            </div>
                <div className="px-2 pb-2">
                  <h2 className="text-xl font-semibold">Dr. {doctor.profile.user.first_name} {doctor.profile.user.last_name}</h2>
                  <span className="text-gray-500 text-sm">{doctor.establishment_name}</span>
                  <br></br>
                  <span className="text-gray-500 text-sm">
                    {doctor.profile.city}, {doctor.profile.state}
                  </span>
                  <p className="text-gray-700 text-sm">
                    Specializations: {doctor.categories.map((cat) => cat.name).join(', ')}
                  </p>
                  
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

export default DoctorsPage;

