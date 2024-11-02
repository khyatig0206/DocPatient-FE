import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login/`, credentials);
            // Show alert on successful login
            window.alert("Login successful!");
            // Redirect to home page
            window.location.href = "/";
        } catch (error) {
            console.error(error.response.data);
            window.alert("Login failed. Please check your username and password.");
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg mt-1 mb-1 rounded-lg w-full max-w-md p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-mycolor">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="input-field w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="input-field w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <button type="submit" className="w-full py-2 bg-mycolor text-white rounded-lg hover:bg-buttoncolor2">
                        Login
                    </button>
                </form>
                <p className="text-center text-sm">
                    Don't have an account? <a href="/register" className="text-mycolor hover:underline">Sign up</a>
                </p>
            </div>
        </section>
    );
};

export default Login;