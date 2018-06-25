$(function () {
	// make up some data
	let userOrder = [51, 52, 53, 58, 44, 43, 33, 32, 57, 57, 34, 35, 33, 33, 45, 46, 28, 31, 46, 47, 29, 57, 58, 57, 57, 55, 58, 56, 58, 58, 58, 57, 48, 57, 57, 38, 58, 58, 34, 36, 37, 54, 39, 52, 41, 49, 50, 37, 58, 39, 40, 40, 57, 47, 36, 30, 58, 54, 57, 30];
	let aiOrder = userOrder;

	initAbility();
	initCardCollection();

	let player = new Player(userOrder, false);
	let ai = new Player(aiOrder, true);
	let game = new Game(player, ai);

	game.start();

	//in order to enable/disable draggable during game , move all draggablefunction inside  game.js 
	$(".pokemonallcard").draggable({
		appendTo: "body",
		cursor: "move",
		helper: 'clone',
		revert: "invalid",
		//disabled: false
	});
	$("#divCardActive").droppable({
		tolerance: "intersect",
		accept: ".pokemonallcard",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function (event, ui) {
			$(this).append($(ui.draggable));
		}
	});

	$("#svgCardMat").droppable({
		accept: ".pokemonallcard",
		tolerance: "intersect",
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function (event, ui) {
			var $this = $(this);
			ui.draggable.position({
				my: "bottom",
				at: "bottom",
				of: $this,
				using: function (pos) {
					$(this).animate(pos, 100, "linear");
				}
			})
		}
	});
});
