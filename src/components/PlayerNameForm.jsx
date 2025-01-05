import React, { useState } from 'react';

    const PlayerNameForm = ({ onSubmit }) => {
      const [name, setName] = useState('');

      const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(name);
      };

      return (
        <form className="player-name-form" onSubmit={handleSubmit}>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Start Game</button>
        </form>
      );
    };

    export default PlayerNameForm;
