import React, { useState, useEffect } from 'react';
    import HomePage from './components/HomePage';
    import Game from './components/Game';
    import PlayerNameForm from './components/PlayerNameForm';
    import { storeUserName, getUserName } from './utils/localStorage';

    function App() {
      const [playerName, setPlayerName] = useState(() => getUserName() || '');
      const [gameMode, setGameMode] = useState(null);

      useEffect(() => {
        if (playerName) {
          storeUserName(playerName);
        }
      }, [playerName]);

      const handleNameSubmit = (name) => {
        setPlayerName(name);
      };

      return (
        <div>
          {!playerName && <PlayerNameForm onSubmit={handleNameSubmit} />}
          {playerName && !gameMode && (
            <HomePage setGameMode={setGameMode} playerName={playerName} />
          )}
          {gameMode && <Game gameMode={gameMode} playerName={playerName} />}
        </div>
      );
    }

    export default App;
