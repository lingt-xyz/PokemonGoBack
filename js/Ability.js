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
			DamCardChoose(opponent, 30);
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
			if(chooseHandCardDisCard(player,1)){
				//choose one from top-8 card in deck,then shuffle
				chooseFromDeckAndShuffle(player,1,0,9);
			}
			break;
		case 34:
			//Pokémon Center Lady:heal:target:choice:your:60,destat:target:last
			healCardChoose(you, 60);
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
	if (!player.currentPokemon) {
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
function DamCardChoose(player, damHp) {
	let pokemon = chooseCard(player);
	let before = pokemon.currentHp;

	if (before < damHp) {
		logger.logBattle(pokemon.cardName + "'s HP reduced by " + damHp);
		pokemon.currentHp -= damHp;
		if (pokemon.currentHp <= 0) {
			logger.logBattle(pokemon.cardName + " is dead.. Move it to discard.");
			//removeFromArray(player.matCollection, player.currentPokemon);
			//player.discardCollection.push(player.currentPokemon);
			//player.currentPokemon = null;
			//TODO move to discard
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

function healCardChoose(player, healHp) {
	let pokemon = chooseCard(player);
	let before = pokemon.currentHp;
	pokemon.currentHp += healHp;
	if (pokemonn.currentHp > pokemon.hp) {
		pokemon.currentHp = pokemon.hp;
	}
	let after = pokemon.currentHp;
	pokemon.healed = true;
	pokemon.healAmount += after - before;
	logger.logBattle(pokemon.cardName + "'s HP increased by " + healHp);
}

function applyStatParalyzed(player) {
	player.currentPokemon.isParalyzed = true;
}

function applyStatParalyzedFlip(player) {
	if (flipCoin()) {
		applyStatParalyzed(player);
	} else {
		logger.logBattle("So: cancel applyStatParalyzed.");
	}
}

function applyStatStuck(player) {
	player.currentPokemon.isStuck = true;
}

function applyStatPoisoned(player) {
	player.currentPokemon.isPoisoned = true;
}

function applyStatAsleep(player) {
	player.currentPokemon.isAsleep = true;
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

function chooseHandCardDisCard(player, amount) {
	if (amount <= player.handCollection.length) {
		while (amount != 0) {
			let choosedCard = chooseHandCard(player);
			let index = player.handCollection.indexOf(choosedCard);
			let card = player.handCollection.slice(index,index+1);
			amount--;
			if (card) {
				player.discardCollection.push(card);
			}
		}
		return true;
	 }else{
		 logger.logWarning("Do not have enought cards to discard");
		 return false;
	 }
	
}
function chooseFromDeckAndShuffle(player,amount,startindex,endindex){
	if(amount <= player.deckCollection.length)
	{
		while(amount !=0){
			let choosedCard = chooseOneDeckCardinArrangeOf(player,startindex,endindex)
			if(choosedCard){
				player.handCollection.push(chooseCard);
				removeFromArray(player.deckCollection,choosedCard);
			}
			amount--;
		}
		shuffle(player.deckCollection);
		return ture;

	}else{
		return false;
	}
}
function searchCardFrom(player,filter,amount)
{


};