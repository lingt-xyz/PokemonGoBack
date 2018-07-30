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
        // store prize card
        this.prizeCollection = [];

        this.buildDeck();
        this.buildCardInHand();
        this.buildPrizeCard();
        this.currentPokemon = null;

        //in-turn action
        this.canUseAttact = true;//attack once per turn
        this.canUseEnvolve = true;//envolve once per turn when saticfy envolve require(has stage-one in bench/hand)
        this.canUseTrainer = true;//has at least one trainer in hand && only can use one trainer card per turn
        this.canUseEnergy = true;
        this.canUseRetreat = true;//has energy on pokemon that can use 
    }

    // build deck: use fixed order or randomly generate
    buildDeck() {
        if (this.order) {// if a order is given
            this.order.forEach((element, index) => {
                let card = Card_Collection[element].clone(this.isAi);
                this.deckCollection[index] = card;
                this.cardCollection.push(card);
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
                if (index >= Card_Collection.length) {
                    index = 0;
                }
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
                if (index >= Card_Collection.length) {
                    index = 0;
                }
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
                if (index >= Card_Collection.length) {
                    index = 0;
                }
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

    // 8 prize cards
    buildPrizeCard() {
        let tempCount = 0;
        while (tempCount < 8) {
            let index = Math.floor(Math.random() * Card_Collection.length);
            while (!Card_Collection[index]) {
                index++;
                if (index >= Card_Collection.length) {
                    index = 0;
                }
            }
            let card = Card_Collection[index].clone(this.isAi);
            this.prizeCollection.push(card);
            tempCount++;
        }
    }

    // for each new round, get a new card from deck
    dealCard() {
        if (this.deckCollection.length < 1) {
            logger.logGeneral("empty deck");
        } else {
            if (this.hasPokemon()) {// if player has a pokemon, get a card from deck
                logger.logGeneral("Deal one card to " + (this == ai ? "AI" : "User") + ".");
                this.handCollection.push(this.deckCollection[0]);
                this.deckCollection.shift();
            } else {//if not, get 1 pokemon
                let pokemonCard = this.deckCollection.find(item => item.cardType == Card_Type.pokemon);
                if (pokemonCard) {//if there is pokemon in your deck, get it
                    this.handCollection.push(pokemonCard);
                    removeFromArray(this.deckCollection, pokemonCard);
                } else {//if no pokemon in deck , game end
                    if (this.isAi) {
                        logger.logGeneral("No more pokemon, AI lose the Game ");
                    } else {
                        logger.logGeneral("No more pokemon, you lose the Game ");
                    }
                    return false;
                }
            }
        }
        return true;
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

    /**
     * @returns {boolean}
     */
    playable() {
        // in what cases the player cannot do any action: attack, envolve, use energy, use trainer
        this.canUseEnergy = false;
        for (let item of this.matCollection) {
            if (item.cardType == Card_Type.pokemon) {
                if (item.applyEnergy) {

                } else {
                    this.canUseEnergy = true;
                    break;
                }
            }
        }
        for (let item of this.benchCollection) {
            if (item.cardType == Card_Type.pokemon) {
                if (item.applyEnergy) {

                } else {
                    this.canUseEnergy = true;
                    break;
                }
            }
        }
        return (this.canUseAttact || this.canUseEnvolve || this.canUseTrainer || this.canUseEnergy || this.canUseRetreat);
    }

    updateWhenTurnEnd() {
        this.canUseAttact = true;
        this.canUseEnvolve = true;
        this.canUseTrainer = true;
        this.canUseEnergy = true;
        this.canUseRetreat = true;
        for (let item of this.matCollection) {
            if (item.cardType == Card_Type.pokemon) {
                item.applyEnergy = false;

                if (item.isParalyzed) {
                    item.isParalyzedCounter++;
                }
                if (item.isStuck) {
                    item.isStuckCounter++;
                }
                if(item.isPoisoned){
                    item.currentHp--;
                    // TODO
                }
            }
        }
        for (let item of this.benchCollection) {
            if (item.cardType == Card_Type.pokemon) {
                item.applyEnergy = false;

                if (item.isParalyzed) {
                    item.isParalyzedCounter++;
                }
                if (item.isStuck) {
                    item.isStuckCounter++;
                }
                if(item.isPoisoned){
                    item.currentHp--;
                    // TODO
                }
            }
        }


    }

    canApplyEnergy(pokemon) {
        return !pokemon.applyEnergy;
    }

    play() {
        for (let item of this.matCollection) {
            if (item.cardType == Card_Type.pokemon) {
                item.refreshState();
            }
        }
        for (let item of this.benchCollection) {
            if (item.cardType == Card_Type.pokemon) {
                item.refreshState();
            }
        }
        for (let item of this.handCollection) {
            if (item.cardType == Card_Type.pokemon) {
                item.refreshState();
            }
        }

        if (this.dealCard()) {
            if (this == ai) {
                let pokemon = this.matCollection.find(item => item.cardType == Card_Type.pokemon);
                if (pokemon) {// there is a pokemon on mat
                    let energy = null;
                    if (energy = this.handCollection.find(item => item.cardType == Card_Type.energy)) {
                        removeFromArray(this.handCollection, energy);
                        this.matCollection.push(energy);
                        setTimeout(function () {
                            pokemon.addEnergy(energy);
                            logger.logBattle("(AI) Apply Energy to Pokemon.");
                            removeFromArray(ai.matCollection, energy);
                            ai.discardCollection.push(energy);
                        }, 500);
                    }
                } else {// pick a pokemon, put it on the mat
                    pokemon = this.handCollection.find(item => item.cardType == Card_Type.pokemon);
                    if (pokemon) {
                        removeFromArray(this.handCollection, pokemon);
                        this.matCollection.push(pokemon);
                        this.currentPokemon = pokemon;
                        this.currentPokemon.showImage();
                    } else {
                        logger.logGeneral("No more pokemon, AI lose the Game ");
                        game.isEnd = true;
                    }
                }

                // attack
                if (user.currentPokemon) {
                    for (let element of this.currentPokemon.attacks) {
                        let abilityIndex = 0;
                        if (element.length == 3) {
                            abilityIndex = +element[2];

                        } else if (element.length == 5) {
                            abilityIndex = +element[4];
                        }
                        if (abilityIndex) {
                            if (this.currentPokemon.sufficientEnergy(abilityIndex)) {
                                applyAbility(this.currentPokemon.id, true, abilityIndex);
                            } else {
                                logger.logBattle("(AI) Try to use " + element[0] + " failed: insufficient energy.");
                            }
                            break;
                        }
                    }
                }
                // do more: trainer
            } else {
                // do nothing
            }
        }
    }

}
