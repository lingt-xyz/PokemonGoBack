class Game {
	constructor() {
		this.coinHead = 0;
		this.coinTail = 0;
		this.isEnd = false;
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
		if (game.isEnd) {

		} else {
			user.initPlayable();
			if (user.isParalyzed) {
				user.isParalyzedCounter++;
			}
			if (user.isStuck) {
				user.isStuckCounter++;
			}
			currentPlayer = ai;
			$("#endTurn").prop("disabled", true);
			logger.logGeneral("AI's Turn.");
			let temp = this;
			ai.play();
			setTimeout(function () {
				temp.userPlayTurn();
			}, 1000);
		}
	}

	userPlayTurn() {
		if (game.isEnd) {

		} else {
			let hasPokemon = false;
			for (let card of user.handCollection) {
				if (card.cardType == Card_Type.pokemon) {
					hasPokemon = true;
				}
			}
			for (let card of user.benchCollection) {
				if (card.cardType == Card_Type.pokemon) {
					hasPokemon = true;
				}
			}
			for (let card of user.matCollection) {
				if (card.cardType == Card_Type.pokemon) {
					hasPokemon = true;
				}
			}
			for (let card of user.deckCollection) {
				if (card.cardType == Card_Type.pokemon) {
					hasPokemon = true;
				}
			}

			if (hasPokemon) {
				ai.initPlayable();
				if (ai.isParalyzed) {
					ai.isParalyzedCounter++;
				}
				if (ai.isStuck) {
					ai.isStuckCounter++;
				}
				currentPlayer = user;
				$("#endTurn").prop("disabled", false);
				logger.logGeneral("User's Turn.");
				user.play();
			} else {
				logger.logBattle("No more pokemon, you lost the game.");
			}

		}
	}
}
