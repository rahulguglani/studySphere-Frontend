import { useState, useEffect } from 'react';
import Topbar from './Topbar';
import './friends.css';

const Friends = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);
  const [activeTab, setActiveTab] = useState('currentFriends');
  const [searchEmail, setSearchEmail] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [rerender, setRerender] = useState(1);

  const reRenderNow = ()=>{
    setTimeout(() => {
    setRerender(rerender + 1);
  }, 500); // Set a delay of 500ms
  };

  useEffect(() => {
    // Fetch data for pending friend requests and current friends
    // Replace the placeholder URLs with your actual API endpoints
    fetch('http://localhost:3000/friends/friends', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentFriends(data.alreadyFriends);
        setPendingRequests(data.pendingFriendRequests);
        setRequestedFriends(data.requestedFriends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rerender]);

  const handleSearch = async () => {
    // Implement logic to search for user by email
    try {
      const response = await fetch(`http://localhost:3000/friends/find-by-email?email=${searchEmail}`);
        if(response.status=== 200){
            const data = await response.json();
            if (data) {
                setFoundUser(data);
            } 
            else {
                setFoundUser(null);
                alert('User not found!');
            }
        }
        else{
            setFoundUser(null);
            alert('User not found!');
        }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const handleFriendRequestAction = (friendshipId, action) => {
    fetch(`http://localhost:3000/friends/update/${friendshipId}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to process friend request');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message); // Display success message
      // Update UI or refetch friend data
      reRenderNow(); // Assuming you have a function to trigger re-rendering
    })
    .catch((error) => {
      console.error(error);
      // Handle errors appropriately (e.g., display error messages to the user)
    });
  };

  const handleRemoveFriend = (friendshipId) => {
    fetch(`http://localhost:3000/friends/remove/${friendshipId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to process friend request');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message); // Display success message
      // Update UI or refetch friend data
      reRenderNow(); // Assuming you have a function to trigger re-rendering
    })
    .catch((error) => {
      console.error(error);
      // Handle errors appropriately (e.g., display error messages to the user)
    });
  };

  const handleSendRequest = async (receiverId) => {
    // Implement logic to send friend request
    try {
      const response = await fetch('http://localhost:3000/friends/add-friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ receiverId }), 
      });

      if (response.status === 201) {
        // Request sent successfully
        alert('Friend request sent !');
        setFoundUser(null);
        setActiveTab('currentFriends');
        reRenderNow();
      } else {
        // Handle other status codes
        alert('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'currentFriends':
        return (
          <div className="current-friends-section">
            <h2>Current Friends</h2>
            {currentFriends.map((friend) => (
              <div key={friend.friendshipId} className="friend-item">
                <h3>{friend.friendName}</h3>
                <p>{friend.friendEmail}</p>
                <button className="remove-friend-btn" onClick={()=> handleRemoveFriend(friend.friendshipId)}>Remove</button>
              </div>
            ))}
            <h3>Requested Friends</h3>
            {requestedFriends.map((friend) =>(
                <div key={friend.friendshipId} className="friend-item">
                <h3>{friend.friendName}</h3>
                <p>{friend.friendEmail}</p>
              </div>
            ))
            }
          </div>
        );
      case 'friendRequests':
        return (
          <div className="pending-requests-section">
            <h2>Pending Friend Requests</h2>
            {pendingRequests.map((request) => (
              <div key={request.friendshipId} className="friend-request-item">
                <p>{request.friendName} has sent you a friend request</p>
                <div className="friend-request-actions">
                  <button className="accept-request-btn" onClick={()=> handleFriendRequestAction(request.friendshipId,'accept')}>Accept</button>
                  <button className="reject-request-btn" onClick={()=> handleFriendRequestAction(request.friendshipId,'reject')}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'addFriends':
        return (
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
          {foundUser && (
            <div>
              <h3>User Details</h3>
              <p>Name: {foundUser.firstName} {foundUser.lastName}</p>
              <p>Email: {foundUser.email}</p>
              <button onClick={()=>handleSendRequest(foundUser.id)}>Send Friend Request</button>
            </div>
          )}
          </div>    
        );
      default:
        return null;
    }
  };
  
  console.log(requestedFriends);

  return (
    <div className='friends-container'>
        
      <Topbar />
      <h2>Friends</h2>
      <div className="tab-buttons">
        <button className='tab-btn' onClick={() => setActiveTab('currentFriends')}>Current Friends</button>
        <button className='tab-btn' onClick={() => setActiveTab('friendRequests')}>Friend Requests</button>
        <button className='tab-btn' onClick={() => setActiveTab('addFriends')}>Add Friends</button>
      </div>
      {renderContent()}      
    </div>
  );
};

export default Friends;
