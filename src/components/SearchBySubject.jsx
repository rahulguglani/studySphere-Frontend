import { useState, useEffect } from 'react';

function SearchBySubject() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subjects for the current user
    fetch('http://localhost:3000/dashboard/user-subjects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.userSubjects);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleCompare = async () => {
    setError(null); // Clear any previous errors

    if (!selectedSubject) {
      setError('Please select a subject to compare');
      return;
    }

    try {
        fetch(`http://localhost:3000/compare/by-subject/${selectedSubject}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here
            },
          })
          .then((response) => response.json())
      .then((data) => setComparisonData(data.friendProgress))
      .catch((error) => console.error(error));
    } catch (error) {
      setError('Failed to fetch comparison data');
    }
  };

  return (
    <div>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject.subjectId} value={subject.subjectId}>
            {subject.subjectName}
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
              <th>Friend</th>
              <th>Progress</th>
              <th>Resources</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((friendData) => (
              <tr key={friendData.userId}>
                <td>{friendData.name}</td>
                <td>{friendData.progress}</td>
                <td>
                  {friendData.resources.map((resource) => (
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

export default SearchBySubject;