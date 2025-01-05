import React from 'react';

const Card = ({ card, isPlayerCard, onClick }) => {
  if (!isPlayerCard) {
    return (
      <div className="card card-back" onClick={onClick}>
        <div className="card-back-content">
          <div className="uno-logo">UNO</div>
        </div>
      </div>
    );
  }

  const cardClass = `card ${card.color}`;

  const renderSymbol = (type) => {
    switch (type) {
      case 'Reverse':
        return (
          <div className="action-symbol reverse-symbol">
            <div className="reverse-arrows">
              <i className="fas fa-sync-alt"></i>
            </div>
          </div>
        );
      case 'Draw Two':
        return (
          <div className="action-symbol draw-two-symbol" />
        );
      case 'Wild Draw Four':
        return (
          <div className="action-symbol wild-draw-four-symbol" />
        );
      case 'Skip':
        return (
          <div className="action-symbol skip-symbol">
            <i className="fas fa-ban"></i>
          </div>
        );
      default:
        return null;
    }
  };

  const centerContent = () => {
    switch (card.value) {
      case 'Reverse':
      case 'Skip':
      case 'Draw Two':
        return renderSymbol(card.value);
      default:
        return (
          <span className="number-value" style={{ color: card.color }}>
            {card.value}
          </span>
        );
    }
  };

  const renderCardContent = () => {
    const renderCornerContent = () => (
      <>
        <div className="card-corner top-left">
          {card.value === 'Reverse' ? (
            <div className="reverse-arrows">
              <i className="fas fa-sync-alt"></i>
            </div>
          ) : (
            <span className={`card-value ${isActionCard(card.value) ? 'action-value' : ''}`}>
              {getCornerText(card.value)}
            </span>
          )}
        </div>
        <div className="card-corner bottom-right">
          {card.value === 'Reverse' ? (
            <div className="reverse-arrows">
              <i className="fas fa-sync-alt"></i>
            </div>
          ) : (
            <span className={`card-value ${isActionCard(card.value) ? 'action-value' : ''}`}>
              {getCornerText(card.value)}
            </span>
          )}
        </div>
      </>
    );

    const renderCenterContent = () => {
      if (card.value === 'Wild' || card.value === 'Wild Draw Four') {
        return (
          <div className="card-center wild-center">
            <div className="wild-circle">
              <div className="wild-quadrant red"></div>
              <div className="wild-quadrant blue"></div>
              <div className="wild-quadrant yellow"></div>
              <div className="wild-quadrant green"></div>
            </div>
          </div>
        );
      }

      return (
        <div className="card-center">
          {centerContent()}
        </div>
      );
    };

    return (
      <>
        {renderCornerContent()}
        {renderCenterContent()}
      </>
    );
  };

  // Helper functions
  const isActionCard = (value) => {
    return ['Reverse', 'Skip', 'Draw Two', 'Wild Draw Four'].includes(value);
  };

  const getCornerText = (value) => {
    switch (value) {
      case 'Wild Draw Four':
        return '+4';
      case 'Draw Two':
        return '+2';
      case 'Skip':
        return '⊘';
      default:
        return value;
    }
  };

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="card-inner">
        {renderCardContent()}
      </div>
    </div>
  );
};

export default Card;
