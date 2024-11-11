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
        <div style={styles.appContainer}>
            <h1 style={styles.header}>Fruit List From Backend</h1>

            {/* Display loading message */}
            {loading && <p style={styles.loadingText}>Loading fruits...</p>}

            {/* Display error message */}
            {error && <p style={styles.errorText}>{error}</p>}

            {/* Display the list of fruits if not loading and no error */}
            {!loading && !error && (
                <ul style={styles.fruitList}>
                    {fruits.map((fruit, index) => (
                        <li key={index} style={styles.fruitItem}>{fruit}</li>
                    ))}
                </ul>
            )}

            {/* Button to refresh/reload the data */}
            <button 
                onClick={fetchFruits} 
                disabled={loading} 
                style={loading ? styles.loadingButton : styles.refreshButton}
            >
                {loading ? "Loading..." : "Refresh Fruits"}
            </button>
        </div>
    );
}

const styles = {
    appContainer: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        color: '#333'
    },
    header: {
        color: '#2c3e50',
        fontSize: '2rem',
        marginBottom: '20px'
    },
    loadingText: {
        fontSize: '1.2rem',
        color: '#3498db',
        fontWeight: 'bold'
    },
    errorText: {
        fontSize: '1.2rem',
        color: 'red',
        fontWeight: 'bold'
    },
    fruitList: {
        listStyleType: 'none',
        padding: '0',
        fontSize: '1.2rem'
    },
    fruitItem: {
        backgroundColor: '#ecf0f1',
        margin: '10px',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#2c3e50'
    },
    refreshButton: {
        padding: '10px 20px',
        backgroundColor: '#2ecc71',
        color: 'white',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loadingButton: {
        padding: '10px 20px',
        backgroundColor: '#f39c12',
        color: 'white',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'not-allowed',
    }
};

export default App;
