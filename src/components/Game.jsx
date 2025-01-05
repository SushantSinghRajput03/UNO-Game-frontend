import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { createDeck, shuffleDeck, dealCards } from '../utils/gameLogic';
import ModelRules from './ModelRules';

const Game = ({ gameMode, playerName }) => {
  const [gameState, setGameState] = useState({
    deck: [],
    discardPile: [],
    playerHand: [],
    aiHand: [],
    currentPlayer: 'player',
  });

  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (gameMode === 'single-player') {
      const deck = createDeck();
      shuffleDeck(deck);
      const { playerHand, aiHand, remainingDeck } = dealCards(deck);

      setGameState({
        deck: remainingDeck,
        discardPile: [],
        playerHand,
        aiHand,
        currentPlayer: 'player',
      });
    }
  }, [gameMode]);

  return (
    <div className="game-container">
      <h2>Game Board</h2>
      <p>Game Mode: {gameMode}</p>
      <p>Player Name: {playerName}</p>
      <button className="rules-button" onClick={() => setShowRules(true)}>
        Game Rules
      </button>
      {gameMode === 'single-player' && (
        <GameBoard
          gameState={gameState}
          setGameState={setGameState}
          playerName={playerName}
        />
      )}
      <ModelRules isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
};

export default Game;
