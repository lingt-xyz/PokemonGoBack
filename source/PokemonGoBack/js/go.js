let user = null;
let ai = null;
let game = null;
let currentPlayer = null;
let logger = null;
let userOrder = null;
let aiOrder = null;

$(function () {

	initAbility();
	initCardCollection();

	startNewGame();

	new Vue({
		el: '#divAi',
		data: {
			player: ai
		}
	})

	new Vue({
		el: '#divUser',
		data: {
			player: user
		}
	})

});

function startNewGame() {
	logger = new GameConsole();
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);
	game = new Game();

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

//TODO
/**
 * Popup a div, showing the abilities the card has 
 * @param {pokemon card} pokemon 
 * @returns the chosed ability id, or "" if no ability is chosed.
 */
function chooseAbility(pokemon){

}

function loadDefaultImg(id) {
	$("#" + id + "").attr("src", "image/Default.png");
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

	if(game.currentPlayer == ai){
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
						user.logWarning("A pokemon is already battling!");
					} else {
						removeFromArray(user.handCollection, sourceCard);
						user.matCollection.push(sourceCard);
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
						user.logWarning("A pokemon is already battling!");
					} else {
						removeFromArray(user.benchCollection, sourceCard);
						user.matCollection.push(sourceCard);
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
				} else {// moving to other div
					logger.logWarning("Pokemon cannot be moved to here!");
				}
			}
		} else {// moving to a card
			// TODO hardest part to be implemented
			if (targetContainer == "divMatCollectionAi") {
				let targetCard = findFromArray(user.benchCollection, targetId);
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
						let abilityIndex = chooseAbility(sourceCard);
						// 2. choose an ability
						// 3. apply ability
					}
				}
			} else {// moving to other div, do nothing

			}
		}
	} else {
		logger.logError("This card is not movable!");
	}

	ev.stopPropagation();
}
