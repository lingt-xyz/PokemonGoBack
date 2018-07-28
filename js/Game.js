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
		logger.logGeneral("Flip a coin to decide who plays first.");

		if (flipCoin()) {//user's turn
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
		ai.play();
		setTimeout(function () {
			temp.userPlayTurn();
		}, 1000);
	}

	userPlayTurn() {
		currentPlayer = user;
		$("#endTurn").prop("disabled", false);
		logger.logGeneral("User's Turn.");
		user.play();
	}
}
