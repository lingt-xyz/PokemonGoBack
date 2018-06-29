$(function () {
	initAbility();
	initCardCollection();

// make up some data
	userOrder = [51, 52, 53, 58, 44, 43, 33, 32, 57, 57, 34, 35, 33, 33, 45, 46, 28, 31, 46, 47, 29, 57, 58, 57, 57, 55, 58, 56, 58, 58, 58, 57, 48, 57, 57, 38, 58, 58, 34, 36, 37, 54, 39, 52, 41, 49, 50, 37, 58, 39, 40, 40, 57, 47, 36, 30, 58, 54, 57, 30];
	aiOrder = userOrder;

	startNewGame(userOrder, aiOrder);
applyDrag();
});

function startNewGame(userOrder, aiOrder){
	player = new Player(userOrder, false);
	ai = new Player(aiOrder, true);
	game = new Game(player, ai);
	
	/*function playerEndTurn()
	{
		game.player.ismyturn = false;
		
	}*/
	game.start();
applyDrag();
}

function applyDrag(){

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
			if(target.parentElement.attributes["id"].value == "divCardInHand"){
$("#battle-info").html("Cannot apply abilities on cards in hands." );
return;
}			
			let targetCard = game.player.monitorDeck[target.attributes["data-deckId"].value];
			let sourceCard = game.player.monitorDeck[source.attributes["data-deckId"].value];
			// TODO check parent class
			if(sourceCard.cardType == Card_Type.trainer){
				$("#battle-info").html("Apply trainer " + sourceCard.cardName + " to " + targetCard.cardName);
				//$(this).append($(ui.draggable));
			}else if(sourceCard.cardType == Card_Type.energy){
				$("#battle-info").html("Apply energy " + sourceCard.cardName + " to " + targetCard.cardName);
				if(sourceCard.cardName == targetCard.property){
					
				targetCard.currentEnergy += 1;
				}else{
				targetCard.currentColorLessEnergy += 1;
				}
				//targetCard.currentEnergy += sourceCard.cardName;
				$("#hiddenCards").append($(ui.draggable));
			}else{
				// pokemon, cannot put here
			}
		}
	});

	// set pokemons can be dragged to bench
	$("#divCardActive").droppable({
		tolerance: "intersect",
		accept: ".pokemonallcard",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function (event, ui) {
			let target = $(this)[0];
			let source = $(ui.draggable)[0];
			let sourceCard = Card_Collection[source.id];
			if(sourceCard.cardType == Card_Type.pokemon){
				$(this).append($(ui.draggable));
			}else{
				// not a pokemon, cannot put here
				let source = $(ui.draggable)[0];
				let sourceCard = game.player.monitorDeck[source.attributes["data-deckId"].value];
				//$("#battle-info").html("Non-pokemon: " + sourceCard.cardName + " cannot be moved here. ");
			}
		}
	});

	// set cards can be dragged to battle mat
	$("#svgCardMat").droppable({
		accept: ".pokemonallcard",
		tolerance: "intersect",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function (event, ui) {
			$(this).append($(ui.draggable));
		}
	});

	$(".pokemonallcard").dblclick(function(){
		
		$("#battle-info").html(game.player.monitorDeck[$(this).attr("data-deckId")].toString());
	});
	
	//lookatdiscard//TODO:MAKE THE CARD SHOW IN THE BATTLE-INFO AUTO-SIZING TO FIT THE DIV OR MAKE A SCROLLER AREA
	$("#divCardDiscard").dblclick(function(){
		$("#battle-info").empty();
		game.player.cardDiscard.forEach((element) => {
			$("#battle-info").append(element.toHtml());
		});
		
	}); 	
	//lookatdiscardAi
	$("#divAiDiscard").dblclick(function(){
		$("#battle-info").empty();
		game.ai.cardDiscard.forEach((element) => {
			$("#battle-info").append(element.toHtml());
		});
		
	});
}
