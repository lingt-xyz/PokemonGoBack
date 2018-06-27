class Player {
    constructor(order, isAi = false) {
        this.order = order;
        this.isAi = isAi;
        this.cardCollection = Card_Collection;
        this.deck = [];
        this.cardInHand = [];
        //card in bench
        this.cardActive = [];
        this.cardDiscard = [];
        this.buildDeck();
        this.buildCardInHand();
    }

    // build deck: user fixed order or randomly generate
    buildDeck() {
        if (this.order) {// if a order is given
            this.order.forEach((element, index) => {
                this.deck[index] = Card_Collection[element].clone();
            });
        } else {// generate deck
            generateDeck();
        }
    }

    // randomly generate deck
    generateDeck() {
        // at least one pokemon
        let pokemonCount = 1 + Math.floor(Math.random() * 4);
        let tempPokemonCount = 0;
        while (tempPokemonCount < pokemonCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            if (Card_Collection[index].cardType == Card_Type.pokemon) {
                this.deck.push(Card_Collection[index]);
                tempPokemonCount++;
            }
        }
        // 0-3 trainer
        let trainerMax = 4 - pokemonCount;
        let trainerCount = Math.floor(Math.random() * trainerMax);
        let tempTrainerCount = 0;
        while (tempTrainerCount < trainerCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            if (Card_Collection[index].cardType == Card_Type.trainer) {
                this.deck.push(Card_Collection[index]);
                tempTrainerCount++;
            }
        }

        // others should be energy
        let energyCount = 60 - pokemonCount - trainerCount;
        let tempEnergyCount = 0;
        while (tempEnergyCount < energyCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            if (Card_Collection[index].cardType == Card_Type.energy) {
                this.deck.push(Card_Collection[index]);
                tempEnergyCount++;
            }
        }

        // shuffle
        this.deck = shuffle(this.deck);
    }

    buildCardInHand() {
        for (let i = 0; i < 7; i++) {
            this.cardInHand.push(this.deck[i]);
        }
        if (this.isMulligan()) {
            this.cardInHand = [];
            this.buildCardInHand();
        } else {
            for (let i = 0; i < 7; i++) {
                this.deck.shift();
            }
        }
    }

    // check Mulligan by looking into cards in hands
    isMulligan() {
        return !(this.cardInHand.find(item => item.cardType == Card_Type.pokemon));
    }

    toString() {
        return "Player";
    }
}
