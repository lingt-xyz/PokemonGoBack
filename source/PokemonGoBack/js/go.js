$(function () {
	// make up some data
	let cardType = { Energy: "Energy", PokeMon: "PokeMon", Trainer: "Trainer" };
	let energyType = { Colorless: "colorless", Water: "water", Lightning: "lightning", Psychic: "psychic", Fighting: "fighting", notE: "ne" };

	let cardDeck = [];
	cardDeck.push(new Card('Pikachu', cardType.PokeMon, 60, 0, 3));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Zapdos', cardType.Energy, 120, 0, 4));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));
	cardDeck.push(new Card('Energy', cardType.Energy, 0, 1, 0));

	let player = new Player(cardDeck, cardDeck);
	let ai = new Player(cardDeck, cardDeck);
	let game = new Game(player, ai);

	game.start();

	//$( "#draggable" ).draggable({ axis: "y" });
    //$( "#draggable3" ).draggable({ axis: "x" });
 
    //$( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
	//$( "#draggable4" ).draggable({ containment: "parent" });
	$( ".pokemonallcard" ).draggable({
		appendTo: "body",
		cursor: "move",
		helper: 'clone',
		revert: "invalid"
	});
	
	$("#divCardActive").droppable(
	{
		tolerance: "intersect",
		accept: ".pokemonallcard",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {        
			$(this).append($(ui.draggable));
		}
	});
/*	$("#svgCardMat").droppable(
	{
		tolerance: "intersect",
		accept: ".pokemon",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		
		drop: function(event, ui) {        
			$(this).append($(ui.draggable));
			
		}
	});*/
	$("#svgCardMat").droppable({
		accept:".pokemonallcard",
		tolerance: "intersect",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			var $this = $(this);
			ui.draggable.position({
			my: "bottom",
			at: "bottom",
			of: $this,
			using: function(pos) {
				$(this).animate(pos, 100, "linear");
				}
			});
		}
	});
});