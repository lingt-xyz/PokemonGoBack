class Ability {
	constructor(lineNumber, abilityName) {
		this.lineNumber = lineNumber;
		this.abilityName = abilityName;
		this.subAbilities = [];
	}
}

class SubAbility {
	constructor() {
		this.condition = null;
	}
}

// target:opponent:10
// target:opponent-active:40
// target:opponent-active:20*count(target:your-bench)
// target:opponent-active:count(target:your-active:damage)*10
// target:opponent-active:count(target:opponent-active:energy)*10
// target:choice:opponent:30
// target:choice:opponent-bench:30
class Dam extends SubAbility {
	constructor(target, damHp) {
		super();
		this.target = target;
		this.damHp = damHp;
	}
}

// heal:target:choice:your:30
// heal:target:choice:your:60
// heal:target:self:20
class Heal extends SubAbility {
	constructor(target, number) {
		super();
		this.target = target;
		//your-active, choice:your, self
		this.number = number;
	}
}

// discard all energy attached to this pokemon
class Deenergize extends SubAbility {
	constructor(target, str) {
		super();
		this.target = target;
		//todo: decode the str to get exact number of energy that will be remove, and other info.
		this.str = str;

	}
}

// reenergize:target:choice:your:1:target:choice:your:1
// move a basic energy from 1 of your pokemon to another of your pokemon
class Reenergize extends SubAbility {
	constructor(fromPokemon, fromAmout, toPokemon, toAmount) {
		super();
		this.source = fromPokemon;
		this.target = toPokemon;
		this.fromAmout = fromAmout;
		this.toAmount = toAmount;
	}
}

// swap:source:your-active:destination:choice:your-bench
// switch your active pokemon with 1 of your benched pokemon
class Swap extends SubAbility {
	constructor(source, destination) {
		super();
		this.source = source;
		this.destination = destination;
	}
}


// destat:target:last
class Destat extends SubAbility {
	constructor(target) {
		super();
		this.target = target;
	}
}

// applystat:status:stuck:opponent-active
// opponent-active ?
// stuck = That pokemon can't retreat during your opponent's next turn
class ApplyStat extends SubAbility {
	constructor(type, target) {
		super();
		this.type = type;
		this.target = target;
	}
}

// draw:3
// draw 3 dards
class Draw extends SubAbility {
	constructor(traget, number) {
		super();
		this.target = target;
		this.number = number;
	}
}

// redamage:source:choice:opponent:destination:opponent:count(target:last:source:damage)
// Move as many damage counters on your opponent's pokemon as you like to any of your opponent's other pokemon in any way you like
class Redamage extends SubAbility {
	constructor(targetFrom, targetTo, damHp) {
		super();
		this.targetFrom = targetFrom;
		this.targetTo = targetTo;
		//TODO : decode damHp(str) to find the exact number of dam amount
		this.damHp = damHp;
	}
}

//
class Search extends SubAbility {
	constructor() {
		super();
		//TODO
	}
}


// deck:target:your:destination:deck:count(your-hand)
// deck:target:opponent:destination:deck:count(opponent-hand)
// deck:target:opponent:destination:deck:bottom:choice:them:1
class Deck extends SubAbility {
	constructor(source, target, amount) {
		super();
		this.target = target;
		this.source = source;
		this.amount = amount;
	}
}

// shuffle:target:your
// shuffle:target:opponent
class Shuffle extends SubAbility {
	constructor(target) {
		super();
		this.target = target;
	}
}

// flip, ability, healed
class Cond extends SubAbility {
	constructor(type) {
		super();
		this.type = type;
	}
}

// add:target:your:trigger:opponent:turn-end:(heal:target:self:20)
class Add extends SubAbility {
	constructor(target, trigger, spell) {
		super();
		this.target = target;
		this.trigger = trigger;
		this.spell = spell;
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
			damCardChoose(opponent, 30);
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
			healCardChoose(you, 30);
			break;
		case 33:
			//Misty's Determination:cond:ability:deck:target:your:destination:discard:choice:you:1:(search:target:your:source:deck:filter:top:8:1,shuffle:target:your)
			if (chooseHandCardDisCard(you, 1)) {
				//choose one from top-8 card in deck,then shuffle
				chooseFromDeckAndShuffle(you, 1, 0, 9);
			}
			break;
		case 34:
			//Pokémon Center Lady:heal:target:choice:your:60,destat:target:last
			destat(healCardChoose(you, 60));
			//TODO
			break;
		case 35:
			//Clemont:search:target:your:source:deck:filter:energy:4
			searchEnergyCardFromDeck(you, 4);
			break;
		case 36:
			//Ear Influence:redamage:source:choice:opponent:destination:opponent:count(target:last:source:damage)
			red
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
			searchfromDeck(you, 1);
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
			chooseFromDeckAndShuffle(opponent, 1, 0, 1);
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
			//search[target]:[source]:[filter]:[amount]
			if (deenergizeCard(you, 1)) {
				searchItemFromDiscard(you, 1)
			}

			break;
		case 59:
			//Stretch Kick:dam:target:choice:opponent-bench:30
			damBench(opponent, 30);
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
			//simplify--->heal your active 20
			// TODO
			healCard(you, 20);
			break;
		case 68:
			//Poké Ball:cond:flip:search:target:your:source:deck:filter:pokemon:1
			if (flipCoin()) {
				searchPokemonFromDeck(you, 1);
			}
			break;
		case 69:
			//Shauna:deck:target:your:destination:deck:count(your-hand),shuffle:target:your,draw:5
			if (shuffleAllHandcard(you)) {
				drawCard(you, 5);
			}
			break;
		case 70:
			//Pokémon Fan Club:search:target:your:source:deck:filter:pokemon:cat:basic:2,shuffle:target:your
			searchfromDeck(you, 2);
			break;
		case 71:
			//Switch:swap:source:your-active:destination:choice:your-bench
			switchPokemon(you);
			break;
		case 72:
			//Energy Switch:reenergize:target:choice:your:1:target:choice:your:1
			reenergize(you, 1);
			break;
		case 73:
			//Red Card:deck:target:opponent:destination:deck:count(opponent-hand),shuffle:target:opponent,draw:opponent:4
			for (let card of opponent.handCollection) {
				opponent.deckCollection.push(card);
				let index = opponent.handCollection.indexOf(card);
				opponent.handCollection.splice(index, 1);
			}
			shuffle(opponent.deckCollection);
			drawCard(opponent, 4);
			break;
		case 74:
			//Wally:search:target:choice:your-pokemon:cat:basic:source:deck:filter:evolves-from:target:last:1,shuffle:target:your
			searchEnvolveFromDeck(you);
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
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
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
		if (player.isAi) {
			let card = user.prizeCollection.pop();
			logger.logBattle("Collect Prize Card: " + card.cardName);
			user.handCollection.push(card);
		} else {
			let card = ai.prizeCollection.pop();
			logger.logBattle("Collect Prize Card: " + card.cardName);
			ai.handCollection.push(card);
		}
		return false;
	}

	return true;
}

function damCardChoose(player, damHp) {
	let pokemon = chooseCard(player);
	if (!pokemon) {
		logger.logWarning("Invalide target.");
		return false;
	}
	let before = pokemon.currentHp;

	if (before < damHp) {
		logger.logBattle(pokemon.cardName + "'s HP reduced by " + damHp);
		pokemon.currentHp -= damHp;
		if (pokemon.currentHp <= 0) {
			logger.logBattle(pokemon.cardName + " is dead.. Move it to discard.");
			removeFromArray(player.matCollection, player.currentPokemon);
			player.discardCollection.push(player.currentPokemon);
			player.currentPokemon = null;
			if (player.isAi) {
				let card = user.prizeCollection.pop();
				logger.logBattle("Collect Prize Card: " + card.cardName);
				user.handCollection.push(card);
			} else {
				let card = ai.prizeCollection.pop();
				logger.logBattle("Collect Prize Card: " + card.cardName);
				ai.handCollection.push(card);
			}
		}
	} else {
		pokemon.damageAmount += damHp;
		pokemon.currentHp -= damHp;
		logger.logBattle(pokemon.cardName + "'s HP reduced by " + damHp);
	}
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
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	let before = player.currentPokemon.currentHp;
	player.currentPokemon.currentHp += healHp;
	if (player.currentPokemon.currentHp > player.currentPokemon.hp) {
		player.currentPokemon.currentHp = player.currentPokemon.hp;
	}
	let after = player.currentPokemon.currentHp;
	player.currentPokemon.healed = true;
	player.currentPokemon.healAmount += after - before;
	logger.logBattle(player.currentPokemon.cardName + "'s HP increased by " + (after - before));
}

function healCardChoose(player, healHp) {
	let pokemon = chooseCard(player);
	if (!pokemon) {
		logger.logWarning("Invalide target.");
		return false;
	}
	let before = pokemon.currentHp;
	pokemon.currentHp += healHp;
	if (pokemon.currentHp > pokemon.hp) {
		pokemon.currentHp = pokemon.hp;
	}
	let after = pokemon.currentHp;
	pokemon.healed = true;
	pokemon.healAmount += after - before;
	logger.logBattle(pokemon.cardName + "'s HP increased by " + (after - before));
	return pokemon;
}

function applyStatParalyzed(player) {
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	player.currentPokemon.isParalyzed = true;
	logger.logBattle(player.currentPokemon.cardName + " is paralyzed.");
}

function applyStatParalyzedFlip(player) {
	if (flipCoin()) {
		applyStatParalyzed(player);
	} else {
		logger.logBattle("So: cancel applyStatParalyzed.");
	}
}

function applyStatStuck(player) {
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	player.currentPokemon.isStuck = true;
}

function applyStatPoisoned(player) {
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	player.currentPokemon.isPoisoned = true;
}

function applyStatAsleep(player) {
	if (!player.currentPokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	player.currentPokemon.isAsleep = true;
}

function deenergizeCard(player, amount) {
	let pokemon = player.currentPokemon;
	if (!pokemon) {
		logger.logWarning("No avaliable target.");
		return false;
	}
	if (amount >= (pokemon.currentEnergy + pokemon.currentColorLessEnergy)) {
		pokemon.currentEnergy = 0;
		pokemon.currentColorLessEnergy = 0;
		logger.logBattle(pokemon.cardName + "'s energy decreased by " + (pokemon.currentEnergy + pokemon.currentColorLessEnergy));
	} else {
		if (amount <= pokemon.currentEnergy) {
			pokemon.currentEnergy -= amount;
		} else {
			pokemon.currentColorLessEnergy = (pokemon.currentEnergy + pokemon.currentColorLessEnergy - amount);
			pokemon.currentEnergy = 0;
		}
		logger.logBattle(pokemon.cardName + "'s energy decreased by " + amount);
	}
}

function deenergizeCardFlip(player, amount) {
	if (flipCoin()) {
		deenergizeCard(player, amount);
	} else {
		logger.logBattle("So: cancel deenergizeCard.");
	}
}

function drawCard(player, amount) {
	let counter = 0;
	while (amount != 0) {
		let card = player.deckCollection.pop();
		amount--;
		if (card) {
			counter++;
			player.handCollection.push(card);
		}
	}
	logger.logBattle("Draw " + counter + " cards.");
}

function chooseHandCardDisCard(player, amount) {
	let result = confirm("Would you want to switch a card from your deck?");
	if (result) {
		if (amount <= player.handCollection.length) {
			while (amount != 0) {
				let choosedCard = chooseHandCard(player);
				amount--;
				if (choosedCard) {
					removeFromArray(player.handCollection, choosedCard);
					player.discardCollection.push(choosedCard);
				}
			}
			return true;
		} else {
			logger.logWarning("Do not have enought cards to discard");
			return false;
		}
	} else {
		logger.logBattle("So: cancel switch.");
		return false;
	}


}

function chooseFromDeckAndShuffle(player, amount, startindex, endindex) {
	if (amount <= player.deckCollection.length) {
		while (amount != 0) {
			let choosedCard = chooseOneDeckCardinArrangeOf(player, startindex, endindex)
			if (choosedCard) {
				player.handCollection.push(chooseCard);
				removeFromArray(player.deckCollection, choosedCard);
			}
			amount--;
		}
		shuffle(player.deckCollection);
		return ture;

	} else {
		logger.logWarning("Do not have enought cards ind Deck");
		return false;
	}
}

function searchEnergyCardFromDeck(player, amount) {
	for (let item of player.deckCollection) {
		if (item.cardType == Card_Type.energy) {
			player.handCollection.push(item);
			removeFromArray(player.deckCollection, item);
			amount--;
		}
		if (amount == 0) {
			break;
		}
	}
	shuffle(player.deckCollection);
}

function searchfromDeck(player, amount) {
	logger.logBattle("Shuffle deck, then pick up one card from the deck.");
	shuffle(player.deckCollection);//shuffle first to make the card will be picked randomly from you deck
	while (amount != 0) {
		let card = player.deckCollection.pop();
		amount--;
		if (card) {
			player.handCollection.push(card);
		}
	}
	shuffle(player.deckCollection);
}

function searchItemFromDiscard(player, amount) {
	for (let item of player.discardCollection) {
		if (item.cardType == Card_Type.trainer) {
			if (item.trainerType == Trainer_Type.item) {
				player.handCollection.push(item);
			}
			removeFromArray(player.discardCollection, item);
			amount--;
		}
		if (amount == 0) {
			break;
		}
	}
}

function searchPokemonFromDeck(player, amount) {
	for (let item of player.deckCollection) {
		if (item.cardType == Card_Type.pokemon) {
			player.handCollection.push(item);
			removeFromArray(player.deckCollection, item);
			amount--;
		}
		if (amount == 0) {
			break;
		}
	}
	shuffle(player.deckCollection);
}

function shuffleAllHandcard(player) {
	for (let item of player.handCollection) {
		player.deckCollection.push(item);
	}
	player.handCollection = [];
	shuffle(player.deckCollection);
}

function searchEnvolveFromDeck(player) {
	let pokemonWaitEnvolve = player.currentPokemon;
	if (pokemonWaitEnvolve != null) {
		for (let card of player.deckCollection) {
			if (card.cardType == Card_Type.pokemon) {
				if (card.cardBasic == pokemonWaitEnvolve.cardName) {
					logger.logBattle(pokemonWaitEnvolve.cardName + " envolve to " + card.cardName + ".");
					removeFromArray(player.matCollection, pokemonWaitEnvolve);
					removeFromArray(player.deckCollection, card);
					player.matCollection.push(card);
					player.currentPokemon = card;
					shuffle(player.deckCollection);
					return;
				}
			}
		}
		logger.logWarning("No stageOne pokemon of active pokemon in deck.");
	} else {
		logger.logWarning("No active pokemon can be envolved.");
		return false;
	}
}

function redamage(player, amount) {
	let source = chooseCard(player);
	let target = chooseCard(player);

	if (!source) {
		logger.logWarning("Invalide source pokemon.");
		return false;
	}

	if (!target) {
		logger.logWarning("Invalide target pokemon.");
		return false;
	}

	if (source.damageAmount <= amount) {
		amount = source.damageAmount;
		source.damageAmount = 0;
	} else {
		source.damageAmount -= amount;
	}

	if (source.currentHp + amount > source.hp) {
		source.currentHp = source.hp;
	} else {
		source.currentHp += amount;
	}

	logger.logBattle("Move " + amount + " damage from " + source.cardName + " to " + target.cardName + ".");
	if (target.currentHp - amount <= 0) {
		target.currentHp = 0;

		if (player.currentPokemon == target) {
			player.currentPokemon = null;
			removeFromArray(player.matCollection, target);
			player.discardCollection.push(target);
		} else {
			for (let card of player.benchCollection) {
				if (card.cardType == Card_Type.pokemon && card == target) {
					removeFromArray(player.deckCollection, target);
					player.discardCollection.push(target);
				}
			}
		}
	} else {
		target.currentHp -= amount;
	}
}

function destat(card) {
	logger.logBattle("Clear " + card.cardName + " abnormal status.");
	card.isAsleep = false;
	card.isParalyzed = false;
	card.isPoisoned = false;
	card.isStuck = false;
}

function reenergize(player, amount) {
	logger.logBattle("Please choose the source pokemon and target pokemon respectively.");
	let source = chooseCard(player);
	if (!source) {
		logger.logWarning("Invalide source pokemon.");
		return false;
	}

	let target = chooseCard(player);
	if (!target) {
		logger.logWarning("Invalide target pokemon.");
		return false;
	}

	if ((source.currentEnergy + source.currentColorLessEnergy) < amount) {
		source.currentEnergy = 0;
		source.currentColorLessEnergy = 0;
		target.currentColorLessEnergy += (source.currentEnergy + source.currentColorLessEnergy);
		logger.logBattle("Move " + (source.currentEnergy + source.currentColorLessEnergy) + " engrgy from " + source.cardName + " to " + target.cardName);
	} else if (source.currentColorLessEnergy < amount) {
		source.currentEnergy = (source.currentEnergy + source.currentColorLessEnergy - amount);
		target.currentColorLessEnergy += amount;
		logger.logBattle("Move " + amount + " engrgy from " + source.cardName + " to " + target.cardName);
	} else {
		source.currentColorLessEnergy -= amount;
		target.currentColorLessEnergy += source.currentColorLessEnergy;
		logger.logBattle("Move " + amount + " engrgy from " + source.cardName + " to " + target.cardName);
	}
}

function switchPokemon(player) {
	let card = chooseBenchCard(player);
	if (!card) {
		logger.logWarning("Invalide source pokemon.");
		return false;
	}
	removeFromArray(player.matCollection, player.currentPokemon);
	removeFromArray(player.benchCollection, card);
	player.benchCollection.push(player.currentPokemon);
	player.matCollection.push(card);
	player.currentPokemon = card;
}