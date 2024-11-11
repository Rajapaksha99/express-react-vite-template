import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [fruits, setFruits] = useState([]);      // State to store fetched fruit data
    const [loading, setLoading] = useState(true);   // State for loading status
    const [error, setError] = useState(null);       // State for error handling

    // Function to fetch fruit data from the API
    const fetchFruits = () => {
        setLoading(true);
        setError(null); // Reset error state
        axios.get('http://localhost:8080/api')
            .then(response => {
                setFruits(response.data.fruits);
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching data. Please try again.");
                setLoading(false);
            });
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchFruits();
    }, []);

    return (
        <div className="App">
            <h1>Fruit List From Backend</h1>

            {/* Display loading message */}
            {loading && <p>Loading fruits...</p>}

            {/* Display error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display the list of fruits if not loading and no error */}
            {!loading && !error && (
                <ul>
                    {fruits.map((fruit, index) => (
                        <li key={index}>{fruit}</li>
                    ))}
                </ul>
            )}

            {/* Button to refresh/reload the data */}
            <button onClick={fetchFruits} disabled={loading}>
                {loading ? "Loading..." : "Refresh Fruits"}
            </button>
        </div>
    );
}

export default App;
