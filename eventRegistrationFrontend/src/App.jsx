import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyRegistrations from './pages/MyRegistrations';
import Navbar from './components/Navbar';
import AddEvent from './pages/AddEvent';
import ManageEvents from './pages/ManageEvents';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
         <Route path="/add-event" element={<AddEvent />} />
        <Route path="/manage-events" element={<ManageEvents />} />
      </Routes>
    </>
  );
}
