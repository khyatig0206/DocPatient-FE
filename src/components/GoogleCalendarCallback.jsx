import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleCalendarCallback = () => {
    useEffect(() => {
        const fetchLoginStatus = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/google/callback?code=${code}`);
                    if (response.status === 200) {
                        window.alert("Logged In Successfully");
                        window.location.href = "/";
                    }
                } catch (error) {
                    console.error(error);
                    window.alert("Failed to log in.");
                }
            }
        };

        fetchLoginStatus();
    }, []);

    return <div>Loading...</div>;
};

export default GoogleCalendarCallback;