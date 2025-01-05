import React from 'react';
import Card from './Card';
import DiscardPile from './DiscardPile';

const GameBoard = ({ gameState, setGameState, playerName }) => {
  const { deck, discardPile, playerHand, aiHand, currentPlayer } = gameState;

  return (
    <div className="game-board">
      <div className="current-player-indicator">
        Current Turn: {currentPlayer === 'player' ? playerName : 'AI'}
      </div>
      
      <div className="ai-hand">
        <h3>AI's Hand</h3>
        {aiHand.map((card, index) => (
          <Card 
            key={index} 
            card={card} 
            isPlayerCard={false} 
            className="dealt-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      <div className="deck-area">
        <div className="deck" onClick={() => handleDrawCard()}>
          <span>UNO</span>
          <div>{deck.length} cards</div>
        </div>
      </div>

      <DiscardPile discardPile={discardPile} />

      <div className="player-hand">
        <h3>{playerName}'s Hand</h3>
        {playerHand.map((card, index) => (
          <Card 
            key={index} 
            card={card} 
            isPlayerCard={true}
            onClick={() => handleCardPlay(index)}
            className="dealt-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
