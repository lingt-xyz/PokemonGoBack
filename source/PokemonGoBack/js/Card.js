class Card {
    constructor(id, cardName, cardType) {
        this.id = id;
        this.deckId = 0;
        this.cardName = cardName;
        this.cardType = cardType;
    }

    // Generate a string that can match it's picture's name
    getImageName() {
        // TODO convert French letters to English letters, remove blanks between letters
        // e.g.: a b c =>abcCard.png
    }
	

    toHtml() {
        return "<div id='" + this.id + "' data-deckId='"+ this.deckId+ "' class='pokemonallcard ui-widget-header'>" + this.cardName + "<img height='90px' width='60px' src='image/" + this.cardName + ".png'></div>";
    }
	

    toHtmlAi() {
        return "<div id='" + this.id + "' class='pokemonCardAiHand ui-widget-header'>Card?<img height='90px' width='60px' src='image/DeckCard.png'></div>";
    }

    toString() {
        return "Name:" + this.cardName + ", type:" + this.cardType;
    }
}

class Pokemon extends Card {
    constructor(id, cardName, cardStage, cardBasic, property, hp, retreat, attacks) {
        super(id, cardName, Card_Type.pokemon);
        this.cardStage = cardStage;
        this.cardBasic = cardBasic;
        this.property = property;
        this.hp = hp;
        //[retreatEnergyPoint, retreatEnergyType]
        this.retreat = retreat;
        //[energyType1, energyType1Point, energyType2, energyType2Point, ability]
        this.attacks = attacks;
        this.currentHp = hp;
        this.currentEnergy = 0;
    }

    attack(target, abilityIndex) {
        let ability = Ability_Collection[abilityIndex];
        if (ability instanceof Dam) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Heal) {
            target.hp += ability.number;
        } else if (ability instanceof Deenergize) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Reenergize) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Swap) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Destat) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof ApplyStat) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Draw) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Redamage) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Search) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Deck) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Shuffle) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Cond) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        } else if (ability instanceof Add) {
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    target.hp -= ability.damHp;
                    break;
                case Target_Pokemon.your_active:
                    this.hp -= ability.damHp;
                    break;
                case Target_Pokemon.choice_opponet:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_your_banch:
                    // TODO choose one card
                    break;
                default:
                    break;
            }
        }
    }
    /*
    toHtml() {
        return "<div id='" + this.id + "' class='pokemonallcard ui-widget-header'>" + this.cardName + "<br>Energy:" + this.currentEnergy + "<br>Hp:" + this.currentHp + "/" + this.hp + "<img height='90px' width='60px' src='image/" + this.cardName + ".png'></div>";
    }
    */
    toString() {
        let s = "";
        this.attacks.forEach(element => {
            if(element.length == 3){
                s += ("AttackType:" + element[0] + ", AttackEnergy:" + element[1] + ", Ability:" + Ability_Collection[element[2]].abilityName + ",");
            }else if(element.length == 5){
                s += ("AttackType1:" + element[0] + ", AttackEnergy1:" + element[1] + ", AttackType2:" + element[2] + ", AttackEnergy2:" + element[2] + ", Ability:" + Ability_Collection[element[4]].abilityName + ",");
            }
        });
        s = s.substr(0, s.length -1);
        return super.toString() + ", stage:" + this.cardStage + ", currenyEnergy:" + this.currentEnergy + ", currenyHP:" + this.currentHp + ", Max HP:" + this.hp + ", attacks:" + s;
    }

    clone() {
        return new Pokemon(this.id, this.cardName, this.cardStage, this.cardBasic, this.property, this.hp, this.retreat, this.attacks);
    }
}

class Trainer extends Card {
    constructor(id, cardName, trainerType, ability) {
        super(id, cardName, Card_Type.trainer);
        this.trainerType = trainerType;
        this.ability = ability;
    }
/*
    toHtml() {
        return "<div id='" + this.id + "' class='pokemonallcard ui-widget-header'>" + this.cardName + "<br>Type:" + this.trainerType + "<img height='90px' width='60px' src='image/" + this.cardName + ".png'></div>";
    }
 */
    toString() {
        return super.toString() + ", ability:" + Ability_Collection[this.ability].abilityName;
    }

    clone() {
        return new Trainer(this.id, this.cardName, this.trainerType, this.ability);
    }
}

class Energy extends Card {
    constructor(id, cardName, energy) {
        super(id, cardName, Card_Type.energy);
        this.energy = energy;
    }
/*
    toHtml() {
        return "<div id='" + this.id + "' class='pokemonallcard ui-widget-header'>" + this.cardName + "<br>Energy:" + this.energy + "<img height='90px' width='60px' src='image/" + this.cardName + ".png'></div>";
    }
 */
    toString() {
        return super.toString() + ", energy: " + this.energy;
    }

    clone() {
        return new Energy(this.id, this.cardName, this.energy);
    }
}
