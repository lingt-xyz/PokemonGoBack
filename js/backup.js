
function gatherBattleInfo(sourceCard, sub) {
	let you = null;
	let opponent = null;
	if (sourceCard.isAi) {
		you = ai;
		opponent = user;
	} else {
		you = user;
		opponent = ai;
	}

	if (sub instanceof Dam) {
		let damHp = 0;
		if (isNaN(sub.damHp)) {
			let ss = sub.damHp.split("*");
			let num1 = 0;
			let num2 = 0;
			let string2 = "";
			if (ss[0].contains("count")) {
				num1 = ss[1];
				string2 = ss[0];
			} else {
				num1 = ss[0];
				string2 = ss[1];
			}
			// TODO remove strings
			switch (string2) {
				case "your-bench":
					num2 = you.benchCollection.length;
					break;
				case "your-active:damage":
					if (you.currentPokemon) {
						num2 = you.currentPokemon.damage;
					} else {
						num2 = 0;
					}
					break;
				case "opponent-active:energy":
					if (you.currentPokemon) {
						num2 = you.currentPokemon.energy + you.currentPokemon.currentColorLessEnergy;
					} else {
						num2 = 0;
					}
					break;
				default:
					break;
			}
			damHp = num1 * num2;
		} else {
			damHp = sub.damHp;
		}
		switch (sub.target) {
			case Target_Pokemon.opponent:
				dam(opponent.currentPokemon, damHp);
				break;
			case Target_Pokemon.opponent_active:
				dam(opponent.currentPokemon, damHp);
				break;
			case Target_Pokemon.your_active:
				dam(you.currentPokemon, damHp);
				break;
			case Target_Pokemon.choice_opponent:
				logger.logChooseAllCard(opponent, Attack_Type.dam, damHp);
				break;
			case Target_Pokemon.choice_your:
				break;
			case Target_Pokemon.choice_opponent_bench:
				break;
			case Target_Pokemon.choice_your_banch:
				break;
			default:
				break;
		}
	} else if (sub instanceof Heal) {
		target.hp += sub.number;
		switch (sub.target) {
			case Target_Pokemon.opponent_active:
				//
				break;
			case Target_Pokemon.your_active:
				me.currentPokemon.currentHp += sub.number;
				break;
			case Target_Pokemon.choice_opponent:
				// 
				break;
			case Target_Pokemon.choice_your:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_opponent_bench:
				// 
				break;
			case Target_Pokemon.choice_your_banch:
				// 
				break;
			default:
				break;
		}
	} else if (sub instanceof Deenergize) {
		switch (sub.target) {
			case Target_Pokemon.opponent_active:

				break;
			case Target_Pokemon.your_active:

				break;
			case Target_Pokemon.choice_opponent:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_opponent_bench:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your_banch:
				// TODO choose one card
				break;
			default:
				break;
		}
	} else if (sub instanceof Reenergize) {

	} else if (sub instanceof Swap) {

	} else if (sub instanceof Destat) {

	} else if (sub instanceof ApplyStat) {

	} else if (sub instanceof Draw) {

	} else if (sub instanceof Redamage) {

	} else if (sub instanceof Search) {

	} else if (sub instanceof Deck) {

	} else if (sub instanceof Shuffle) {

	} else if (sub instanceof Add) {

	}
}

/**
* 
* @param {Pokemon} sourceCard 
* @param {SubAbility} sub the SubAbility
*/
function attack(sourceCard, sub) {
	let me = null;
	let you = null;
	if (sourceCard.isAi) {
		me = ai;
		you = user;
	} else {
		me = user;
		you = ai;
	}

	if (sub instanceof Dam) {
		let damHp = 0;
		if (sub.damHp.contains("count")) {
			let ss = sub.damHp.split("*");
			let num1 = 0;
			let num2 = 0;
			let string2 = "";
			if (ss[0].contains("count")) {
				num1 = ss[1];
				string2 = ss[0];
			} else {
				num1 = ss[0];
				string2 = ss[1];
			}
			// TODO remove strings
			switch (string2) {
				case "your-bench":
					num2 = me.benchCollection.length;
					break;
				case "your-active:damage":
					if (me.currentPokemon) {
						num2 = me.currentPokemon.damage;
					} else {
						num2 = 0;
					}
					break;
				case "opponent-active:energy":
					if (you.currentPokemon) {
						num2 = you.currentPokemon.energy + you.currentPokemon.currentColorLessEnergy;
					} else {
						num2 = 0;
					}
					break;
				default:
					break;
			}
			damHp = num1 * num2;
		} else {
			damHp = sub.damHp;
		}
		switch (sub.target) {
			case Target_Pokemon.opponent:
				//TODO
				break;
			case Target_Pokemon.opponent_active:
				your.currentPokemon.currentHp -= damHp;
				break;
			case Target_Pokemon.your_active:
				me.currentPokemon.currentHp -= damHp;
				break;
			case Target_Pokemon.choice_opponent:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_opponent_bench:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your_banch:
				// TODO choose one card
				break;
			default:
				break;
		}
	} else if (sub instanceof Heal) {
		target.hp += sub.number;
		switch (sub.target) {
			case Target_Pokemon.opponent_active:
				//
				break;
			case Target_Pokemon.your_active:
				me.currentPokemon.currentHp += sub.number;
				break;
			case Target_Pokemon.choice_opponent:
				// 
				break;
			case Target_Pokemon.choice_your:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_opponent_bench:
				// 
				break;
			case Target_Pokemon.choice_your_banch:
				// 
				break;
			default:
				break;
		}
	} else if (sub instanceof Deenergize) {
		switch (sub.target) {
			case Target_Pokemon.opponent_active:

				break;
			case Target_Pokemon.your_active:

				break;
			case Target_Pokemon.choice_opponent:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_opponent_bench:
				// TODO choose one card
				break;
			case Target_Pokemon.choice_your_banch:
				// TODO choose one card
				break;
			default:
				break;
		}
	} else if (sub instanceof Reenergize) {

	} else if (sub instanceof Swap) {

	} else if (sub instanceof Destat) {

	} else if (sub instanceof ApplyStat) {

	} else if (sub instanceof Draw) {

	} else if (sub instanceof Redamage) {

	} else if (sub instanceof Search) {

	} else if (sub instanceof Deck) {

	} else if (sub instanceof Shuffle) {

	} else if (sub instanceof Add) {

	}
}
