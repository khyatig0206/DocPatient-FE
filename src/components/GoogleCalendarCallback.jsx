import React, { useEffect ,useState} from 'react';
import axios from 'axios';

const GoogleCalendarCallback = () => {
    const[loading,setLoading]=useState(true);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
        
            if (code) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/google/callback/?code=${code}`);
                    if (response.status === 200) {
                        window.localStorage.setItem('access_token', response.data.access_token);
                        window.alert("Logged In Successfully");
                        window.location.href = "/";
                    }
                } catch (error) {
                    console.error("Error during login:", error.response ? error.response.data : error.message);
                    window.alert("Failed to log in: " + (error.response ? error.response.data.message : error.message));
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchLoginStatus();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-mycolor"></div>
            ) : (
                <div>Login Complete</div>
            )}
        </div>
    );
};
export default GoogleCalendarCallback;