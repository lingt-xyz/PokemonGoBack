$(function () {
	initAbility();
	initCardCollection();

	startNewGame(userOrder, aiOrder);

	var example1 = new Vue({
		el: '#example-1',
		data: {
			items: player.cardCollection
		}
	})
});

function startNewGame(userOrder, aiOrder) {
    player = new Player(userOrder, false);
    ai = new Player(aiOrder, true);
    game = new Game(player, ai);
    game.start();
    applyDrag();
	applyScrollerconsle();
}