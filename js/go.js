$(function () {
	$("#gobackDiv").hide();
	initAbility();
	initCardCollection();
});

function startNewGame() {
	logger = new GameConsole();
	user = new Player(null, false);
	ai = new Player(null, true);

	startGame();
}

function startDefinedGame() {
	logger = new GameConsole();
	user = new Player(Deck_Defined_User, false);
	ai = new Player(Deck_Defined_AI, true);

	startGame();
}

function startEnvolveGame() {
	logger = new GameConsole();
	user = new Player(Deck_Heal, false);
	ai = new Player(null, true);

	startGame();
}

function startChooseAbilityGame() {
	logger = new GameConsole();
	user = new Player(Deck_Choose, false);
	ai = new Player(null, true);

	startGame();
}

function startItemGame() {
	logger = new GameConsole();
	user = new Player(Deck_Heal, false);
	ai = new Player(Deck_Heal_AI, true);

	startGame();
}

function startPrizeGame(){
	logger = new GameConsole();
	user = new Player(Deck_Heal_AI, false);
	ai = new Player(Deck_Heal, true);

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

function flipCoin() {
	let res = getRandom(1);
	if (res) {
		logger.logGeneral("Flip a coin: Head");
	} else {
		logger.logGeneral("Flip a coin: Tail");
	}
	return res;
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

function showDiscard() {
	if (user.discardCollection.length) {
		let info = "Show discard:";
		for (let card of user.discardCollection) {
			info += "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + card.cardType + ": " + card.cardName;
		}
		logger.logGeneral(info);
	} else {
		logger.logGeneral("Nothing to show.");
	}

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
	if (sourceCard.sufficientEnergy(abilityIndex)) {
		useAbility(sourceCard, abilityIndex);
		sourceCard.consumeEnergy(abilityIndex);
	} else {
		logger.logBattle("Failed, insufficient energy.");
	}
}

function chooseCard(player) {
	let prompt = "";
	for (let item of player.matCollection) {
		if (item.cardType == Card_Type.pokemon) {
			prompt += (item.id + ":" + item.cardName + ";");
		}
	}
	for (let item of player.benchCollection) {
		if (item.cardType == Card_Type.pokemon) {
			prompt += (item.id + ":" + item.cardName);
		}
	}

	let res = prompt("Choose your target: " + prompt, "");

	if (isNaN(res)) {
		return null;
	} else {
		for (let item of player.matCollection) {
			if (item.cardType == Card_Type.pokemon) {
				if (item.id == res) {
					return item;
				}
			}
		}
		for (let item of player.benchCollection) {
			if (item.cardType == Card_Type.pokemon) {
				if (item.id == res) {
					return item;
				}
			}
		}
		return null;
	}
}
function chooseHandCard(player) {
	let prompt = "";

	for (let item of player.handCollection) {

		prompt += (item.id + ":" + item.cardName);

	}

	let res = prompt("Choose your target: " + prompt, "");

	if (isNaN(res)) {
		return null;
	} else {
		for (let item of player.handCollection) {
			if (item.id == res) {
				return item;
			}

		}
		return null;
	}
}
function chooseOneDeckCardinArrangeOf(player,arrange_start, arrange_end){
	let cardsWaitForChoose = player.deckCollection.slice(arrange_start,arrange_end);
	let prompt = "";

	for (let item of cardsWaitForChoose) {

		prompt += (item.id + ":" + item.cardName);

	}

	let res = prompt("Choose your target: " + prompt, "");

	if (isNaN(res)) {
		return null;
	} else {
		for (let item of cardsWaitForChoose) {
			if (item.id == res) {
				return item;
			}
		}
		return null;
	}
}

function chooseCardRandom(player) {
	let randomArray = [];
	for (let item of player.matCollection) {
		if (item.cardType == Card_Type.pokemon) {
			randomArray.push(item);
		}
	}
	for (let item of player.benchCollection) {
		if (item.cardType == Card_Type.pokemon) {
			randomArray.push(item);
		}
	}

	if (randomArray.length = 0) {
		return null;
	} else {
		return randomArray[getRandom(randomArray.length - 1)];
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

	if (!user.playable()) {
		logger.logWarning("You cannot do any more actions.");
		return;
	}

	// this card is from user
	if (sourceName == "divHandCollection") { // this card is from handCollection, it can be moved to bench, mat
		let sourceCard = findFromArray(user.handCollection, id);
		if (isNaN(targetId)) {// moving to a div
			if (sourceCard.cardType == Card_Type.energy) {// moving an energy
				logger.logWarning("Energy cannot be moved here!");
			} else if (sourceCard.cardType == Card_Type.trainer) {// moving a trainer
				if (targetId == "divBenchCollection") {// moving to bench
					removeFromArray(user.handCollection, sourceCard);
					user.benchCollection.push(sourceCard);
				} else if (targetId == "divMatCollection") {// moving to mat
					logger.logBattle("Use Trainer: " + sourceCard.cardName);
					removeFromArray(user.handCollection, sourceCard);
					user.matCollection.push(sourceCard);
					sourceCard.useAbility();
					setTimeout(function () {
						removeFromArray(user.matCollection, sourceCard);
						user.discardCollection.push(sourceCard);
					}, 1000);
				} else if (targetId == "divHandCollection") {// moving in the same div, do nothing

				} else {// moving to other div
					logger.logWarning("Trainer cannot be moved here!");
				}
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
					logger.logWarning("Pokemon cannot be moved here!");
				}
			}
		} else {// moving to a card
			if (targetContainer == "divBenchCollection") {
				let targetCard = findFromArray(user.benchCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					logger.logGeneral("Move Trainer to your mat to use its ability.");
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						if (user.canApplyEnergy(targetCard)) {
							targetCard.applyEnergy = true;
							logger.logBattle("Apply Energy to Pokemon " + targetCard.cardName);
							// TODO some cards only have colorless energy
							targetCard.addEnergy(sourceCard);
							removeFromArray(user.handCollection, sourceCard);
							user.discardCollection.push(sourceCard);
						} else {
							logger.logWarning("You can only apply energy once per turn.");
							return;
						}
					} else if (sourceCard.cardType == Card_Type.trainer) {
						// do nothing
					} else {// moving a pokemon to a pokemon: evolve
						if (sourceCard.cardBasic == targetCard.cardName) {
							if (user.canUseEnvolve) {
								user.canUseEnvolve = false;
								logger.logBattle("Evolve pokemon " + targetCard.cardName + " to " + sourceCard.cardName);
								sourceCard.currentEnergy += targetCard.currentEnergy;
								sourceCard.currentColorLessEnergy += targetCard.currentColorLessEnergy;
								removeFromArray(user.benchCollection, targetCard);
								user.discardCollection.push(targetCard);
								removeFromArray(user.handCollection, sourceCard);
								user.benchCollection.push(sourceCard);
							} else {
								logger.logWarning("You can only envolve one pokemon per turn.");
								return;
							}
						} else {// do nothing

						}
					}
				}
			} else if (targetContainer == "divMatCollection") {
				let targetCard = findFromArray(user.matCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					// do nothing
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						if (user.canApplyEnergy(targetCard)) {
							targetCard.applyEnergy = true;
							logger.logBattle("Apply Energy to Pokemon " + targetCard.cardName);
							targetCard.addEnergy(sourceCard);
							removeFromArray(user.handCollection, sourceCard);
							user.discardCollection.push(sourceCard);
						} else {
							logger.logWarning("You can only apply energy once per turn.");
							return;
						}
					} else if (sourceCard.cardType == Card_Type.trainer) {
						// do nothing
					} else {// moving a pokemon to a pokemon: envole
						if (sourceCard.cardBasic == targetCard.cardName) {
							if (user.canUseEnvolve) {
								user.canUseEnvolve = false;
								logger.logBattle("Evolve pokemon " + targetCard.cardName + " to " + sourceCard.cardName);
								sourceCard.currentEnergy += targetCard.currentEnergy;
								sourceCard.currentColorLessEnergy += targetCard.currentColorLessEnergy;
								removeFromArray(user.matCollection, targetCard);
								user.discardCollection.push(targetCard);
								removeFromArray(user.handCollection, sourceCard);
								user.matCollection.push(sourceCard);
								user.currentPokemon = sourceCard;
							} else {
								logger.logWarning("You can only envolve one pokemon per turn.");
								return;
							}
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
				if (targetId == "divMatCollection") {
					logger.logBattle("Use Trainer: " + sourceCard.cardName);
					removeFromArray(user.benchCollection, sourceCard);
					user.matCollection.push(sourceCard);
					sourceCard.useAbility();
					setTimeout(function () {
						removeFromArray(user.matCollection, sourceCard);
						user.discardCollection.push(sourceCard);
					}, 1000);
				}
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
					logger.logWarning("Pokemon cannot be moved here!");
				}
			}
		} else {// moving to a card
			if (targetContainer == "divBenchCollection") {// do nothing

			} else if (targetContainer == "divMatCollection") {
				let targetCard = findFromArray(user.matCollection, targetId);
				if (targetCard.cardType == Card_Type.energy) {
					logger.logError("Unexpected logic error!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					// do nothing
				} else {// this is a pokemon
					if (sourceCard.cardType == Card_Type.energy) {
						logger.logError("Unexpected logic error!");
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logError("Unexpected logic error!");
					} else {// moving a pokemon to a pokemon: envole
						if (sourceCard.cardBasic == targetCard.cardName) {
							logger.logBattle("Evolve pokemon " + targetCard.cardName + " to " + sourceCard.cardName);
							removeFromArray(user.matCollection, targetCard);
							user.discardCollection.push(targetCard);
							removeFromArray(user.benchCollection, sourceCard);
							user.matCollection.push(sourceCard);
							user.currentPokemon = sourceCard;
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
				logger.logError("Unexpected logic error!");
			} else {// moving a pokemon
				if (targetId == "divBenchCollection") {// moving to bench, retreat
					if (sourceCard.isStuck) {
						logger.logBattle("Retreat " + sourceCard.cardName + "(Stuck) failed.");
						return;
					}
					if (sourceCard.retreat.length == 2) {// needs energy (colorless) to retreat
						if (user.canUseRetreat) {
							user.canUseRetreat = false;
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
							logger.logWarning("You can only retreat one pokemon per turn.");
							return;
						}
					} else {
						if (user.canUseRetreat) {
							user.canUseRetreat = false;
							logger.logBattle("Retreat " + sourceCard.cardName + ".");
							findAndRemoveFromArray(user.matCollection, sourceCard);
							user.benchCollection.push(sourceCard);
						} else {
							logger.logWarning("You can only retreat one pokemon per turn.");
							return;
						}
					}
				} else if (targetId == "divMatCollection") {// moving in the same div, do nothing

				} else if (targetId == "divHandCollection") {// moving back to handCollection
					logger.logWarning("Pokemon cannot be moved back to here!");
				} else if (targetId == "divMatCollectionAi") {// moving to ai mat: battle
					if(user.canUseAttact){
						user.canUseAttact = false;
						logger.logAbility(sourceCard);
					}else{
						logger.logWarning("You can only attach once per turn.");
						return;
					}
				} else {// moving to other div
					logger.logWarning("Pokemon cannot be moved here!");
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
}