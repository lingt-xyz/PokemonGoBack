class GameConsole {
    constructor() {
        $("#divGameConsole").html("");
    }

    logGeneral(text) {
        $("#divGameConsole").append("<div class='gamelog text-light'>[Info]: " + text + "</div>");
        this.scrollConsle();
    }
    logBattle(text) {
        $("#divGameConsole").append("<div class='gamelog text-light bg-dark'>[Battle]: " + text + "</div>");
        this.scrollConsle();
    }
    logWarning(text) {
        $("#divGameConsole").append("<div class='gamelog text-warning'>[Warning]: " + text + "</div>");
        this.scrollConsle();
    }
    logError(text) {
        $("#divGameConsole").append("<div class='gamelog bg-danger'>[Error]: " + text + "</div>");
        this.scrollConsle();
    }

    /**
     * 
     * @param {Pokemon} sourceCard 
     */
    logAbility(sourceCard) {
        $('#divGameConsole :button').prop('disabled', true);
        $("#divGameConsole").append("<div class='gamelog text-dark'>[Choose]: Select an ability:</div>");
        sourceCard.attacks.forEach(element => {
            let abilityIndex = 0;
            if (element.length == 3) {
                abilityIndex = element[2];
            } else if (element.length == 5) {
                abilityIndex = element[4];
            }

            $("#divGameConsole").append("<button type='button' class='btn btn-outline-dark'"
                + " onclick='applyAbility(" + sourceCard.id + ", " + sourceCard.isAi + ", " + abilityIndex + ")'"
                + ">" + Ability_Collection[abilityIndex].abilityName
                + "</button>");
        });
        this.scrollConsle();
    }

    logChooseBenchCard(player) {
        this.logBattle("Choose ");
        this.logChooseCard(player.benchCollection);
    }

    logChooseDiscardCard(player) {
        this.logBattle("Choose ");
        this.logChooseCard(player.discardCollection);
    }

    logChooseDeckCard(player) {
        this.logBattle("Choose ");
        this.logChooseCard(player.deckCollection);
    }

    logChooseAllCard(player, attach_type, damHp) {
        this.logBattle("Choose ");
        this.logChooseCard(player.benchCollection);
        this.logChooseCard(player.matCollection);
    }

    logChooseCard(collection) {
        collection.forEach(element => {
            if (element.cardType == Card_Type.pokemon) {
                $("#divGameConsole").append("<button type='button' class='btn btn-outline-dark'"
                    + " onclick='applyAbility(" + 1 + ", " + 2 + ", " + 3 + ")'"
                    + ">" + element.cardName
                    + "</button>");
            }
        });
        this.scrollConsle();
    }

    scrollConsle() {
        $("#divGameConsole").scrollTop(function () { return this.scrollHeight; });
    }
}