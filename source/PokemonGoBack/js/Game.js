class Game {
	constructor() {
		this.coinHead = 0;
		this.coinTail = 0;
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
		currentPlayer = ai;
		$("#endTurn").prop("disabled", true);
		logger.logGeneral("AI's Turn.");
		let temp = this;
		setTimeout(function () {
			ai.play();
			temp.userPlayTurn();
		}, 3000);
	}

	userPlayTurn() {
		currentPlayer = user;
		$("#endTurn").prop("disabled", false);
		logger.logGeneral("User's Turn.");
		user.play();
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
		return "Result: " + this.coinHead + " head(s), and " + this.coinTail + " tail(s)";
	}

	toString() {
		return "PokemonGoBack";
	}
}
