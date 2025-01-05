import React from 'react';
import '../styles/ModelRules.css';

const ModelRules = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>UNO Game Rules</h2>
        <div className="rules-content">
          <h3>Basic Rules:</h3>
          <ul>
            <li>Each player starts with 7 cards</li>
            <li>Players must match the top card by number, color, or symbol</li>
            <li>If you can't match, draw a card from the deck</li>
            <li>Say "UNO" when you have one card left</li>
          </ul>

          <h3>Special Cards:</h3>
          <ul>
            <li>Draw Two (+2) - Next player draws 2 cards and misses turn</li>
            <li>Reverse - Changes direction of play</li>
            <li>Skip - Next player loses their turn</li>
            <li>Wild - Change the color of play</li>
            <li>Wild Draw Four (+4) - Change color and next player draws 4 cards</li>
          </ul>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModelRules;
