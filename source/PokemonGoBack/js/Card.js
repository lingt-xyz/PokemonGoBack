class Card {
    constructor(lineNumber, cardName, cardType, isAi) {
        this.id = getUUID();
        this.lineNumber = lineNumber;
        this.cardName = cardName;
        this.cardType = cardType;
        this.isAi = isAi;
        if (isAi) {
            this.role = "ai";
        } else {
            this.role = "user";
        }
    }

    // Generate a string that can match it's picture's name
    getImageName() {
        // TODO convert French letters to English letters, remove blanks between letters
        // e.g.: a b c =>abcCard.png
    }

    toHtml() {
        if (this.isAi) {
            return "<img id='" + this.id + "' height='90px' width='60px' src='image/DeckCard.png'>";
        } else {
            return "<img"
                + " id='" + this.id + "'"
                + " data-role='" + this.role + "'"
                + " draggable='true'"
                + " ondragstart='dragstart_handler(event)'"
                + " ondrop='drop_handler(event)'"
                + " ondragover='dragover_handler(event)'"
                + " onerror='loadDefaultImg(" + this.id + ")'"
                + " ondblclick='showCardInfo(" + this.id + ", " + this.isAi + ")'"
                + " height='90px' width='60px' src='image/" + this.cardName + ".png'>";
        }
    }

    toString() {
        return "Name:" + this.cardName + ", type:" + this.cardType;
    }
}

class Pokemon extends Card {
    constructor(id, cardName, cardStage, cardBasic, property, hp, retreat, attacks, isAi) {
        super(id, cardName, Card_Type.pokemon, isAi);
        // basic or stage-one
        this.cardStage = cardStage;
        // whether it's basic pokemon (if this is a stage-one pokemon)
        this.cardBasic = cardBasic;
        // the energy type of this pokemon
        this.property = property;
        // max hp
        this.hp = hp;
        //[retreatEnergyPoint, retreatEnergyType]
        this.retreat = retreat;
        //[energyType1, energyType1Point, energyType2, energyType2Point, ability]
        this.attacks = attacks;
        this.currentHp = hp;
        this.currentEnergy = 0;
        // other energy except its property energy
        this.currentColorLessEnergy = 0;
        //
        this.attackInfo = "";
        //
        this.attackResult = false;
        // 
        this.damage = 0;
    }

    addEnergy(energy) {
        if (this.property != "colorless" && energy.cardName.toLowerCase() == this.property) {
            this.currentEnergy += 1;
        } else {
            this.currentColorLessEnergy += 1;
        }
    }

    /**
     * 
     * @param {Pokemon} target the pokemon to be attacked
     * @param {Number} abilityIndex the index of the abilities it has
     */
    attack(target, abilityIndex) {
        // TODO consume energy
        let me = null;
        let you = null;
        if (currentPlayer.isAi) {
            me = ai;
            you = user;
        } else {
            me = user;
            you = ai;
        }
        let ability = Ability_Collection[abilityIndex];
        if (ability instanceof Dam) {
            let damHp = 0;
            if (ability.damHp.contains("count")) {
                let ss = ability.damHp.split("*");
                let num1 = 0;
                let num2 = 0;
                let string2 = "";
                if (ss[0].contains("count")) {
                    num1 = ss[1];
                    string2 = ss[0];
                } else {
                    num1 = ss[0];
                    string2 = ss[1];
                }
                // TODO
                switch (string2) {
                    case "your-bench":
                        num2 = me.benchCollection.length;
                        break;
                    case "your-active:damage":
                        if (me.currentPokemon) {
                            num2 = me.currentPokemon.damage;
                        } else {
                            num2 = 0;
                        }
                        break;
                    case "opponent-active:energy":
                        if (you.currentPokemon) {
                            num2 = you.currentPokemon.energy + you.currentPokemon.currentColorLessEnergy;
                        } else {
                            num2 = 0;
                        }
                        break;
                    default:
                        break;
                }
                damHp = num1 * num2;
            } else {
                damHp = ability.damHp;
            }
            switch (ability.target) {
                case Target_Pokemon.opponent:
                    //TODO
                    break;
                case Target_Pokemon.opponet_active:
                    your.currentPokemon.currentHp -= damHp;
                    break;
                case Target_Pokemon.your_active:
                    me.currentPokemon.currentHp -= damHp;
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
            switch (ability.target) {
                case Target_Pokemon.opponet_active:
                    //
                    break;
                case Target_Pokemon.your_active:
                    me.currentPokemon.currentHp += ability.number;
                    break;
                case Target_Pokemon.choice_opponet:
                    // 
                    break;
                case Target_Pokemon.choice_your:
                    // TODO choose one card
                    break;
                case Target_Pokemon.choice_opponet_bench:
                    // 
                    break;
                case Target_Pokemon.choice_your_banch:
                    // 
                    break;
                default:
                    break;
            }
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

        return result;
    }

    toString() {
        let s = "";
        this.attacks.forEach(element => {
            if (element.length == 3) {
                s += ("AttackType:" + element[0] + ", AttackEnergy:" + element[1] + ", Ability:" + Ability_Collection[element[2]].abilityName + ",");
            } else if (element.length == 5) {
                s += ("AttackType1:" + element[0] + ", AttackEnergy1:" + element[1] + ", AttackType2:" + element[2] + ", AttackEnergy2:" + element[3] + ", Ability:" + Ability_Collection[element[4]].abilityName + ",");
            }
        });
        s = s.substr(0, s.length - 1);
        return super.toString() + ", stage:" + this.cardStage + ", currenyEnergy:" + this.currentEnergy + ", currenyColorLessEnergy:" + this.currentColorLessEnergy + ", currenyHP:" + this.currentHp + ", Max HP:" + this.hp + ", attacks:" + s;
    }

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        let attacks = "";
        this.attacks.forEach(element => {
            if (element.length == 3) {
                attacks += ("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Ability_Collection[element[2]].abilityName + ": Needs " + element[1] + " " + element[0] + ",");
            } else if (element.length == 5) {
                attacks += ("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Ability_Collection[element[4]].abilityName + ": Needs " + element[1] + " " + element[0] + ", " + element[3] + " " + element[2] + ",");
            }
        });
        attacks = attacks.substr(0, attacks.length - 1);
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Name: " + this.cardName + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Type: " + this.cardType + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Stage: " + this.cardStage + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Max HP: " + this.hp + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;CurrenyHP: " + this.currentHp + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;CurrenyEnergy: " + this.currentEnergy + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;CurrenyColorLessEnergy: " + this.currentColorLessEnergy + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Retreat: " + this.retreat + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Attacks: " + attacks + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Pokemon(this.id, this.cardName, this.cardStage, this.cardBasic, this.property, this.hp, this.retreat, this.attacks, isAi);
    }
}

class Trainer extends Card {
    constructor(id, cardName, trainerType, ability, isAi) {
        super(id, cardName, Card_Type.trainer, isAi);
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

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Name: " + this.cardName + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Type: " + this.cardType + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;TrainerType: " + this.trainerType + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Ability: " + this.ability + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Trainer(this.id, this.cardName, this.trainerType, this.ability, isAi);
    }
}

class Energy extends Card {
    constructor(id, cardName, energy, isAi) {
        super(id, cardName, Card_Type.energy, isAi);
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

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Name: " + this.cardName + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Type: " + this.cardType + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Energy: " + this.energy + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Energy(this.id, this.cardName, this.energy, isAi);
    }
}
