import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ isHovering }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('user_id'); // Get user ID from local storage
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user-details/`, {
          params: {
            user_id: userId, // Pass the user_id as a query parameter
          },
        });
        setUserData(response.data);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className="relative">
      {isHovering && (
        <div className="absolute z-10 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 top-16 right-0">
          {/* Triangle pointing to profile picture */}
          <div className="absolute -top-1 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

          {/* Display user details in modal */}
          <div className="text-center mb-2">

            <h3 className="text-lg font-semibold">{userData.first_name} {userData.last_name}</h3>
            <p className="text-sm">{userData.is_doctor ? 'Doctor' : 'Patient'}</p>
          </div>

          <div className="mt-2">
            <p><strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.pincode}</p>
            {userData.is_doctor && (
              <>
                <p><strong>Establishment:</strong> {userData.doctor_profile.establishment_name || 'N/A'}</p>
                <p><strong>License No:</strong> {userData.doctor_profile.license_number || 'N/A'}</p>
                <p><strong>Categories:</strong> {userData.doctor_profile.categories.map(cat => cat.name).join(', ') || 'N/A'}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
