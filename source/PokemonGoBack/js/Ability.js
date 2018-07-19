class Ability {
    constructor(lineNumber, abilityName) {
        this.lineNumber = lineNumber;
        this.abilityName = abilityName;
        this.abilities = [];
    }
}

// dam:target:opponent:10
class Dam {
    constructor(target, damHp) {
        this.condition = null;
        this.target = target;
        this.damHp = damHp;
        // 10
        // 20*count(target:your-bench)
        // count(target:your-active:damage)*10
        // count(target:opponent-active:energy)*10
    }
}

// heal:target:choice:your:30
// heal:target:choice:your:60
// heal:target:self:20
class Heal {
    constructor(target, number) {
        this.target = target;
        //your-active, choice:your, self
        this.number = number;
    }
}

// discard all energy attached to this pokemon
class Deenergize {
    constructor() {

    }
}

// reenergize:target:choice:your:1:target:choice:your:1
// move a basic energy from 1 of your pokemon to another of your pokemon
class Reenergize {
    constructor(id, fromPokemon, fromAmout, toPokemon, toAmount) {
        this.source = fromPokemon;
        this.target = toPokemon;
        this.fromAmout = fromAmout;
        this.toAmount = toAmount;
    }
}

// swap:source:your-active:destination:choice:your-bench
// switch your active pokemon with 1 of your benched pokemon
class Swap {
    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }
}


// destat:target:last
class Destat {
    constructor() {
        // TODO
    }
}

// applystat:status:stuck:opponent-active
// opponent-active ?
// stuck = That pokemon can't retreat during your opponent's next turn
class ApplyStat {
    constructor(type, target) {
        this.type = type;
        this.target = target;
    }
}

// draw:3
// draw 3 dards
class Draw {
    constructor(number) {
        this.number = number;
    }
}

// redamage:source:choice:opponent:destination:opponent:count(target:last:source:damage)
// Move as many damage counters on your opponent's pokemon as you like to any of your opponent's other pokemon in any way you like
class Redamage {
    constructor() {
        //TODO
    }
}

//
class Search {
    constructor() {
        //TODO
    }
}


// deck:target:your:destination:deck:count(your-hand)
// deck:target:opponent:destination:deck:count(opponent-hand)
// deck:target:opponent:destination:deck:bottom:choice:them:1
class Deck {
    constructor() {
        //TODO
    }
}

// shuffle:target:your
// shuffle:target:opponent
class Shuffle {
    constructor(target) {
        this.target = target;
    }
}

// flip, ability, healed
class Cond {
    constructor(type) {
        this.type = type;
    }
}

// add:target:your:trigger:opponent:turn-end:(heal:target:self:20)
class Add {
    constructor() {
        //TODO
    }
}