import { Card, CardType, CardColor } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';

export interface GameState {
    currentColor: CardColor;
    currentPlayer: number;
    direction: number;
    lastAction?: string;
}

export class Game {
    private deck: Deck;
    private discardPile: Card[] = [];
    private players: Player[] = [];
    private currentPlayerIndex: number = 0;
    private direction: number = 1; // 1 for clockwise, -1 for counterclockwise
    private currentColor: CardColor;
    private unoAnnounced: boolean = false;
    private challengeAvailable: boolean = false;
    private lastAction?: string;
    
    constructor(playerCount: number) {
        if (playerCount < 2 || playerCount > 10) {
            throw new Error('Player count must be between 2 and 10');
        }
        
        this.deck = new Deck();
        this.initializeGame(playerCount);
    }

    private initializeGame(playerCount: number): void {
        this.deck.shuffle();
        
        // Create players and deal initial cards
        for (let i = 0; i < playerCount; i++) {
            const player = new Player(`Player ${i + 1}`);
            player.addCards(this.deck.draw(7));
            this.players.push(player);
        }

        // Initial card for discard pile
        let topCard = this.deck.draw(1)[0];
        while (topCard.type !== CardType.NUMBER) {
            this.deck.addCards([topCard]);
            this.deck.shuffle();
            topCard = this.deck.draw(1)[0];
        }
        this.discardPile.push(topCard);
        this.currentColor = topCard.color;
    }

    public getGameState(): GameState {
        return {
            currentColor: this.currentColor,
            currentPlayer: this.currentPlayerIndex,
            direction: this.direction,
            lastAction: this.lastAction
        };
    }

    public setWildColor(color: CardColor): void {
        if (color === CardColor.WILD) {
            throw new Error('Must choose a valid color for wild card');
        }
        this.currentColor = color;
    }

    public announceUno(): void {
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (currentPlayer.getCards().length === 1) {
            this.unoAnnounced = true;
        }
    }

    public challengeWildDraw4(): boolean {
        if (!this.challengeAvailable) return false;
        
        const previousPlayer = this.getPreviousPlayer();
        const hasMatchingColor = previousPlayer.getCards().some(card => 
            card.color === this.getTopCard().color && card.type !== CardType.WILD_DRAW_FOUR
        );

        if (hasMatchingColor) {
            // Challenger was right, previous player draws 4
            previousPlayer.addCards(this.deck.draw(4));
            return true;
        } else {
            // Challenge failed, current player draws 6
            this.players[this.currentPlayerIndex].addCards(this.deck.draw(6));
            return false;
        }
    }

    private checkForPenalty(): void {
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (currentPlayer.getCards().length === 1 && !this.unoAnnounced) {
            currentPlayer.addCards(this.deck.draw(2));
        }
    }

    public playCard(playerId: number, cardIndex: number): boolean {
        if (playerId !== this.currentPlayerIndex) return false;
        
        const player = this.players[playerId];
        const card = player.getCards()[cardIndex];
        
        if (!card.canPlayOn(this.getTopCard())) return false;
        
        // Remove card from player's hand and add to discard pile
        player.removeCard(cardIndex);
        this.discardPile.push(card);
        
        // Handle special cards
        this.handleSpecialCard(card);
        
        // Move to next player
        this.nextPlayer();
        
        const result = true;
        if (result) {
            this.checkForPenalty();
            this.unoAnnounced = false;
            this.challengeAvailable = card.type === CardType.WILD_DRAW_FOUR;
            this.currentColor = card.color === CardColor.WILD ? this.currentColor : card.color;
        }
        return result;
    }

    private handleSpecialCard(card: Card): void {
        switch (card.type) {
            case CardType.SKIP:
                this.nextPlayer();
                break;
            case CardType.REVERSE:
                this.direction *= -1;
                break;
            case CardType.DRAW_TWO:
                const nextPlayer = this.players[this.getNextPlayerIndex()];
                nextPlayer.addCards(this.deck.draw(2));
                this.nextPlayer();
                break;
            case CardType.WILD_DRAW_FOUR:
                const targetPlayer = this.players[this.getNextPlayerIndex()];
                targetPlayer.addCards(this.deck.draw(4));
                this.nextPlayer();
                break;
        }
    }

    private nextPlayer(): void {
        this.currentPlayerIndex = this.getNextPlayerIndex();
    }

    private getNextPlayerIndex(): number {
        return (this.currentPlayerIndex + this.direction + this.players.length) % this.players.length;
    }

    private getPreviousPlayer(): Player {
        const prevIndex = (this.currentPlayerIndex - this.direction + this.players.length) % this.players.length;
        return this.players[prevIndex];
    }

    private getTopCard(): Card {
        return this.discardPile[this.discardPile.length - 1];
    }

    drawCard(): Card[] {
        const cards = this.deck.draw(1);
        this.players[this.currentPlayerIndex].addCards(cards);
        return cards;
    }

    isGameOver(): boolean {
        return this.players.some(player => player.getCards().length === 0);
    }

    public calculateScore(): number {
        let score = 0;
        this.players.forEach(player => {
            player.getCards().forEach(card => {
                switch (card.type) {
                    case CardType.NUMBER:
                        score += card.value!;
                        break;
                    case CardType.SKIP:
                    case CardType.REVERSE:
                    case CardType.DRAW_TWO:
                        score += 20;
                        break;
                    case CardType.WILD:
                    case CardType.WILD_DRAW_FOUR:
                        score += 50;
                        break;
                }
            });
        });
        return score;
    }
}
