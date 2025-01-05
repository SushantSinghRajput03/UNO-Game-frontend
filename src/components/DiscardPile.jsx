import React from 'react';
    import Card from './Card';

    const DiscardPile = ({ discardPile }) => {
      const topCard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : null;

      return (
        <div className="discard-pile">
          {topCard ? (
            <Card card={topCard} isPlayerCard={true} />
          ) : (
            <div className="card empty-discard">
              <div className="card-center">Empty</div>
            </div>
          )}
        </div>
      );
    };

    export default DiscardPile;
