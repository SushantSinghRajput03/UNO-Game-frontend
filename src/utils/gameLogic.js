const colors = ['red', 'green', 'blue', 'yellow'];
    const values = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'Skip',
      'Reverse',
      'Draw Two',
    ];
    const wildValues = ['Wild', 'Wild Draw Four'];

    export const createDeck = () => {
      const deck = [];
      for (const color of colors) {
        for (const value of values) {
          deck.push({ color, value });
        }
      }
      for (const wildValue of wildValues) {
        for (let i = 0; i < 4; i++) {
          deck.push({ color: 'wild', value: wildValue });
        }
      }
      return deck;
    };

    export const shuffleDeck = (deck) => {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    };

    export const dealCards = (deck) => {
      const playerHand = [];
      const aiHand = [];
      for (let i = 0; i < 7; i++) {
        playerHand.push(deck.pop());
        aiHand.push(deck.pop());
      }
      return { playerHand, aiHand, remainingDeck: deck };
    };
