import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // const userId = 13
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
    <div className='bg-buttoncolor min-h-screen'>
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl text-mycolor font-semibold mb-4">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {appointments.map((appointment) => (
            <div key={`${appointment.date}-${appointment.start_time}`}>
              {/* Doctor's profile picture */}
              <div className="flex items-center mb-1">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${appointment.doctor_profile}`}
                  alt="Doctor Profile"
                  className="w-24 h-24 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-mycolor">
                    Appointment with {appointment.doctor_name}
                  </h3>
                  <p className="text-sm text-gray-500">At {appointment.establishment_name}</p>
                
              

              {/* Appointment details */}
              <div className="text-sm flex space-x-2 text-gray-600">
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {new Date(`1970-01-01T${appointment.start_time}`).toLocaleTimeString()}</p>
                <p><strong>End Time:</strong> {appointment.end_time ? new Date(`1970-01-01T${appointment.end_time}`).toLocaleTimeString() : 'Not specified'}</p>
                <p><strong>Duration:</strong> {appointment.duration}</p>
              </div>
              <a
                    href={appointment.google_event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View event in Google Calendar
                  </a>
              </div>
              
              </div>
              {/* Google Calendar event link */}


                  


            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default PatientAppointments;
