class Player {
    constructor(order, isAi = false) {
        //whether use fixed order
        this.order = order;
        this.isAi = isAi;

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
        // store all the cards would be used by this player
        this.cardCollection = this.deckCollection;
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
                this.deckCollection.push(Card_Collection[index].clone(this.isAi));
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
                this.deckCollection.push(Card_Collection[index].clone(this.isAi));
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
                this.deckCollection.push(Card_Collection[index].clone(this.isAi));
                tempEnergyCount++;
            }
        }

        // shuffle
        this.deckCollection = shuffle(this.deckCollection);
    }

    validateCurrentCard(){
        //TODO validate
        return true;
    }

    // TODO it's possible that always Mulligan
    buildCardInHand() {
        this.handCollection = [];
        for (let i = 0; i < 7; i++) {
            this.handCollection.push(this.deckCollection[i]);
        }
        if (this.isMulligan()) {
            this.deckCollection = shuffle(this.deckCollection);
            this.buildCardInHand();
        } else {
            for (let i = 0; i < 7; i++) {
                this.deckCollection.shift();
            }
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
            console.log("deal 1 --player ");
            this.handCollection.unshift(this.deckCollection[0]);
            this.deckCollection.shift();
            // TODO validate
            // TODO use vue
            //$("#divCardInHand").append(this.handCollection[0].toHtml());
        }
    }

    // TODO this method should be removed
    dealCardAi() {
        if (this.deckCollection.length < 1)
            alert("empty deck");
        else {
            console.log("deal 1 --ai");

            if(this.currentPokemon == null){
                let pokemonIndex = -1;
                this.handCollection.forEach((element, index)=>{
                    if(element.cardType == Card_Type.pokemon){
                        this.currentPokemon = element;
                        pokemonIndex = index;
                    }
                });
                this.handCollection.splice(pokemonIndex, 1);
                $("#svgCardMatAi").html(this.currentPokemon.toHtml());
            }
            this.handCollection.unshift(this.deckCollection[0]);
            this.deckCollection.shift();
            $("#divAiHand").append(this.handCollection[0].toHtmlAi());
        }
    }

    toString() {
        return "Player";
    }
}
