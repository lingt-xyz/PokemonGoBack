class Player {
    constructor(order, isAi = false) {
        //whether use fixed order
        this.order = order;
        this.isAi = isAi;

        this.role = isAi ? "AI" : "User";

        // store all cards being used by this player, this collection should never be modified after deck is initialized
        this.cardCollection = [];
        // store current cards in deck
        this.deckCollection = [];
        // store current cards in hand
        this.handCollection = [];
        // store current cards on bench
        this.benchCollection = [];
        // store current cards on mat
        this.matCollection = [];
        // store current cards been discarded
        this.discardCollection = [];
        // store prize card
        this.prizeCollection = [];

        this.buildDeck();
        this.buildCardInHand();
        this.currentPokemon = null;
    }

    // build deck: use fixed order or randomly generate
    buildDeck() {
        if (this.order) {// if a order is given
            this.order.forEach((element, index) => {
                this.deckCollection[index] = Card_Collection[element].clone(this.isAi);
            });
        } else {// generate deck
            this.generateDeck();
        }
    }

    // randomly generate deck
    generateDeck() {
        // at least one pokemon
        let pokemonCount = 1 + Math.floor(Math.random() * 4);
        let tempPokemonCount = 0;
        while (tempPokemonCount < pokemonCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            while (!Card_Collection[index]) {
                index++;
            }
            if (Card_Collection[index].cardType == Card_Type.pokemon) {
                let card = Card_Collection[index].clone(this.isAi);
                this.deckCollection.push(card);
                this.cardCollection.push(card);
                tempPokemonCount++;
            }
        }
        // 0-3 trainer
        let trainerMax = 4 - pokemonCount;
        let trainerCount = Math.floor(Math.random() * trainerMax);
        let tempTrainerCount = 0;
        while (tempTrainerCount < trainerCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            while (Card_Collection[index] == null) {
                index++;
            }
            if (Card_Collection[index].cardType == Card_Type.trainer) {
                let card = Card_Collection[index].clone(this.isAi);
                this.deckCollection.push(card);
                this.cardCollection.push(card);
                tempTrainerCount++;
            }
        }

        // others should be energy
        let energyCount = 60 - pokemonCount - trainerCount;
        let tempEnergyCount = 0;
        while (tempEnergyCount < energyCount) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            while (Card_Collection[index] == null) {
                index++;
            }
            if (Card_Collection[index].cardType == Card_Type.energy) {
                let card = Card_Collection[index].clone(this.isAi);
                this.deckCollection.push(card);
                this.cardCollection.push(card);
                tempEnergyCount++;
            }
        }

        // shuffle
        this.deckCollection = shuffle(this.deckCollection);
    }

    buildCardInHand() {
        while (true) {
            this.handCollection = [];
            for (let i = 0; i < 7; i++) {
                this.handCollection.push(this.deckCollection[i]);
            }

            if (this.isMulligan()) {
                logger.logWarning("Mulligan! Shuffle deck.");
                this.deckCollection = shuffle(this.deckCollection);
            } else {
                break;
            }
        }
        for (let i = 0; i < 7; i++) {
            this.deckCollection.shift();
        }
    }

    // check Mulligan by looking into cards in hands
    isMulligan() {
        return !(this.handCollection.find(item => item.cardType == Card_Type.pokemon));
    }

    // for each new round, get a new card from deck
    dealCard() {
        if (this.deckCollection.length < 1)
            alert("empty deck");
        else {
            if (this.hasPokemon()) {// if player has a pokemon, get a card from deck
                logger.logGeneral("Deal on card to " + this.role + ".");
                this.handCollection.push(this.deckCollection[0]);
                this.deckCollection.shift();
            } else {//if not, get 1 pokemon
                let pokemonCard = this.deckCollection.find(item => item.cardType == Card_Type.pokemon);
                if (pokemonCard) {//if there is pokemon card in your deck, get it
                    this.handCollection.push(pokemonCard);
                    removeFromArray(this.deckCollection, pokemonCard);
                } else {//if no pokemon card in deck , game end
                    logger.logGeneral("No more pokemon card, you lose the Game ");
                }
            }
        }
    }

    // check whether player has pokemon card can be used
    hasPokemon() {
        if (this.matCollection.find(item => item.cardType == Card_Type.pokemon)
            || this.benchCollection.find(item => item.cardType == Card_Type.pokemon)
            || this.handCollection.find(item => item.cardType == Card_Type.pokemon)) {
            return true;
        } else {
            return false;
        }
    }

    toString() {
        return "Player";
    }
}
