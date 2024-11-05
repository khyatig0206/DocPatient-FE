import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ isHovering }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 11
        // const userId = localStorage.getItem('user_id'); // Get user ID from local storage
        // const token = localStorage.getItem('auth_token'); // Retrieve the auth token from local storage
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
          <div
            className="absolute -top-4 right-4 arrow-up "
            
        ><div className='relative -top-0 right-5 triangle-shadow'></div> </div>

          {/* Display user details in modal */}
          <div className="text-center text-black mb-2">
            <h3 className="text-lg font-semibold  z-100">
              {userData.first_name} {userData.last_name}

            </h3>
            <p className="text-sm">{userData.is_doctor ? 'Doctor' : 'Patient'}</p>
          </div>

          <div className="mt-2 text-left text-black text-xs">
            <span><strong>Email:</strong>{userData.email}</span>
            <br></br>
            <span className='text-black text-xs'>

              <strong>Address:</strong> {userData.address} - {userData.pincode}
            </span>
            <br></br>
            {userData.is_doctor && userData.doctor_profile && (
              <>
                <span><strong>Establishment:</strong> {userData.doctor_profile.establishment_name || 'N/A'}</span>
                <br></br>
                <span><strong>License No:</strong> {userData.doctor_profile.license_number || 'N/A'}</span>
                <br></br>
                <span><strong>Categories:</strong> {userData.doctor_profile.categories.join(', ') || 'N/A'}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;

