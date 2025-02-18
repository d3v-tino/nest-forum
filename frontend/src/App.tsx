import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState("");
  const API_BASE_URL = process.env.API_BASE_URL;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`)
      .then(r => r.json())
      .catch(e => console.error(e));
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
