let user = null;
let ai = null;
let game = null;
let logger = null;
let userOrder = null;
let aiOrder = null;

$(function () {

	initAbility();
	initCardCollection();

	startNewGame(userOrder, aiOrder);

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

function startNewGame(userOrder, aiOrder) {
	logger = new GameConsole();
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);
	game = new Game(user, ai);

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

	if (role == "user") {// this card is from user
		if (sourceName == "divHandCollection") {
			let sourceCard = findFromArray(user.handCollection, id);
			if (isNaN(targetId)) {// move to a div
				if (sourceCard.cardType == Card_Type.energy) {
					logger.logWarning("Energy cannot be moved to here!");
				} else if (sourceCard.cardType == Card_Type.trainer) {
					logger.logGeneral("TODO: Trainer!");
				} else {// this is a pokemon
					if (targetId == "divBenchCollection") {
						removeFromArray(user.handCollection, sourceCard);
						user.benchCollection.push(sourceCard);
					} else if (targetId == "divMatCollection") {
						// TODO validate
						removeFromArray(user.handCollection, sourceCard);
						user.matCollection.push(sourceCard);
					} else if (targetId == "divHandCollection") {

					} else {
						logger.logWarning("Pokemon cannot be moved to here!");
					}
				}
			} else {// move to a pokemon
				// TODO
				if (targetContainer == "divBenchCollection") {
					let targetCard = findFromArray(user.benchCollection, targetId);
					if (targetCard.cardType == Card_Type.energy) {
						logger.logError("Unexpected logic error!");
					} else if (sourceCard.cardType == Card_Type.trainer) {
						logger.logGeneral("TODO: Trainer!");
					} else {// this is a pokemon
						if (sourceCard.cardType == Card_Type.energy) {
							logger.logBattle("Apply Energy to Pokemon " + targetCard.cardName);
							if (sourceCard.cardName.toLowerCase() == targetCard.property) {
								targetCard.currentEnergy += 1;
							} else {
								targetCard.currentColorLessEnergy += 1;
							}
							removeFromArray(user.handCollection, sourceCard);
							user.discardCollection.push(sourceCard);
						} else if (sourceCard.cardType == Card_Type.trainer) {
							logger.logGeneral("TODO: Trainer!");
						} else {// this is a pokemon
							if (targetId == "divBenchCollection") {
								removeFromArray(user.handCollection, sourceCard);
								user.benchCollection.push(sourceCard);
							} else if (targetId == "divMatCollection") {
								// TODO validate
								removeFromArray(user.handCollection, sourceCard);
								user.matCollection.push(sourceCard);
							} else if (targetId == "divHandCollection") {

							} else {
								logger.logWarning("Pokemon cannot be moved to here!");
							}
						}
					}
				} else if (targetContainer == "divMatCollection") {
					let targetCard = findFromArray(user.matCollection, targetId);
				} else {
					//TODO
				}
				ev.stopPropagation();
			}
		}
	} else {// this card is from AI

	}
}
