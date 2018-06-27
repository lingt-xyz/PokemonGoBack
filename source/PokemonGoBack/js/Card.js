class Card {
    constructor(id, cardName, cardType) {
        this.id = id;
        this.cardName = cardName;
        this.cardType = cardType;
    }

    getImageName(){
        // TODO convert French letters to English letters
        // TODO remove blans between letters
        // TODO e.g.: a b c =>abc
    }

    toHtml() {
        return "<div id='" + this.id + "' class='pokemonallcard ui-widget-header'>" + this.cardName + "<img height='90px' width='60px' src='image/" + this.cardName + "Card.png'></div>";
    }

    toHtmlAi() {
        return "<div id='" + this.id + "' class='pokemonCardAiHand ui-widget-header'>Card?<img height='90px' width='60px' src='image/DeckCard.png'></div>";
    }

    toString() {
        return "Name:" + this.cardName + ", type:" + this.cardType;
    }
}

class Pokemon extends Card {
    constructor(id, cardName, cardStage, cardBasic, property, hp, retreat, attacks) {
        super(id, cardName, Card_Type.pokemon);
        this.cardStage = cardStage;
        this.cardBasic = cardBasic;
        this.property = property;
        this.hp = hp;
        //[retreatEnergyPoint, retreatEnergyType]
        this.retreat = retreat;
        //[energyType1, energyType1Point, energyType2, energyType2Point, ability]
        this.attacks = attacks;
        this.currentHp = hp;
    }

    toString() {
        return super.toString() + ", stage:" + this.cardStage;
    }

    clone() {
        return new Pokemon(this.id, this.cardName, this.cardStage, this.cardBasic, this.property, this.hp, this.retreat, this.attacks);
    }
}

class Trainer extends Card {
    constructor(id, cardName, trainerType, ability) {
        super(id, cardName, Card_Type.trainer);
        this.trainerType = trainerType;
        this.ability = ability;
    }

    toString() {
        return super.toString() + ", ability:" + Ability_Collection[this.ability];
    }

    clone() {
        return new Trainer(this.id, this.cardName, this.trainerType, this.ability);
    }
}

class Energy extends Card {
    constructor(id, cardName, energy) {
        super(id, cardName, Card_Type.energy);
        this.energy = energy;
    }

    toString() {
        return super.toString() + "energy: " + this.energy;
    }

    clone() {
        return new Energy(this.id, this.cardName, this.energy);
    }
}