$(function () {
	$("#gobackDiv").hide();
	initAbility();
	initCardCollection();
});

function startNewGame() {
	logger = new GameConsole();
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);
	
	startGame();
}

function startDefinedGame() {
	logger = new GameConsole();
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);

	startGame();
}

function startGame() {
	game = new Game();

	if (aiVue) {
		aiVue.$data.player = ai;
	} else {
		aiVue = new Vue({
			el: '#divAi',
			data: {
				player: ai
			}
		})
	}

	if (userVue) {
		userVue.$data.player = user;
	} else {
		userVue = new Vue({
			el: '#divUser',
			data: {
				player: user
			}
		})
	}

	$("#hideDiv").hide();
	$("#gobackDiv").fadeIn(1000);

	game.start();
}

function showCardInfo(id, isAi) {
	if (isAi) {
		let card = findFromArray(ai.cardCollection, id);
		logger.logGeneral(card.toConsole());
	} else {
		let card = findFromArray(user.cardCollection, id);
		logger.logGeneral(card.toConsole());
	}
}

function loadDefaultImg(id) {
	$("#" + id + "").attr("src", "image/Default.png");
}

/**
 * 
 * @param {Number} id 
 * @param {boolean} isAi 
 * @param {Number} abilityIndex 
 */
function applyAbility(id, isAi, abilityIndex) {
	$('#divGameConsole :button').prop('disabled', true);
	let sourceCard = null;
	if (isAi) {
		sourceCard = ai.currentPokemon;
	} else {
		sourceCard = user.currentPokemon;
	}
	if (sourceCard.consumeEnergy(abilityIndex)) {
		useAbility(sourceCard, abilityIndex);
	} else {
		logger.logBattle("Failed, insufficient energy.");
	}
}

/**
* 
* @param {Pokemon} sourceCard 
* @param {Number} abilityIndex the index of the abilities it has
*/
function useAbility(sourceCard, abilityIndex) {
	let ability = Ability_Collection[abilityIndex];
	switch (abilityIndex) {
		case 1:
			//Act Cute:deck:target:opponent:destination:deck:bottom:choice:them:1
			deckRandomCard(sourceCard.isAi);
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
		case 10:
			break;
		case 11:
			break;
		case 12:
			break;
		case 13:
			break;
		case 14:
			break;
		case 15:
			break;
		case 16:
			break;
		case 17:
			break;
		case 18:
			break;
		case 19:
			break;
		case 20:
			break;
		case 21:
			break;
		case 22:
			break;
		case 23:
			break;
		case 24:
			break;
		case 25:
			break;
		case 26:
			break;
		case 27:
			break;
		case 28:
			break;
		case 29:
			break;
		case 30:
			break;
		case 31:
			break;
		case 32:
			break;
		case 33:
			break;
		case 34:
			break;
		case 35:
			break;
		case 36:
			break;
		case 37:
			break;
		case 38:
			break;
		case 39:
			break;
		case 40:
			break;
		case 41:
			break;
		case 22:
			break;
	}
}

function deckRandomCard(isAi) {
	if (isAi) {
		ai.handCollection;
	} else {
		user.handCollection;
	}

}

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

function dragstart_handler(ev) {
	ev.dataTransfer.setData("id", ev.target.id);
	ev.dataTransfer.setData("role", ev.target.attributes["data-role"].value);
	ev.dataTransfer.setData("container", ev.target.parentElement.parentElement.id);
}

function dragover_handler(ev) {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
	ev.preventDefault();
	let id = ev.dataTransfer.getData("id");
	let role = ev.dataTransfer.getData("role");
	let sourceName = ev.dataTransfer.getData("container");
	let targetId = ev.target.id;
	let targetContainer = ev.target.parentElement.parentElement.id;

	ev.stopPropagation();

	if (game.currentPlayer == ai) {
		logger.logWarning("Relax, it's Ai's turn now.");
		return;
	}

	if (role != "user") {// this card is from AI or from other div
		logger.logWarning("This card is not movable!");
		return;
	}

	// this card is from user
	if (sourceName == "divHandCollection") { // this card is from handCollection, it can be moved to bench, mat
		let sourceCard = findFromArray(user.handCollection, id);
		if (isNaN(targetId)) {// moving to a div
			if (sourceCard.cardType == Card_Type.energy) {// moving an energy
				logger.logWarning("Energy cannot be moved to here!");
			} else if (sourceCard.cardType == Card_Type.trainer) {// moving a trainer
				logger.logGeneral("TODO: Trainer!");
			} else {// moving a pokemon
				if (targetId == "divBenchCollection") {// moving to bench
					removeFromArray(user.handCollection, sourceCard);
					user.benchCollection.push(sourceCard);
				} else if (targetId == "divMatCollection") {// moving to mat
					if (user.matCollection.find(item => item.cardType == Card_Type.pokemon)) {
						logger.logWarning("A pokemon is already battling!");
					} else {
						removeFromArray(user.handCollection, sourceCard);
						user.matCollection.push(sourceCard);
						user.currentPokemon = sourceCard;
					}
				} else if (targetId == "divHandCollection") {// moving in the same div, do nothing

				} else {// moving to other div
					logger.logWarning("Pokemon cannot be moved to here!");
				}
			}
		} else {// moving to a card
			if (targetContainer == "divBenchCollection") {
				let targetCard = findFromArray(user.benchCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					logger.logGeneral("TODO: Trainer!");
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						logger.logBattle("Apply Energy to Pokemon " + targetCard.cardName);
						// TODO some cards only have colorless energy
						targetCard.addEnergy(sourceCard);
						removeFromArray(user.handCollection, sourceCard);
						user.discardCollection.push(sourceCard);
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logGeneral("TODO: Trainer!");
					} else {// moving a pokemon to a pokemon: evolve
						if (sourceCard.cardBasic == targetCard.cardName) {
							logger.logBattle("Evolve card " + targetCard.cardName + " to " + sourceCard.cardName);
							removeFromArray(user.benchCollection, targetCard);
							user.discardCollection.push(targetCard);
							removeFromArray(user.handCollection, sourceCard);
							user.benchCollection.push(sourceCard);
						} else {// do nothing

						}
					}
				}
			} else if (targetContainer == "divMatCollection") {
				let targetCard = findFromArray(user.matCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					logger.logGeneral("TODO: Trainer!");
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						logger.logBattle("Apply Energy to Pokemon " + targetCard.cardName);
						targetCard.addEnergy(sourceCard);
						removeFromArray(user.handCollection, sourceCard);
						user.discardCollection.push(sourceCard);
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logGeneral("TODO: Trainer!");
					} else {// moving a pokemon to a pokemon: envole
						if (sourceCard.cardBasic == targetCard.cardName) {
							logger.logBattle("Evolve card " + targetCard.cardName + " to " + sourceCard.cardName);
							removeFromArray(user.matCollection, targetCard);
							user.discardCollection.push(targetCard);
							removeFromArray(user.handCollection, sourceCard);
							user.matCollection.push(sourceCard);
						} else {// do nothing

						}
					}
				}
			} else {// moving to other div, do nothing

			}
		}
	} else if (sourceName == "divBenchCollection") { // this card is from benchCollection, it can be moved to mat only
		let sourceCard = findFromArray(user.benchCollection, id);
		if (isNaN(targetId)) {// moving to a div
			if (sourceCard.cardType == Card_Type.energy) {// moving an energy
				logger.logError("Unexpected logic error!");
			} else if (sourceCard.cardType == Card_Type.trainer) {// moving a trainer
				logger.logGeneral("TODO: Trainer!");
			} else {// moving a pokemon
				if (targetId == "divBenchCollection") {// moving in the same div, do nothing

				} else if (targetId == "divMatCollection") {// moving to mat
					if (user.matCollection.find(item => item.cardType == Card_Type.pokemon)) {
						logger.logWarning("A pokemon is already battling!");
					} else {
						removeFromArray(user.benchCollection, sourceCard);
						user.matCollection.push(sourceCard);
						user.currentPokemon = sourceCard;
					}
				} else if (targetId == "divHandCollection") {// moving back to handCollection
					logger.logWarning("Pokemon cannot be moved back to here!");
				} else {// moving to other div
					logger.logWarning("Pokemon cannot be moved to here!");
				}
			}
		} else {// moving to a card
			if (targetContainer == "divBenchCollection") {// do nothing

			} else if (targetContainer == "divMatCollection") {
				let targetCard = findFromArray(user.matCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					logger.logGeneral("TODO: Trainer!");
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						logger.logError("Unexpected logic error!");
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logGeneral("TODO: Trainer!");
					} else {// moving a pokemon to a pokemon: envole
						if (sourceCard.cardBasic == targetCard.cardName) {
							logger.logBattle("Evolve card " + targetCard.cardName + " to " + sourceCard.cardName);
							removeFromArray(user.matCollection, targetCard);
							user.discardCollection.push(targetCard);
							removeFromArray(user.benchCollection, sourceCard);
							user.matCollection.push(sourceCard);
						} else {// do nothing

						}
					}
				}
			} else {// moving to other div, do nothing

			}
		}
	} else if (sourceName == "divMatCollection") {// this card is from matCollection
		let sourceCard = findFromArray(user.matCollection, id);
		if (isNaN(targetId)) {// moving to a div
			if (sourceCard.cardType == Card_Type.energy) {// moving an energy
				logger.logError("Unexpected logic error!");
			} else if (sourceCard.cardType == Card_Type.trainer) {// moving a trainer
				logger.logGeneral("TODO: Trainer!");
			} else {// moving a pokemon
				if (targetId == "divBenchCollection") {// moving to bench, retreat
					if (sourceCard.retreat.length == 2) {// needs energy (colorless) to retreat
						let energyNeeded = sourceCard.retreat[0];
						if (sourceCard.currentColorLessEnergy >= energyNeeded) {
							sourceCard.currentColorLessEnergy -= energyNeeded;
							logger.logBattle("Retreat " + sourceCard.cardName + ".");
							findAndRemoveFromArray(user.matCollection, sourceCard);
							user.benchCollection.push(sourceCard);
						} else if ((sourceCard.currentColorLessEnergy + sourceCard.currentEnergy) >= energyNeeded) {
							sourceCard.currentEnergy = (sourceCard.currentEnergy + sourceCard.currentColorLessEnergy - energyNeeded);
							logger.logBattle("Retreat " + sourceCard.cardName + ".");
							findAndRemoveFromArray(user.matCollection, sourceCard);
							user.benchCollection.push(sourceCard);
						} else {
							logger.logBattle("Retreat " + sourceCard.cardName + " failed, insufficient energy.");
						}
					} else {
						logger.logBattle("Retreat " + sourceCard.cardName + ".");
						findAndRemoveFromArray(user.matCollection, sourceCard);
						user.benchCollection.push(sourceCard);
					}
				} else if (targetId == "divMatCollection") {// moving in the same div, do nothing

				} else if (targetId == "divHandCollection") {// moving back to handCollection
					logger.logWarning("Pokemon cannot be moved back to here!");
				} else if (targetId == "divMatCollectionAi") {// moving to ai mat: battle
					logger.logAbility(sourceCard);
				} else {// moving to other div
					logger.logWarning("Pokemon cannot be moved to here!");
				}
			}
		} else {// moving to a card
			// TODO hardest part to be implemented
			if (targetContainer == "divMatCollectionAi") {
				logger.logWarning("Please move to your oppent's mat to battle.");
				/*
				let targetCard = findFromArray(ai.matCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (targetCard.cardType == Card_Type.trainer) {
					logger.logGeneral("TODO: Trainer!");
				} else {// targetCard is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						logger.logError("Unexpected logic error!");
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logGeneral("TODO: Trainer!");
					} else {// moving a pokemon to a pokemon: battle
						// TODO battle
						// 1. list abilites
						// 2. choose an ability
						// 3. apply ability
						let abilityIndex = chooseAbility(sourceCard);
						if (abilityIndex == 1 || abilityIndex == 2) {
							sourceCard.attack(targetCard, abilityIndex);
						} else{ 
							// do nothing
						}
						
					}
				}
				*/
			} else {// moving to other div, do nothing

			}
		}
	} else {
		logger.logError("This card is not movable!");
	}

	ev.stopPropagation();
}