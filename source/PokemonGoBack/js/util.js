var Card_Type = { pokemon: "pokemon", trainer: "trainer", energy: "energy" };
var Energy_Type = { colorless: "colorless", water: "water", lightning: "lightning", psychic: "psychic", fighting: "fighting" };
var Trainer_Type = { stadium: "stadium", supporter: "supporter", item: "item" };
var Ability_Type = { dam: "dam", deenergize: "deenergize", redamage: "redamage", heal: "heal", deck: "deck", cond: "cond", search: "search", draw: "draw", applystat: "applystat", swap: "swap", reenergize: "reenergize", add: "add", shuffle: "shuffle", destat: "destat" };
var Target_Pokemon = { your_active: "your-active", opponet_active: "opponent-active", choice_opponet: "choice:opponet", choice_your: "choice:your", choice_opponet_bench: "choice:opponet-bench", choice_your_banch: "choice:your-bench" };
var Target_Player = { you: "you", them: "them" };

let uuid = 0;
function getUUID(){
    return ++uuid;
}

// use Fisher-Yates Shuffle 
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function testAttack(target, abilityIndex){

}

function applyDrag() {
	
    // set all cards draggable
    $(".pokemonallcard").draggable({
        appendTo: "body",
        cursor: "move",
        helper: 'clone',
        revert: "invalid",
        //disabled: false
    });

    // set trainers and energy can be dropped to pokemon
    $(".pokemonallcard").droppable({
        tolerance: "intersect",
        accept: ".pokemonallcard",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            let target = $(this)[0];
            let source = $(ui.draggable)[0];
            if (target.parentElement.attributes["id"].value == "divCardInHand") {
                $("#battle-info").html("Cannot apply abilities on cards in hands.");
				
				$("#scrollerconsle").append(game.outConsleWarning("Cannot apply abilities on cards in hands."));
                return;
            }
            let targetCard = game.player.monitorDeck[target.attributes["data-deckId"].value];
            let sourceCard = game.player.monitorDeck[source.attributes["data-deckId"].value];
            // TODO check parent class
            if (sourceCard.cardType == Card_Type.trainer) {
                $("#battle-info").html("Apply trainer " + sourceCard.cardName + " to " + targetCard.cardName);
				$("#scrollerconsle").append(game.outConsleBattle("Apply trainer " + sourceCard.cardName + " to " + targetCard.cardName));
                //$(this).append($(ui.draggable));
            } else if (sourceCard.cardType == Card_Type.energy) {
                $("#battle-info").html("Apply energy " + sourceCard.cardName + " to " + targetCard.cardName);
				$("#scrollerconsle").append(game.outConsleBattle("Apply energy " + sourceCard.cardName + " to " + targetCard.cardName));
                if (sourceCard.cardName == targetCard.property) {
                    targetCard.currentEnergy += 1;
                } else {
                    targetCard.currentColorLessEnergy += 1;
                }
                //targetCard.currentEnergy += sourceCard.cardName;
                game.player.cardDiscard.push(sourceCard);
                $(ui.draggable).remove();
                $("#hiddenCards").append($(ui.draggable));
            } else {
                // is it an attack?
                if (target.parentElement.attributes["id"].value == "svgCardMatAi") {
                    $("#battle-info").html("");
                    sourceCard.attacks.forEach(element => {
                        if (element.length == 3) {
                            //$("#battle-info").append("<button onclick='"+sourceCard.attack(targetCard, element[2])+"'>"+Ability_Collection[element[2]].abilityName+"</button><br/>");
                            $("#battle-info").append("<button>"+Ability_Collection[element[2]].abilityName+"</button><br/>");
                        } else if (element.length == 5) {
                            //$("#battle-info").append("<button onclick='"+sourceCard.attack(targetCard, element[4])+"'>"+Ability_Collection[element[4]].abilityName+"</button><br/>");
                            $("#battle-info").append("<button>"+Ability_Collection[element[4]].abilityName+"</button><br/>");
                        }
                    });
                    //$("#battle-info").html("HP:" + hp1 + "=>" + hp2);
                    return;
                }else{
                    if (sourceCard.cardBasic == targetCard.cardName) {
                        $("#battle-info").html("Evolve card " + targetCard.cardName + " to " + sourceCard.cardName);
						$("#scrollerconsle").append(game.outConsleBattle("Evolve card " + targetCard.cardName + " to " + sourceCard.cardName));
                        game.player.cardDiscard.push(targetCard);
                        //TODO remove targetCard
                        $("'#" + targetCard.id + "'").remove();
                    }
                    // pokemon, cannot put here
                }
            }
            game.showGameInfo();
        }
    });

    // set pokemons can be dragged to bench
    $("#divCardActive").droppable({
        tolerance: "intersect",
        accept: ".pokemonallcard",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            let source = $(ui.draggable)[0];
            let sourceCard = Card_Collection[source.id];
            if (sourceCard.cardType == Card_Type.pokemon) {
                // retreat;
                if (source.parentElement.attributes["id"].value == "svgCardMat") {
                    if (sourceCard.retreat.length == 2) {
                        sourceCard.currentEnergy -= sourceCard.retreat[0];
                        if (sourceCard.currentEnergy >= 0) {
                            $("#battle-info").html("Retreat pokemon: " + sourceCard.cardName + ".");
							$("#scrollerconsle").append(this.outConsleBattle("Retreat pokemon: " + sourceCard.cardName + "."));
                            $(this).append($(ui.draggable));
                        } else {
                            $("#battle-info").html("Retreat pokemon: " + sourceCard.cardName + " failed, insufficient energy.");
							$("#scrollerconsle").append(game.outConsleWarning("Retreat pokemon: " + sourceCard.cardName + " failed, insufficient energy."));
                        }
                    }
                } else {
                    $(this).append($(ui.draggable));
                }
            } else {
                // not a pokemon, cannot put here
                let source = $(ui.draggable)[0];
                let sourceCard = game.player.monitorDeck[source.attributes["data-deckId"].value];
                //$("#battle-info").html("Non-pokemon: " + sourceCard.cardName + " cannot be moved here. ");
            }
            game.showGameInfo();
        }
    });

    // set cards can be dragged to battle mat
    $("#svgCardMat").droppable({
        accept: ".pokemonallcard",
        tolerance: "intersect",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            let source = $(ui.draggable)[0];
            let sourceCard = game.player.monitorDeck[source.attributes["data-deckId"].value];
            // TODO check parent class
            if (sourceCard.cardType == Card_Type.pokemon) {
                // check whether we already have one
                if ($(this).children().length > 0) {
                    $("#battle-info").html("One pokemon is already in the battle.");
					$("#scrollerconsle").append(this.outConsleWarning("One pokemon is already in the battle."));
                } else {
                    $(this).append($(ui.draggable));
                }
            }
            game.showGameInfo();
        }
    });

    $(".pokemonallcard").dblclick(function () {
        $("#battle-info").html(game.player.monitorDeck[$(this).attr("data-deckId")].toString());
		$("#scrollerconsle").append(game.outConsleInfor(game.player.monitorDeck[$(this).attr("data-deckId")].toString()));
    });

    //lookatdiscard//TODO:MAKE THE CARD SHOW IN THE BATTLE-INFO AUTO-SIZING TO FIT THE DIV OR MAKE A SCROLLER AREA
    $("#divCardDiscard").dblclick(function () {
        $("#battle-info").empty();
        game.player.cardDiscard.forEach((element) => {
            $("#battle-info").append(element.toHtml());
			$("#scrollerconsle").append(game.outConsleInfor(element.toString()));
        });
    });

    //lookatdiscardAi
    $("#divAiDiscard").dblclick(function () {
        $("#battle-info").empty();
        game.ai.cardDiscard.forEach((element) => {
            $("#battle-info").append(element.toHtml());
			$("#scrollerconsle").append(game.outConsleInfor(element.toString()));
        });

    });
}