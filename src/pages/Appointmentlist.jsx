import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = window.localStorage.getItem('user_id');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/appointments/?user_id=${userId}`);

        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {appointments.map((appointment) => (
            <div key={`${appointment.date}-${appointment.start_time}`} className="p-4 border rounded-md">
              {/* Doctor's profile picture */}
              <div className="flex items-center mb-4">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${appointment.doctor_profile}`}
                  alt="Doctor Profile"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Appointment with Dr. {appointment.doctor_name}
                  </h3>
                  <p className="text-sm text-gray-500">{appointment.establishment_name}</p>
                </div>
              </div>

              {/* Appointment details */}
              <div className="text-sm">
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Start Time: {new Date(`1970-01-01T${appointment.start_time}`).toLocaleTimeString()}</p>
                <p>End Time: {appointment.end_time ? new Date(`1970-01-01T${appointment.end_time}`).toLocaleTimeString() : 'Not specified'}</p>
                <p>Duration: {appointment.duration}</p>
              </div>

              {/* Google Calendar event link */}
              {appointment.google_event_link && (
                <div className="mt-4">
                  <a
                    href={appointment.google_event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Add to Google Calendar
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
