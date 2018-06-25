class Ability {
    constructor(id, abilityName) {
        this.id = id;
        this.abilityName = abilityName;
    }
}

class Dam extends Ability {
    constructor(id, target, damHp) {
        super(id, Ability_Type.dam);
        this.target = target;
        this.damHp = damHp;
    }
}

class Heal extends Ability {
    constructor(id, number) {
        super(id, Ability_Type.heal);
        this.number = number;
    }
}

class Deenergize extends Ability {
    constructor() {
        super(id, Ability_Type.deenergize);
        //TODO
    }
}

class Reenergize extends Ability {
    constructor(id, from, to, amount) {
        super(id, Ability_Type.reenergize);
        this.source = from;
        this.target = to;
        this.amount = amount;
    }
}

class Swap extends Ability {
    constructor(id, source, destination) {
        super(id, Ability_Type.swap);
        this.source = source;
        this.destination = destination;
    }
}

class Destat extends Ability {
    constructor(id, target) {
        super(id, Ability_Type.destat);
        this.target = target;
    }
}

class ApplyStat extends Ability {
    constructor(id, type, target) {
        super(id, Ability_Type.applystat);
        this.type = type;
        this.target = target;
    }
}

class Draw extends Ability {
    constructor(id, number) {
        super(id, Ability_Type.draw);
        this.number = number;
    }
}

class Redamage extends Ability {
    constructor(id) {
        super(id, Ability_Type.redamage);
        //TODO
    }
}

class Search extends Ability {
    constructor(id) {
        super(id, Ability_Type.search);
        //TODO
    }
}

class Deck extends Ability {
    constructor(id) {
        super(id, Ability_Type.deck);
        //TODO
    }
}

class Shuffle extends Ability {
    constructor(id, target) {
        super(id, Ability_Type.shuffle);
        this.target = target;
    }
}

class Cond extends Ability {
    constructor(id) {
        super(id, Ability_Type.cond);
        //TODO
    }
}

class Add extends Ability {
    constructor(id) {
        super(id, Ability_Type.add);
        //TODO
    }
}