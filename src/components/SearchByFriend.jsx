import { useState, useEffect } from 'react';

function CompareByFriend(props) {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setFriends(data.alreadyFriends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFriendChange = (event) => {
    setSelectedFriend(event.target.value);
  };

  const handleCompare = async () => {
    setError(null); // Clear any previous errors

    if (!selectedFriend) {
      setError('Please select a friend to compare');
      return;
    }

    try {
        fetch(`http://localhost:3000/compare/by-friend/${selectedFriend}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here
            },
          })
          .then((response) => response.json())
      .then((data) => setComparisonData(data.sharedSubjectsArray))
      .catch((error) => console.error(error));
    } catch (error) {
      setError('Failed to fetch comparison data');
    }
  };

  return (
    <div>
      <select value={selectedFriend} onChange={handleFriendChange}>
        <option value="">Select a friend</option>
        {friends.map((friend) => (
          <option key={friend.userIdReceiver===props.userId?friend.userIdSender:friend.userIdReceiver} value={friend.userIdReceiver===props.userId?friend.userIdSender:friend.userIdReceiver}>
            {friend.friendName}
          </option>
        ))}
      </select>
      <button onClick={handleCompare}>Compare</button>
      {error && <p className="error">{error}</p>}
      <div className='subjects-list'>
      {comparisonData && (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Your Progress</th>
              <th>Friends Progress</th>
              <th>Your Resources</th>
              <th>Friends Resources</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((subjectData) => (
              <tr key={subjectData.subjectId}>
                <td>{subjectData.subjectName}</td>
                <td>{subjectData.userProgress.you}</td>
                <td>{subjectData.userProgress.friend}</td>
                <td>
                  {subjectData.resources.you.map((resource) => (
                    <p key={resource} >{resource}</p>
                  ))}
                </td>
                <td>
                  {subjectData.resources.friend.map((resource) => (
                    <p key={resource} >{resource}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default CompareByFriend;
