import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './App.css'
import Dashboard from './Dashboard';
import Friends from './Friends';
import MyProfile from './MyProfile';

const App = () => {
  return (
  <div className='app'>
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/profile' element={<MyProfile/>} />
    </Routes>
  </Router>
  </div>
  );
};

export default App;