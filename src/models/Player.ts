import { Card } from './Card';
import { CardColor, CardType } from './Card';

export class Player {
    private cards: Card[] = [];
    private score: number = 0;

    constructor(public readonly name: string) {}

    addCards(cards: Card[]): void {
        this.cards.push(...cards);
    }

    removeCard(index: number): Card {
        return this.cards.splice(index, 1)[0];
    }

    getCards(): Card[] {
        return [...this.cards];
    }

    hasUno(): boolean {
        return this.cards.length === 1;
    }

    public getValidMoves(topCard: Card, currentColor: CardColor): number[] {
        return this.cards
            .map((card, index) => ({ card, index }))
            .filter(({ card }) => 
                card.color === currentColor ||
                card.color === CardColor.WILD ||
                (card.type === CardType.NUMBER && topCard.type === CardType.NUMBER && card.value === topCard.value)
            )
            .map(({ index }) => index);
    }

    public addScore(points: number): void {
        this.score += points;
    }

    public getScore(): number {
        return this.score;
    }
}
