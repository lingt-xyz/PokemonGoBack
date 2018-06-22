class Player {
    constructor(cardCollection, deck, isShuffle = false, order = []) {
        this.cardCollection = cardCollection;
        this.deck = deck;
        this.isShuffle = isShuffle;
        this.order = order;
        // we should shuffle here, or use fixed order
        this.cardInHand = [];
        this.cardActive = [];
        this.cardDiscard = [];
        this.generateCardInHand();
    }

    generateCardInHand() {
        if (this.isShuffle) {
            do {
                for (let index of this.order) {// TODO what we really need?
                    this.cardInHand.push(cardCollection[index]);
                }
            } while (this.isMulligan());
        } else {
            // TODO
            this.cardInHand.push(this.cardCollection[0]);
            this.cardInHand.push(this.cardCollection[1]);
        }
    }

    // check Mulligan by looking into cards in hands
    isMulligan() {
        return this.cardInHand.find(item => item.cardType === "PokeMon");
    }

    toString() {
        return "Player";
    }
}