import './dashboard.css';
import { useState } from 'react';

const Topbar = ()=>{
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  
  const handleUserClick = () => {
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
        setShowUserDetails(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="top-bar">
      <div className="menu-icon">Menu</div>
      <h1 className="study-sphere-logo">Study Sphere</h1>
      <div className="user-icon" onClick={handleUserClick}>User</div>

      {showUserDetails && (
        <div className="user-details-popup">
          <h2>User Details</h2>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          <p>Contact Number: {userDetails.contactNumber}</p>
          <button onClick={() => setShowUserDetails(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Topbar;