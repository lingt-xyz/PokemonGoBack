class Game {
	constructor(player, ai) {
		this.player = player;
		this.ai = ai;
		this.coinHead = 0;
		this.coinTail = 0;
		this.currentPlayer = null;
		$("#divCardInHand").html("");
		$("#divCardActive").html("");
		$("#divAiHand").html("");
		$("#divAiActive").html("");
		$("#svgCardMat").html("");
		$("#svgCardMatAi").html("");
$("#battle-info").html("");
	}
    playerEndTurnButton()
	{
		var x = document.getElementById("endTurn");
		if(this.player.ismyTurn = true)
		{
			x.style.display = "block";
		}else
			x.style.display = "none";
		
	}
	
	// Pokemon, GoGoGo!
	start() {
		

		// show user's cards
		this.player.cardInHand.forEach((element) => {
			$("#divCardInHand").append(element.toHtml());
		});

		// show AI's cards
		this.ai.cardInHand.forEach(element => {
			$("#divAiHand").append(element.toHtmlAi());
		});



this.showGameInfo();
		// decide who is first
		this.flipCoin(1);
		if (this.coinHead == 1) {//player's turn
			this.player.ismyTurn =true;
			this.playerEndTurnButton();
			$("#svgCardMat-turn").html("Player's Turn");
			this.userPlayTurn();
		} else {//AI's turn
			//try disable player 
			$("#svgCardMat-turn").html("AI's Turn");
			this.aiPlayTurn();
		}
	}
	
	aiPlayTurn(){
		console.log("ai playing");
		$("#svgCardMat-turn").html("AI's Turn");
		$(".pokemonallcard").draggable({ disabled: true });
		let temp = this;
		//to test each time get one cardDiscard
		 setTimeout(function() {
			temp.ai.dealCardAi();
			temp.userPlayTurn();
			}, 3000);
		
		
		//TodoAistatemachine
	}
	userPlayTurn(){
		$("#svgCardMat-turn").html("Player's Turn");
		$(".pokemonallcard").draggable({ disabled: false });
		console.log("p playing");
		this.player.dealCard();
	}
	flipCoin(n) {
		this.coinHead = 0;
		this.coinTail = 0;
		while (n > 0) {
			if (Math.floor(Math.random() * 2))
				this.coinHead++;
			else
				this.coinTail++;
			n--;
		}
	}

showGameInfo(){
			$("#divAiDeck-p").html("Deck:" + this.ai.deck.length);
		$("#divAiActive-p").html("HandCard:" + this.ai.cardInHand.length);
		$("#divAiDiscard-p").html("Discard:" + this.ai.cardDiscard.length);
		$("#divCardDeck-p").html("Deck:" + this.player.deck.length);
		$("#divCardActive-p").html("HandCard:" + this.player.cardInHand.length);
		$("#divCardDiscard-p").html("Discard:" + this.player.cardDiscard.length);
$("#battle-info").html("");
	}

	toString() {
		return "PokemonGoBack";
	}
}
