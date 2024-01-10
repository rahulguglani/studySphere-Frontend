import { useState, useEffect } from 'react';
import Topbar from './Topbar';
import './friends.css';

const Friends = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
 
  const [searchEmail, setSearchEmail] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    // Fetch data for pending friend requests and current friends
    // Replace the placeholder URLs with your actual API endpoints
    fetch('your-api-url/pending-requests')
      .then((response) => response.json())
      .then((data) => setPendingRequests(data))
      .catch((error) => console.error(error));

    fetch('your-api-url/current-friends')
      .then((response) => response.json())
      .then((data) => setCurrentFriends(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = async () => {
    // Implement logic to search for user by email
    try {
      const response = await fetch(`your-backend-api/search?email=${searchEmail}`);
      const data = await response.json();

      if (data) {
        setFoundUser(data);
      } else {
        setFoundUser(null);
        // Handle case when user is not found
        alert('User not found!');
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const handleSendRequest = async () => {
    // Implement logic to send friend request
    try {
      const response = await fetch('your-backend-api/sendFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ email: searchEmail }),
      });

      if (response.status === 200) {
        // Request sent successfully
        alert('Friend request sent!');
      } else {
        // Handle other status codes
        alert('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className='friends-container'>
        
      <Topbar />
      <h2>Friends</h2>
      <div className="pending-requests-section">
        <h2>Pending Friend Requests</h2>
        {pendingRequests.map((request) => (
          <div key={request.id} className="friend-request-item">
            <p>{request.senderName} has sent you a friend request</p>
            <div className="friend-request-actions">
              <button className="accept-request-btn">Accept</button>
              <button className="reject-request-btn">Reject</button>
            </div>
          </div>
        ))}
      </div>

      <div className="current-friends-section">
        <h2>Current Friends</h2>
        {currentFriends.map((friend) => (
          <div key={friend.id} className="friend-item">
            <p>{friend.friendName}</p>
            <button className="remove-friend-btn">Remove</button>
          </div>
        ))}
      </div>

      <div className="add-friend-section">
        <h2>Add New Friend</h2>
        <div className="search-section">
          <input
            type="email"
            placeholder="Enter friend's email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        <button onClick={handleSearch}>Search</button>
      </div>
      </div>
      
      {foundUser && (
        <div>
          <h3>User Details</h3>
          <p>Name: {foundUser.first_name} {foundUser.last_name}</p>
          <p>Email: {foundUser.email}</p>
          <button onClick={handleSendRequest}>Send Friend Request</button>
        </div>
      )}
    </div>
  );
};

export default Friends;
