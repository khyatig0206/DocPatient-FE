import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ isHovering }) => {
  const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = localStorage.getItem('user_id'); // Get user ID from local storage
//         const token = localStorage.getItem('auth_token'); // Retrieve the auth token from local storage
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user-details/`, {
//           params: { user_id: userId },
          
//         });
//         setUserData(response.data);
//         console.log('User Data:', response.data); // Log fetched data
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();

//   }, []);

    setUserData({
        first_name: "Khyati",
        last_name: "Gupta",
        is_doctor: true,
        address: "Navab Gate, mala road, Indra colony, near Hanuman Mandir, Rampur, Uttar Pradesh",
        city: "Rampur",
        state: "Uttar Pradesh",
        pincode: 244901,
        doctor_profile: {
        establishment_name: "Khyati Clinic",
        license_number: "123456",
        categories: ["Cardiology", "Dentist"]
        }
    });

  return (
    <div className="relative">
      {isHovering && (
        <div className="absolute w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 top-16 right-0">
          {/* Triangle pointing to profile picture */}
          <div className="absolute -top-1 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

          {/* Display user details in modal */}
          <div className="text-center mb-2">
            <h3 className="text-lg font-semibold">
              {userData.first_name} {userData.last_name}
            </h3>
            <p className="text-sm">{userData.is_doctor ? 'Doctor' : 'Patient'}</p>
          </div>

          <div className="mt-2">
            <p>
              <strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.pincode}
            </p>
            {userData.is_doctor && userData.doctor_profile && (
              <>
                <p><strong>Establishment:</strong> {userData.doctor_profile.establishment_name || 'N/A'}</p>
                <p><strong>License No:</strong> {userData.doctor_profile.license_number || 'N/A'}</p>
                <p><strong>Categories:</strong> {userData.doctor_profile.categories.join(', ') || 'N/A'}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;

