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
			 let x=(Math.floor(Math.random()*2)==0);
			 if(x)
				 heads += 1;
			 else 
				 tails +=1;
			 n--;
		}
		this.coinhead=heads;
		this.cointail=tails;
	}
	
    // Pokemon, GoGoGo!
    start() {
        //this.player.deck;
        //this.player.cardInHand;
        //this.ai.deck;
        //this.ai.cardInHand;
		

		
		$("#divAiDeck-p").html("Deck:"+this.ai.deck.length);
		$("#divAiDiscard-p").html("Discard:"+this.ai.cardDiscard.length)
		
		$("#divCardDeck-p").html("Deck:"+this.player.deck.length);
		$("#divCardDiscard-p").html("Discard:"+this.player.cardDiscard.length)
		
		this.player.dealcard();
		this.ai.dealCardAi();
        
		this.flipcoin(1);
		if(this.coinhead ==1)
		{//player's turn
			$("#svgCardMat-p").html("Player's Turn");
			$( ".pokemonallcard" ).draggable({disabled:false});
		}	
		else{
			//AI's turn
			//try disable player 
			$("#svgCardMat-p").html("AI's Turn");
			$( ".pokemonallcard" ).draggable({disabled:true});
		}
    }

    toString() {
        return "PokemonGoBack";
    }
}

// whether shuffle the card or use a fixed order
Game.prototype.isShuffle = false;
