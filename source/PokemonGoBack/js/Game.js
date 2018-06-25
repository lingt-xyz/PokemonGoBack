class Game {
	constructor(player, ai) {
		this.player = player;
		this.ai = ai;
		this.coinHead = 0;
		this.coinTail = 0;
		this.currentPlayer = null;
	}

	// Pokemon, GoGoGo!
	start() {
		$("#divAiDeck-p").html("Deck:" + this.ai.deck.length);
		$("#divAiDiscard-p").html("Discard:" + this.ai.cardDiscard.length)

		$("#divCardDeck-p").html("Deck:" + this.player.deck.length);
		$("#divCardDiscard-p").html("Discard:" + this.player.cardDiscard.length)

		this.player.cardInHand.forEach(element => {
			$("#divCardInHand").append(element.toHtml());
		});
		$("#divCardDeck-p").html("Deck:" + this.player.deck.length);

		this.ai.cardInHand.forEach(element => {
			$("#divAiHand").append(element.toHtmlAi());
		});
		$("#divAiDeck-p").html("Deck:" + this.ai.deck.length);

		this.flipCoin(1);
		if (this.coinHead == 1) {//player's turn
			$("#svgCardMat-p").html("Player's Turn");
			$(".pokemonallcard").draggable({ disabled: false });
		} else {//AI's turn
			//try disable player 
			$("#svgCardMat-p").html("AI's Turn");
			$(".pokemonallcard").draggable({ disabled: true });
		}
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

	toString() {
		return "PokemonGoBack";
	}
}