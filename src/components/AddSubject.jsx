import { useState, useEffect } from 'react';

const AddSubject = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    // Fetch subjects data from the backend API
    fetch('http://localhost:3000/dashboard/unused-subjects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here
      },
    })
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  const handleSelectSubject = () => {
    // Logic to handle selecting the subject
    console.log('Selected Subject:', selectedSubject);
    const subjectName = selectedSubject;
    fetch('http://localhost:3000/dashboard/add-subject-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here
      },
      body: JSON.stringify({ subjectName }),
    })
      .then((response) => {
        if (response.ok) {
          // Subject added successfully
          console.log('added progress of :', subjectName);
          // Perform any additional logic as needed
        } else {
          // Handle error response from the server
          return response.json().then((errorData) => {
            console.error('Error adding subject:', errorData);
            // Perform error handling logic
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network errors or other issues
      });
      props.closeModal();
      props.rerender();
  };

  const handleAddNewSubject = () => {
    // Logic to handle adding a new subject
    console.log('New Subject:', newSubject);
    fetch('http://localhost:3000/dashboard/add-subject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here
      },
      body: JSON.stringify({ newSubject }),
    })
      .then((response) => {
        if (response.ok) {
          // Subject added successfully
          console.log('New Subject:', newSubject);
          // Perform any additional logic as needed
        } else {
          // Handle error response from the server
          return response.json().then((errorData) => {
            console.error('Error adding subject:', errorData);
            // Perform error handling logic
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network errors or other issues
      });
      props.closeModal();
      props.rerender();
  };

  return (
    <div>
      <label>Select Subject:</label>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="" disabled>Select a Subject</option>
        {subjects.map((subject) => (
          <option key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</option>
        ))}
      </select>
      <button onClick={handleSelectSubject}>Select</button>
      <div className='orcent'>OR</div>
      <div>
        <label>Add New Subject:</label>
        <input type="text" value={newSubject} onChange={handleNewSubjectChange} />
        <button onClick={handleAddNewSubject}>Add</button>
      </div>
    </div>
  );
};

export default AddSubject