import { useState } from 'react';

const AddResource = (props) => {
  const [resourceUrl, setResourceUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjectId = props.subjectId;
    try {
      // Assuming you have the access token stored in local storage
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch('http://localhost:3000/dashboard/add-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ subjectId, resourceUrl }),
      });

      if (response.ok) {
        // Resource added successfully, you can perform additional actions if needed
        console.log('Resource added successfully');
        setResourceUrl(''); // Clear the input field
        props.closeModal();
        props.rerender();
      } else {
        // Handle error scenarios
        console.error('Failed to add resource');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Resource</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="resourceUrl">Resource URL:</label>
        <input
          type="text"
          id="resourceUrl"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          required
        />
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
};

export default AddResource;
