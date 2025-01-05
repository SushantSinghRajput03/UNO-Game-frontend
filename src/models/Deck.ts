import { Card, CardColor, CardType } from './Card';

export class Deck {
    private cards: Card[] = [];

    constructor() {
        this.initialize();
    }

    private initialize() {
        // Add number cards (0-9)
        for (const color of Object.values(CardColor).filter(c => c !== CardColor.WILD)) {
            // One 0 card per color
            this.cards.push(new Card(color, CardType.NUMBER, 0));
            // Two of each 1-9 cards per color
            for (let num = 1; num <= 9; num++) {
                this.cards.push(new Card(color, CardType.NUMBER, num));
                this.cards.push(new Card(color, CardType.NUMBER, num));
            }
            // Action cards (two of each per color)
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(color, CardType.SKIP));
                this.cards.push(new Card(color, CardType.REVERSE));
                this.cards.push(new Card(color, CardType.DRAW_TWO));
            }
        }
        // Wild cards
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Card(CardColor.WILD, CardType.WILD));
            this.cards.push(new Card(CardColor.WILD, CardType.WILD_DRAW_FOUR));
        }
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(count: number = 1): Card[] {
        return this.cards.splice(0, count);
    }

    addCards(cards: Card[]): void {
        this.cards.push(...cards);
    }
}
