$(function () {
	

});

initAbility();
initCardCollection();

startNewGame(userOrder, aiOrder);

new Vue({
	el: '#divAi',
	data: {
		player: ai
	}
})

new Vue({
	el: '#divUser',
	data: {
		player: user
	}
})

function startNewGame(userOrder, aiOrder) {
    user = new Player(userOrder, false);
    ai = new Player(aiOrder, true);
    game = new Game(user, ai);
    game.start();
    applyDrag();
}