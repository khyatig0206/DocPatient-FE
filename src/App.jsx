import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Registerpage';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPostsall';
import AppointmentBookingPage from './pages/Appointment';
import GoogleCalendarCallback from './components/GoogleCalendarCallback'
import Login from './pages/Loginpage'
import DoctorsPage from './pages/DoctorsPage'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PatientAppointments from './pages/Appointmentlist';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>      
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/google/callback" element={<GoogleCalendarCallback />} /> 
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/doctors" element={<DoctorsPage/>}/>
        <Route path="/book-appointment/:doctorId" element={<AppointmentBookingPage />} />
        <Route path="/appointments" element={<PatientAppointments/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

