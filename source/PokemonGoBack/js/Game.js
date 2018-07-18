class Game {
	constructor(user, ai) {
		this.user = user;
		this.ai = ai;

		this.coinHead = 0;
		this.coinTail = 0;

		this.currentPlayer = null;
	}

	// Pokemon, GoGoGo!
	start() {
		logger.logGeneral("Game Start!");
		logger.logGeneral("Deal cards to both players.");
		// decide who is first
		logger.logGeneral("Filp a coin to decide play order.");
		logger.logGeneral(this.flipCoin(1));

		if (this.coinHead == 1) {//user's turn
			this.userPlayTurn();
		} else {//AI's turn
			this.aiPlayTurn();
		}
	}

	aiPlayTurn() {
		$("#endTurn").prop("disabled", true);
		logger.logGeneral("AI's Turn.");
		$(".pokemonallcard").draggable({ disabled: true });
		let temp = this;
		//to test each time get one cardDiscard
		setTimeout(function () {
			temp.ai.dealCard();
			applyDrag();
			temp.userPlayTurn();
		}, 3000);

		//TODO Aistatemachine
	}

	userPlayTurn() {
		$("#endTurn").prop("disabled", false);
		logger.logGeneral("User's Turn.");
		$(".pokemonallcard").draggable({ disabled: false });
		this.user.dealCard();
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
		return "result: " + this.coinHead + " heads, and " + this.coinTail + " tails";
	}

	toString() {
		return "PokemonGoBack";
	}
}
