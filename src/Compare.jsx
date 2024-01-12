import { useState } from 'react';
import Topbar from './Topbar';
import './compare.css';
import SearchBySubject from './components/SearchBySubject';
import CompareByFriend from './components/SearchByFriend';
import { useNavigate } from 'react-router-dom';

const Compare = () => {
    const [activeTab, setActiveTab] = useState('compareBySubject');
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    function checkToken() {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/');
          return false;
        }
        fetch('http://localhost:3000/student/checkToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return response.json();
        })
        .then(data => {
            setUserId(data.userId);
          console.log(data.userId);
        })
        .catch(error => {
          console.error('Error checking token:', error);
        });
      }

    checkToken();
    const renderContent = () => {
        switch (activeTab) {
          case 'compareBySubject':
            return (
              <div className="current-friends-section">
                <h2>Compare by subject</h2>
                <SearchBySubject/>
              </div>
            );
          case 'compareByFriend':
            return (
              <div className="pending-requests-section">
                <h2>Compare by friend</h2>
                <CompareByFriend userId = {userId} />
              </div>
            );
          default:
            return null;
        }
      };
      
  return (
    <div className='compare-container'>
        
      <Topbar />
      <h2>Compare</h2>
      <div className="tab-buttons">
        <button className='tab-btn' onClick={() => setActiveTab('compareBySubject')}>Compare by Subject</button>
        <button className='tab-btn' onClick={() => setActiveTab('compareByFriend')}>Compare by Friend</button>
      </div> 
      {renderContent()}           
    </div>
  )
}

export default Compare