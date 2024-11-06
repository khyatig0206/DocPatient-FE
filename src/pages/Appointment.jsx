import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentBookingPage = () => {
  const { doctorId } = useParams(); // Get doctorId from the URL
  const navigate = useNavigate();
  const [error, setError] = useState('');
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
    setError(''); // Clear previous errors

    // Get the current date and time
    const now = new Date();
    const selectedDate = new Date(appointmentData.date);
    const selectedTime = new Date(`${appointmentData.date}T${appointmentData.start_time}`);

    // Validate if the selected date and time are in the future
    if (selectedDate < now.setHours(0, 0, 0, 0)) {
      setError('The appointment date cannot be in the past.');
      return;
    }
    if (selectedTime <= now) {
      setError('The appointment start time must be greater than the current time.');
      return;
    }

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
    <div className="bg-buttoncolor">
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white  shadow-md rounded-lg max-w-md mx-auto mt-4 mb-5 p-6">
        <h1 className="text-2xl font-semibold text-textcolor mb-2 text-center">Book an Appointment</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="flex justify-center bg-red-100 rounded-lg p-2 text-red-500 text-sm ">{error}</div>} {/* Display error messages */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentData.date}
              onChange={handleChange}
              onFocus={() => { setError(''); }} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
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
              onFocus={() => { setError(''); }} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
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
              onFocus={() => { setError(''); }} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-mycolor focus:border-mycolor outline-mycolor"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-mycolor text-white rounded-md hover:bg-buttoncolor2 transition-colors"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AppointmentBookingPage;
