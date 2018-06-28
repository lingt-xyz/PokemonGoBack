class Player {
    constructor(order, isAi = false) {
        this.order = order;
        this.isAi = isAi;
        this.cardCollection = Card_Collection;
        this.deck = [];
        // this deck is used to store all the cards' current info
        this.monitorDeck = [];
        this.cardInHand = [];
        //card in bench
        this.cardActive = [];
        this.cardDiscard = [];
        this.buildDeck();
        
        // to update deckId, so we can track cards' information from monitorDeck
        this.deck.forEach((element, index) => {
            element.deckId = index;
            this.monitorDeck.push(element);
        });

        this.buildCardInHand();
		
    }
		
    // build deck: user fixed order or randomly generate
    buildDeck() {
        if (this.order) {// if a order is given
            this.order.forEach((element, index) => {
                this.deck[index] = Card_Collection[element].clone(this.isAi);
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
            if (Card_Collection[index].cardType == Card_Type.pokemon) {
                this.deck.push(Card_Collection[index].clone(this.isAi));
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
	
	putToDiscardAi(){
		//put active card to discard
		//test just put deckcard to discard
		 this.cardDiscard.unshift(this.deck[0]);
		 this.deck.shift();
		 $("#divAiDeck-p").html("Deck:" + this.deck.length)
		 $("#divAiDiscard-p").html("Discard:" + this.cardDiscard.length);
	}
	putToDiscard(){
		//put active card to discard
		//test just put deckcard to discard
		 this.cardDiscard.unshift(this.deck[0]);
		 this.deck.shift();
		 $("#divCardDeck-p").html("Deck:" + this.deck.length);
		 $("#divCardDiscard-p").html("Discard:" + this.cardDiscard.length);
	}
    // check Mulligan by looking into cards in hands
    isMulligan() {
        return !(this.cardInHand.find(item => item.cardType == Card_Type.pokemon));
    }

    toString() {
        return "Player";
    }
}
