class Card {
    constructor(id, cardName, cardType) {
        this.cardName = cardName;
        this.cardType = cardType;
    }

    toHtml() {
        return "<div id='draggable4' class='pokemonallcard ui-widget-header'>" + this.cardName + "<img height='90px' width='60px' src='image/" + this.cardName + "Card.png'></div>";
    }

    toHtmlAi() {
        return "<div id='draggable4' class='pokemonCardAiHand ui-widget-header'>Card?<img height='90px' width='60px' src='image/DeckCard.png'></div>";

    }
    toString() {
        return this.cardName + "," + this.cardType;
    }
}

class Pokemon extends Card {
    constructor(id, cardName, cardStage, cardBasic, property, hp, retreat, attacks) {
        super(id, cardName, "pokemon");
        this.cardStage = cardStage;
        this.cardBasic = cardBasic;
        this.property = property;
        this.hp = hp;
        this.retreat = retreat;
        this.attacks = attacks;
        this.currentHp = hp;
    }

    toString(){
        return super.toString() + this.cardStage;
    }
}

class Trainer extends Card {
    constructor(id, cardName, trainerType, ability) {
        super(id, cardName, "trainer");
        this.trainerType = trainerType;
        this.ability = ability;
    }

    toString(){
        return super.toString() + this.ability;
    }
}

class Energy extends Card {
    constructor(id, cardName, energy) {
        super(id, cardName, "energy");
        this.energy = energy;
    }

    toString(){
        return super.toString() + this.energy;
    }
}