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

    showImage() {
        if (this.isAi) {
            return "<img id='" + this.id + "'"
                + " ondblclick='showCardInfo(" + this.id + ", " + this.isAi + ")'"
                + " height='90px' width='60px' src='image/" + this.cardName + ".png'>";
        } else {
        }
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
        this.damageAmount = 0;
        //
        this.headled = false;
        //
        this.headledAmount = 0;
        //
        this.isStuck = false;
        //
        this.isAsleep = false;
        //
        this.isParalyzed = false;
        //
        this.isPoisoned = false;
    }

    addEnergy(energy) {
        if (this.property != "colorless" && energy.cardName.toLowerCase() == this.property) {
            this.currentEnergy += 1;
        } else {
            this.currentColorLessEnergy += 1;
        }
    }

    consumeEnergy(abilityIndex) {
        for (let element of this.attacks) {
            if (element.length == 3 && element[2] == abilityIndex) {
                // TODO check only colorless
                if (element[0] == this.property) {
                    if (this.currentEnergy >= element[1]) {
                        this.currentEnergy -= element[1];
                        return true;
                    } else {
                        return false;
                    }
                } else {// only need colorless energy
                    if (this.currentColorLessEnergy >= element[1]) {
                        this.currentColorLessEnergy -= element[1];
                        return true;
                    } else if ((this.currentColorLessEnergy + this.currentEnergy) >= element[1]) {
                        this.currentEnergy = (this.currentEnergy + this.currentColorLessEnergy - element[1]);
                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (element.length == 5 && element[4] == abilityIndex) {
                //Needs " + element[1] + " " + element[0] + ", " + element[3] + " " + element[2] + ",");
                // TODO check only colorless
                // TODO check: first one always colorless; second one is property
                if (this.currentEnergy >= element[3]) {
                    if (this.currentColorLessEnergy >= element[1]) {
                        this.currentColorLessEnergy -= element[1];
                        this.currentEnergy -= element[3];
                        return true;
                    } else if ((this.currentEnergy + this.currentColorLessEnergy) >= (+element[3] + +element[1])) {
                        this.currentColorLessEnergy = 0;
                        this.currentEnergy = (this.currentEnergy + this.currentColorLessEnergy) - (+element[3] + +element[1]);
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            }
        }
        return false;
    }

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        let attacks = "";
        this.attacks.forEach(element => {
            if (element.length == 3) {
                attacks += ("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Ability_Collection[element[2]].abilityName + ": Require " + element[1] + " " + element[0] + ",");
            } else if (element.length == 5) {
                attacks += ("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Ability_Collection[element[4]].abilityName + ": Require " + element[1] + " " + element[0] + ", " + element[3] + " " + element[2] + ",");
            }
        });
        attacks = attacks.substr(0, attacks.length - 1);
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Pokemon: " + this.cardName + ", Stage: " + this.cardStage + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;HP: " + this.currentHp + "/" + this.hp + "; "
            + "Energy: " + this.currentEnergy + " + " + this.currentColorLessEnergy + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Retreat: Require " + this.retreat[0] + " " + this.retreat[1] + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Attacks: " + attacks + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Pokemon(this.id, this.cardName, this.cardStage, this.cardBasic, this.property, this.hp, this.retreat, this.attacks, isAi);
    }
}

class Trainer extends Card {
    constructor(id, cardName, trainerType, abilityIndex, isAi) {
        super(id, cardName, Card_Type.trainer, isAi);
        this.trainerType = trainerType;
        this.abilityIndex = abilityIndex;
    }

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Trainer: " + this.cardName + ", " + this.trainerType + "</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Ability: " + Ability_Collection[this.abilityIndex].abilityName + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Trainer(this.id, this.cardName, this.trainerType, this.abilityIndex, isAi);
    }
}

class Energy extends Card {
    constructor(id, cardName, energy, isAi) {
        super(id, cardName, Card_Type.energy, isAi);
        this.energy = energy;
    }

    toConsole() {//"<div class='gamelog text-light'>[Info]: " + text + "</div>
        return "Card Detail</div>"
            + "<div>&nbsp;&nbsp;&nbsp;&nbsp;Energy: " + this.cardName + "</div>"
            + "<div>";
    }

    clone(isAi) {
        return new Energy(this.id, this.cardName, this.energy, isAi);
    }
}
