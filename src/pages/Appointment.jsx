import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentBookingPage = () => {
  const { doctorId } = useParams(); // Get doctorId from the URL
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState({
    doctor: doctorId,
    date: '',
    start_time: '',
    end_time: '',
  });

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/book-appointment/`, appointmentData);
      alert('Appointment booked successfully!');
      navigate('/'); // Redirect to appointments page (or wherever)
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={appointmentData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium">Start Time</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={appointmentData.start_time}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="end_time" className="block text-sm font-medium">End Time</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={appointmentData.end_time}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingPage;