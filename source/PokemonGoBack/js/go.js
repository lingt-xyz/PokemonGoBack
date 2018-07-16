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
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);
	game = new Game(user, ai);
	logger = new GameConsole();
	game.start();
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
	let targetName = ev.target.id;

	if(role == "user"){// this card is from user
		if(Number.isInteger(targetName)){// move to a pokemon
			// TODO
		}else if(sourceName == "divHandCollection"){
			let card = findFromArray(user.handCollection, id);
			if(targetName == "divBenchCollection"){
				if(card.cardType == Card_Type.pokemon){
					removeFromArray(user.handCollection, card);
					user.benchCollection.push(card);
				}else if(card.cardType == Card_Type.energy){
					logger.logGeneral("Energy cannot be moved to bench!");
				}else{
					logger.logGeneral("TODO: Trainer!");
				}
			}else if(targetName == "divMatCollection"){
				let card = findAndRemoveFromArray(user.handCollection, id);
				user.matCollection.push(card);
			}
		}
		
	}else{// this card is from AI

	}
}