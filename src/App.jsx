import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="app-container">
            {isLoggedIn ? (
                <Dashboard onLogout={() => setIsLoggedIn(false)} />
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
}

export default App;
