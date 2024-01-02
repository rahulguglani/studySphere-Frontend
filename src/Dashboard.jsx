import { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', progress: '', resources: '' });

  useEffect(() => {
    // Fetch subjects data from the backend API
    fetch('your-backend-api-url')
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddSubject = () => {
    setShowPopup(true);
  };

  const handleNewSubjectSubmit = (e) => {
    e.preventDefault();
    console.log('Adding a new subject:', newSubject);
    // Add logic to update subjects state or send to the backend
    setShowPopup(false);
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div className="menu-icon">Menu Icon</div>
        <h1 className="study-sphere-logo">Study Sphere</h1>
        <div className="user-icon">User Icon</div>
      </div>

      <div className="dashboard-content">
        <h1 className="dashboard-heading">Dashboard</h1>
        <div className="subjects-list">
          <h2>Your Subjects</h2>
          <table>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Progress</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.name}</td>
                  <td>{subject.progress}%</td>
                  <td>{subject.resources.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>

      {showPopup && (
        <div className="popup">
          <h2>Add New Subject</h2>
          <form onSubmit={handleNewSubjectSubmit}>
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Progress"
              value={newSubject.progress}
              onChange={(e) => setNewSubject({ ...newSubject, progress: e.target.value })}
            />
            <input
              type="text"
              placeholder="Resources"
              value={newSubject.resources}
              onChange={(e) => setNewSubject({ ...newSubject, resources: e.target.value })}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
