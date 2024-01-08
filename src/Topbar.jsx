import './dashboard.css';
import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { useNavigate } from 'react-router-dom';


const Topbar = ()=>{

  const [userDetails, setUserDetails] = useState({firstName:"user"});
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('accessToken');
    console.log('Logout successful');
    navigate('/');
  }
  useEffect(() => {
    // Fetch user details from the backend API using the access token
    fetch('http://localhost:3000/student/getDetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => console.error(error));
    },[]);

  return (
    <div className="top-bar">
      <div className="menu-icon">Menu</div>
      <h1 className="study-sphere-logo">Study Sphere</h1>
      <div className="user-icon">
        <Modal modalName = {userDetails.firstName} data = "userDetails" />
      <button className="logout-btn"onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;