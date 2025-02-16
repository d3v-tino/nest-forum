import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/').then(r => r.json());
      setMessage(response.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data");
    }
  };

  return (
    <div>
      <h1>Nest</h1>
      <h2>Developed by: </h2>
      {message && <p>{message}</p>}
      <button onClick={handleSubmit}>Get developer</button>
    </div>
  );
}

export default App;
