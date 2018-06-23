class Game {
    //numberOfCardInHand = 5;

    // constructor
	
    constructor(player, ai) {
        this.player = player;
        this.ai = ai;
		this.coinhead=0;
		this.cointail=0;
		this.currentplayer =null;
    }
    flipcoin(n)
	{
		var heads = 0;
		var tails = 0;
		while(n >0)
		{	
			 x=(Math.floor(Math.random()*2)==0);
			 if(x)
				 heads += 1;
			 else 
				 tails +=1;
			 n--;
		}
		coinhead=heads;
		cointail=tails;
	}
	
    // Pokemon, GoGoGo!
    start() {
        //this.player.deck;
        //this.player.cardInHand;
        //this.ai.deck;
        //this.ai.cardInHand;
		
		
		$("#divCardDeck").html("Deck:"+this.player.deck.length);
		$("#divCardDiscard").html("Discard:"+this.player.cardDiscard.length)
		
		this.player.dealcard();
        //$("#divCardInHand").html(this.player.cardInHand[0].toHtml());
       // $("#divCardInHand").append(this.player.cardInHand[1].toHtml());
		
    }

    toString() {
        return "PokemonGoBack";
    }
}

// whether shuffle the card or use a fixed order
Game.prototype.isShuffle = false;