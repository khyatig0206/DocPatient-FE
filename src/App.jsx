import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Registerpage';
import Footer from './components/Footer';
import Login from './pages/Loginpage'
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>      
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

