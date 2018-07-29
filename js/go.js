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
	user = new Player(userOrder, false);
	ai = new Player(aiOrder, true);

	startGame();
}

function startEnvolveGame() {
	logger = new GameConsole();
	user = new Player(Deck_Envolve, false);
	ai = new Player(null, true);

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
	let opponent = null;
	let you = null;
	if (sourceCard.isAi) {
		you = ai;
		opponent = user;
	} else {
		you = user;
		opponent = ai;
	}
	let ability = Ability_Collection[abilityIndex];
	switch (abilityIndex) {
		case 1:
			//Act Cute:deck:target:opponent:destination:deck:bottom:choice:them:1
			deckRandomCard(opponent);
			break;
		case 2:
			//Scratch:dam:target:opponent-active:20
			damCard(opponent, 20);
			break;
		case 3:
			//Quick Attack:dam:target:opponent-active:10,cond:flip:dam:target:opponent-active:30
			if (damCard(opponent, 10)) {
				damCardFlip(opponent, 30);
			}
			break;
		case 4:
			//Flying Elekick:dam:target:opponent-active:50
			damCard(opponent, 50);
			break;
		case 5:
			//Nuzzle:cond:flip:applystat:status:paralyzed:opponent-active
			applyStatParalyzed(opponent);
			break;
		case 6:
			//Quick Attack:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:10
			if (damCard(opponent, 20)) {
				damCardFlip(opponent, 10);
			}
			break;
		case 7:
			//Circle Circuit:dam:target:opponent-active:20*count(target:your-bench)
			damCard(opponent, 20 * opponent.benchCollection.length);
			break;
		case 8:
			//Thunderbolt:dam:target:opponent-active:100,deenergize:target:your-active:count(target:your-active:energy)
			if (damCard(opponent, 100)) {
				deenergizeCard(you, (you.currentPokemon.currentEnergy + you.currentPokemon.currentColorLessEnergy));
			}
			break;
		case 9:
			//Rain Splash:dam:target:opponent-active:20
			damCard(opponent, 20);
			break;
		case 10:
			//Soaking Horn:dam:target:opponent-active:10,cond:healed:target:your-active:dam:target:opponent-active:80
			if (damCard(opponent, 10)) {
				if (you.currentPokemon.headled) {
					damCard(opponent, 80);
				}
			}
			break;
		case 11:
			//Reckless Charge:dam:target:opponent-active:40,dam:target:your-active:10
			damCard(opponent, 40);
			damCard(you, 10);
			break;
		case 12:
			//Reckless Charge:dam:target:opponent-active:20,dam:target:your-active:10
			damCard(opponent, 20);
			damCard(you, 10);
			break;
		case 13:
			//Cut:dam:target:opponent-active:30
			damCard(opponent, 30);
			break;
		case 14:
			//Pound:dam:target:opponent-active:10
			damCard(opponent, 10);
			break;
		case 15:
			//Clamp Crush:dam:target:opponent-active:30,cond:flip:deenergize:target:opponent-active:1,applystat:status:paralyzed:opponent-active
			if (damCard(opponent, 30)) {
				deenergizeCardFlip(opponent, 1);
				applyStatParalyzed(opponent);
			}
			break;
		case 16:
			//Spike Cannon:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30
			if (damCard(opponent, 30)) {
				let res = getRandom(5);
				damCard(opponent, 30 * res);
			}
			break;
		case 17:
			//Spiral Drain:dam:target:opponent-active:20,heal:target:your-active:20
			damCard(opponent, 20);
			healCard(you, 20);
			break;
		case 18:
			//Aurora Beam:dam:target:opponent-active:80
			damCard(opponent, 80);
			break;
		case 19:
			//Wing Attack:dam:target:opponent-active:20
			damCard(opponent, 20);
			break;
		case 20:
			//Brave Bird:dam:target:opponent-active:80,dam:target:your-active:20
			damCard(opponent, 80);
			damCard(you, 20);
			break;
		case 21:
			//Lunge:cond:flip:dam:target:opponent-active:20
			damCardFlip(opponent, 20);
			break;
		case 22:
			//Slash:dam:target:opponent-active:30
			damCard(opponent, 30);
			break;
		case 23:
			//Nyan Press:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40:else:applystat:status:paralyzed:opponent-active
			if (damCard(opponent, 40)) {
				if (flipCoin()) {
					damCard(opponent, 40);
				} else {
					applyStatParalyzed(opponent);
				}
			}
			break;
		case 24:
			//Random Spark:dam:target:choice:opponent:30
			// TODO
			break;
		case 25:
			//Bite:dam:target:opponent-active:40
			damCard(opponent, 40);
			break;
		case 26:
			//Bite:dam:target:opponent-active:10
			damCard(opponent, 40);
			break;
		case 27:
			//Knuckle Punch:dam:target:opponent-active:30
			damCard(opponent, 30);
			break;
		case 28:
			//Electroslug:dam:target:opponent-active:90
			damCard(opponent, 90);
			break;
		case 29:
			//Knuckle Punch:dam:target:opponent-active:20
			damCard(opponent, 20);
			break;
		case 30:
			//Destructive Beam:cond:flip:deenergize:target:opponent-active:1
			deenergizeCardFlip(opponent, 1);
			break;
		case 31:
			//Tierno:draw:3
			drawCard(you, 3);
			break;
		case 32:
			//Potion:heal:target:choice:your:30
			// TODO
			break;
		case 33:
			//Misty's Determination:cond:ability:deck:target:your:destination:discard:choice:you:1:(search:target:your:source:deck:filter:top:8:1,shuffle:target:your)
			// TODO
			break;
		case 34:
			//Pokémon Center Lady:heal:target:choice:your:60,destat:target:last
			//TODO
			break;
		case 35:
			//Clemont:search:target:your:source:deck:filter:energy:4
			//TODO
			break;
		case 36:
			//Ear Influence:redamage:source:choice:opponent:destination:opponent:count(target:last:source:damage)
			//TODO
			break;
		case 37:
			//Psychic:dam:target:opponent-active:60,dam:target:opponent-active:count(target:opponent-active:energy)*10
			if (damCard(opponent, 60)) {
				damCard(opponent, (opponent.currentPokemon.currentEnergy + opponent.currentPokemon.currentColorLessEnergy) * 10);
			}
			break;
		case 38:
			//Hug:dam:target:opponent-active:30,applystat:status:stuck:opponent-active
			if (damCard(opponent, 30)) {
				applyStatStuck(opponent);
			}
			break;
		case 39:
			//Wish:search:target:your:source:deck:1
			// TODO
			break;
		case 40:
			//Heart Sign:dam:target:opponent-active:50
			damCard(opponent, 50);
			break;
		case 41:
			//Act Tough:dam:target:opponent-active:10,cond:count(target:your-active:energy:psychic)>0:dam:target:opponent-active:20
			if (damCard(opponent, 10)) {
				if (you.currentPokemon.property == "psychic" && you.currentPokemon.currentEnergy > 0) {
					damCard(opponent, 20);
				}
			}
			break;
		case 42:
			//Exhausted Tackle:cond:flip:dam:target:opponent-active:30:else:dam:target:your-active:30
			if (flipCoin()) {
				damCard(opponent, 30);
			} else {
				damCard(you, 30);
			}
			break;
		case 43:
			//Knuckle Punch:dam:target:opponent-active:10
			damCard(opponent, 10);
			break;
		case 44:
			//Double Stab:cond:flip:dam:target:opponent-active:10,cond:flip:dam:target:opponent-active:10
			if (damCardFlip(opponent, 10)) {
				damCardFlip(opponent, 10);
			}
			break;
		case 45:
			//Doduo Delivery:draw:2
			drawCard(you, 2);
			break;
		case 46:
			//Fury Attack:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40
			if (damCard(opponent, 40)) {
				let res = getRandom(3);
				damCard(opponent, 40 * res);
			}
			break;
		case 47:
			//Rollout:dam:target:opponent-active:10
			damCard(opponent, 10);
			break;
		case 48:
			//Flail:dam:target:opponent-active:count(target:your-active:damage)*10
			damCard(opponent, you.currentPokemon.damageAmount * 10);
			break;
		case 49:
			//Skill Dive:dam:target:opponent:10
			damCard(opponent, 10);
			break;
		case 50:
			//Poison Ring:applystat:status:stuck:opponent-active,applystat:status:poisoned:opponent-active
			applyStatStuck(opponent);
			applyStatPoisoned(opponent);
			break;
		case 51:
			//Sleep Poison:cond:flip:(applystat:status:asleep:opponent-active,applystat:status:poisoned:opponent-active)
			if (flipCoin()) {
				applyStatStuck(opponent);
				applyStatPoisoned(opponent);
			} else {
				logger.logBattle("So: cancel applystat.");
			}
			break;
		case 52:
			//Mine:search:target:opponent:source:deck:filter:top:1:0,cond:choice:shuffle:target:opponent
			//TODO
			break;
		case 53:
			//Mud Slap:dam:target:opponent-active:20
			damCard(opponent, 20);
			break;
		case 54:
			//Earthquake:dam:target:opponent-active:60,dam:target:your-bench:10
			damCard(opponent, 60);
			damBench(you, 60);
			break;
		case 55:
			//Rock Tumble:dam:target:opponent-active:60
			damCard(opponent, 60);
			break;
		case 56:
			//Scratch:dam:target:opponent-active:10
			damCard(opponent, 10);
			break;
		case 57:
			//Spacing Out:cond:flip:heal:target:your-active:10
			healCard(you, 10);
			break;
		case 58:
			//Scavenge:cond:ability:deenergize:target:your-active:1:(search:target:your:source:discard:filter:cat:item:1)
			// TODO
			break;
		case 59:
			//Stretch Kick:dam:target:choice:opponent-bench:30
			// TODO
			break;
		case 60:
			//Spiral Kick:dam:target:opponent-active:30
			damCard(opponent, 30);
			break;
		case 61:
			//Bullet Punch:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:20
			if (damCard(opponent, 20)) {
				let res = getRandom(2);
				damCard(opponent, 20 * res)
			}
			break;
		case 62:
			//Mach Cross:dam:target:opponent-active:60
			damCard(opponent, 60);
			break;
		case 63:
			//Beatdown:dam:target:opponent-active:40
			damCard(opponent, 40);
			break;
		case 64:
			//Twinkle:applystat:status:asleep:opponent-active
			applyStatAsleep(opponent);
			break;
		case 65:
			//Fake Out:dam:target:opponent-active:30,cond:flip:applystat:status:paralyzed:opponent-active
			if (damCard(opponent, 30)) {
				applyStatParalyzedFlip(opponent);
			}
			break;
		case 66:
			//Ambush:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:30
			if (damCard(opponent, 40)) {
				damCardFlip(opponent, 30);
			}
			break;
		case 67:
			//Floral Crown:add:target:your:trigger:opponent:turn-end:(heal:target:self:20)
			// TODO
			break;
		case 68:
			//Poké Ball:cond:flip:search:target:your:source:deck:filter:pokemon:1
			// TODO
			break;
		case 69:
			//Shauna:deck:target:your:destination:deck:count(your-hand),shuffle:target:your,draw:5
			// TODO
			break;
		case 70:
			//Pokémon Fan Club:search:target:your:source:deck:filter:pokemon:cat:basic:2,shuffle:target:your
			// TODO
			break;
		case 71:
			//Switch:swap:source:your-active:destination:choice:your-bench
			// TODO
			break;
		case 72:
			//Energy Switch:reenergize:target:choice:your:1:target:choice:your:1
			// TODO
			break;
		case 73:
			//Red Card:deck:target:opponent:destination:deck:count(opponent-hand),shuffle:target:opponent,draw:opponent:4
			// TODO
			break;
		case 74:
			//Wally:search:target:choice:your-pokemon:cat:basic:source:deck:filter:evolves-from:target:last:1,shuffle:target:your
			// TODO
			break;
		default:
			break;
	}
}

function deckRandomCard(player) {
	let arrayFrom = player.handCollection;
	let arrayTo = player.deckCollection;

	let index = getRandom(arrayFrom.length);
	let card = arrayFrom[index];
	logger.logBattle("Move one random card " + card.cardName + "to deck.");
	removeFromArrayByIndex(arrayFrom, index);
	arrayTo.push(card);
}

function damCard(player, damHp) {
	if(!player.currentPokemon){
		logger.logBattle("No avaliable target.");
		return false;
	}
	
	if (player.currentPokemon.currentHp < damHp) {
		player.currentPokemon.damageAmount += player.currentPokemon.currentHp;
		logger.logBattle(player.currentPokemon.cardName + "'s HP reduced by " + player.currentPokemon.currentHp);
		player.currentPokemon.currentHp = 0;
	} else {
		player.currentPokemon.damageAmount += damHp;
		player.currentPokemon.currentHp -= damHp;
		logger.logBattle(player.currentPokemon.cardName + "'s HP reduced by " + damHp);
	}

	if (player.currentPokemon.currentHp <= 0) {
		logger.logBattle(player.currentPokemon.cardName + " is dead.. Move it to discard.");
		removeFromArray(player.matCollection, player.currentPokemon);
		player.discardCollection.push(player.currentPokemon);
		player.currentPokemon = null;
		return false;
	}

	return true;
}

function damBench(player, damHp) {
	for (let card of player.benchCollection) {
		if (card.cardType == Card_Type.pokemon) {
			if (card.currentHp < damHp) {
				card.damageAmount += card.currentHp;
				looger.logBattle(card.cardName + "'s HP reduced by " + card.currentHp);
				card.currentHp = 0;
			} else {
				card.damageAmount += damHp;
				card.currentHp -= damHp;
				looger.logBattle(card.cardName + "'s HP reduced by " + damHp);
			}

			if (card.currentHp <= 0) {
				looger.logBattle(card.cardName + " is dead.. Move it to discard.");
				removeFromArray(player.benchCollection, card);
				player.discardCollection.push(card);
			}
		}
	}

}

function damCardFlip(player, damHp) {
	if (flipCoin()) {
		return damCard(player, damHp);
	} else {
		logger.logBattle("So: cancel damCard.");
		return true;
	}
}

function healCard(player, healHp) {
	let before = player.currentPokemon.currentHp;
	player.currentPokemon.currentHp += healHp;
	if (player.currentPokemon.currentHp > player.currentPokemon.hp) {
		player.currentPokemon.currentHp = player.currentPokemon.hp;
	}
	let after = player.currentPokemon.currentHp;
	player.currentPokemon.healed = true;
	player.currentPokemon.healAmount += after - before;
	logger.logBattle(player.currentPokemon.cardName + "'s HP increased by " + healHp);
}

function applyStatParalyzed(player) {
	//TODO
}

function applyStatParalyzedFlip(player) {
	if (flipCoin()) {
		applyStatParalyzed(player);
	} else {
		logger.logBattle("So: cancel applyStatParalyzed.");
	}
}

function applyStatStuck(player) {
	//TODO
}

function applyStatPoisoned(player) {
	// TODO
}

function applyStatAsleep(player) {
	//TODO
}

function deenergizeCard(player, amount) {
	//TODO
}

function deenergizeCardFlip(player, amount) {
	if (flipCoin()) {
		deenergizeCard(player, amount);
	} else {
		logger.logBattle("So: cancel deenergizeCard.");
	}
}

function drawCard(player, amount) {
	while (amount != 0) {
		let card = player.deckCollection.pop();
		amount--;
		if (card) {
			player.handCollection.push(card);
		}
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
							logger.logBattle("Evolve pokemon " + targetCard.cardName + " to " + sourceCard.cardName);
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
							logger.logBattle("Evolve pokemon " + targetCard.cardName + " to " + sourceCard.cardName);
							removeFromArray(user.matCollection, targetCard);
							user.discardCollection.push(targetCard);
							removeFromArray(user.handCollection, sourceCard);
							user.matCollection.push(sourceCard);
							user.currentPokemon = sourceCard;
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