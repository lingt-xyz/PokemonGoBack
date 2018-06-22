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
    $( "#draggable3" ).draggable({ axis: "x" });
 
    //$( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
    $( "#draggable4" ).draggable({ containment: "parent" });
});