class Game {
    //numberOfCardInHand = 5;

    // constructor
    constructor(player, ai) {
        this.player = player;
        this.ai = ai;
    }

    // Pokemon, GoGoGo!
    start() {
        //this.player.deck;
        //this.player.cardInHand;
        //this.ai.deck;
        //this.ai.cardInHand;
        $("#divCardInHand").html(this.player.cardInHand[0].toHtml());
        $("#divCardInHand").append(this.player.cardInHand[1].toHtml2());
    }

    toString() {
        return "PokemonGoBack";
    }
}

// whether shuffle the card or use a fixed order
Game.prototype.isShuffle = false;