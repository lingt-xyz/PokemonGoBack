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
			this.userPlayTurn();
		} else {//AI's turn
			this.aiPlayTurn();
		}
	}

	aiPlayTurn() {
		document.getElementById("endTurn").disabled = true;
		console.log("ai playing");
		$("#svgCardMat-turn").html("AI's Turn");
		$(".pokemonallcard").draggable({ disabled: true });
		let temp = this;
		//to test each time get one cardDiscard
		setTimeout(function () {
			temp.ai.dealCardAi();
			temp.showGameInfo();
			$("#battle-info").html("");
			applyDrag();
			temp.userPlayTurn();
		}, 3000);

		//TodoAistatemachine
	}
	userPlayTurn() {
		document.getElementById("endTurn").disabled = false;
		$("#svgCardMat-turn").html("Player's Turn");
		$(".pokemonallcard").draggable({ disabled: false });
		console.log("p playing");
		this.player.dealCard();
		this.showGameInfo();
		$("#battle-info").html("");
		applyDrag();
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

	showGameInfo() {
		$("#divAiDeck-p").html("Deck:" + this.ai.deck.length);
		// iterate div

		//$("#divSizeOfHandAi").html("HandCard:" + this.ai.cardInHand.length);
		$("#divSizeOfHandAi").html("HandCard:" + $("#divAiHand").children().length);
		$("#divAiDiscard-p").html("Discard:" + this.ai.cardDiscard.length);
		$("#divCardDeck-p").html("Deck:" + this.player.deck.length);

		//$("#divSizeOfHand").html("HandCard:" + this.player.cardInHand.length);
		$("#divSizeOfHand").html("HandCard:" + $("#divCardInHand").children().length);
		$("#divCardDiscard-p").html("Discard:" + this.player.cardDiscard.length);
	}

	toString() {
		return "PokemonGoBack";
	}
}
