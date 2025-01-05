export enum CardColor {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow',
    WILD = 'wild'
}

export enum CardType {
    NUMBER = 'number',
    SKIP = 'skip',
    REVERSE = 'reverse',
    DRAW_TWO = 'draw_two',
    WILD = 'wild',
    WILD_DRAW_FOUR = 'wild_draw_four'
}

export class Card {
    constructor(
        public readonly color: CardColor,
        public readonly type: CardType,
        public readonly value?: number
    ) {}

    canPlayOn(topCard: Card, currentColor: CardColor = topCard.color): boolean {
        if (this.type === CardType.WILD || this.type === CardType.WILD_DRAW_FOUR) {
            return true;
        }
        
        return this.color === currentColor || 
               (this.type === topCard.type && this.type === CardType.NUMBER && this.value === topCard.value);
    }

    getPoints(): number {
        switch (this.type) {
            case CardType.NUMBER:
                return this.value!;
            case CardType.SKIP:
            case CardType.REVERSE:
            case CardType.DRAW_TWO:
                return 20;
            case CardType.WILD:
            case CardType.WILD_DRAW_FOUR:
                return 50;
            default:
                return 0;
        }
    }
}
