import React from 'react';

    const HomePage = ({ setGameMode, playerName }) => {
      return (
        <div className="home-page">
          <h1>Welcome, {playerName}!</h1>
          <h2>Select Game Mode</h2>
          <button onClick={() => setGameMode('single-player')}>
            Single Player
          </button>
          <button onClick={() => setGameMode('multiplayer')}>
            Multiplayer
          </button>
        </div>
      );
    };

    export default HomePage;
