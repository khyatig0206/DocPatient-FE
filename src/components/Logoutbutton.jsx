import React from 'react';
import axios from 'axios';


const Logoutbutton = () => {
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/logout/`);  // Adjust to your API's logout endpoint
            localStorage.removeItem('access_token');
            localStorage.removeItem('full_name');
            localStorage.removeItem('profile_picture');
            alert("Logged out successfully");
            
            window.location.href = "/login";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button className="bg-gray-100 text-textcolor px-4 py-2 rounded hover:bg-buttoncolor transition-transform transform hover:scale-95" onClick={handleLogout}>
            Logout
        </button>
    );

}

export default Logoutbutton