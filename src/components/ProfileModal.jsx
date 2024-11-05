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
        <div className="absolute w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 top-16 right-0">
          {/* Triangle pointing to profile picture */}
          <div
            className="absolute -top-4 right-8 arrow-up "
            
        ><div className='relative -top-1 right-6 triangle-shadow'></div> </div>

          {/* Display user details in modal */}
          <div className="text-center mb-2">
            <h3 className="text-lg font-semibold">
              {/* {userData.first_name} {userData.last_name} */}
              Khyati Gupta
            </h3>
            {/* <p className="text-sm">{userData.is_doctor ? 'Doctor' : 'Patient'}</p> */}
          </div>

          <div className="mt-2">
            <p>
             address
              {/* <strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.pincode} */}
            </p>
            {/* {userData.is_doctor && userData.doctor_profile && (
              <>
                <p><strong>Establishment:</strong> {userData.doctor_profile.establishment_name || 'N/A'}</p>
                <p><strong>License No:</strong> {userData.doctor_profile.license_number || 'N/A'}</p>
                <p><strong>Categories:</strong> {userData.doctor_profile.categories.join(', ') || 'N/A'}</p>
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;

