class Game {
	constructor(player, ai) {
		this.user = player;
		this.ai = ai;
		this.console = new GameConsole();
		this.coinHead = 0;
		this.coinTail = 0;

		this.currentPlayer = null;
	}

	// Pokemon, GoGoGo!
	start() {
		this.console.logGeneral("Game Start!");
		this.console.logGeneral("Deal cards to both player.");
		// decide who is first
		this.console.logGeneral("Filp a coin to decide play order");
		this.console.logGeneral(this.flipCoin(1));
		
		if (this.coinHead == 1) {//player's turn
			this.userPlayTurn();
		} else {//AI's turn
			this.aiPlayTurn();
		}
	}

	aiPlayTurn() {
		document.getElementById("endTurn").disabled = true;
		this.console.logGeneral("AI's Turn.");
		$(".pokemonallcard").draggable({ disabled: true });
		let temp = this;
		//to test each time get one cardDiscard
		setTimeout(function () {
			temp.ai.dealCardAi();
			applyDrag();
			temp.userPlayTurn();
		}, 3000);

		//TODO Aistatemachine
	}

	userPlayTurn() {
		document.getElementById("endTurn").disabled = false;
		this.console.logGeneral("Player's Turn.");
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
		return "result: " + this.coinHead +" heads, and "+this.coinTail +"tails";
	}

	toString() {
		return "PokemonGoBack";
	}
}
