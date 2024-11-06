import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ isHovering }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const userId = 11
        const userId = localStorage.getItem('user_id'); // Get user ID from local storage
        const token = localStorage.getItem('auth_token'); // Retrieve the auth token from local storage
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user-details/`, {
          params: { user_id: userId },
          
        });
        setUserData(response.data);
        console.log('User Data:', response.data); // Log fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative">
      {isHovering && (
        <div className="absolute w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 top-9 right-0">
          {/* Triangle pointing to profile picture */}
          <div className="absolute -top-4 right-4 arrow-up">
            <div className="relative -top-0 right-5 triangle-shadow"></div>
          </div>

          {/* Display user details in modal */}
          <div className="text-center text-black mb-2">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              {userData.is_doctor ? 'Doctor' : 'Patient'}
            </p>
            <h3 className="text-lg font-bold text-black">
              {userData.first_name} {userData.last_name}
            </h3>
          </div>

          <div className="mt-2 text-left text-gray-700 text-sm space-y-2">
            <div>
              <strong>Email:</strong> {userData.email}
            </div>
            <div>
              <strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.pincode}
            </div>
            {userData.is_doctor && userData.doctor_profile && (
              <>
                <div>
                  <strong>Establishment:</strong> {userData.doctor_profile.establishment_name || 'N/A'}
                </div>
                <div>
                  <strong>License No:</strong> {userData.doctor_profile.license_number || 'N/A'}
                </div>
                <div>
                  <strong>Categories:</strong> {userData.doctor_profile.categories.join(', ') || 'N/A'}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;

