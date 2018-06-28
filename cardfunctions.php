$(function () {
    var serverString = "http://source.tutsplus.com/gamedev/authors/JamesTyner/FisherYates/src/images/";
    var cards = [];
    var i;
    for (i = 1; i <= 13; i++) {
        cards.push("c" + i);
    }
    //console.log(cards);
     
    function drawCards(){
      $("#holder").empty();
        for (i = 0; i < cards.length; i++) {
        $("#holder").append("<img src=" + serverString + cards[i] + ".png/>");
    }
    }
    drawCards();
    $("#shuffle").on('click', shuffle);
 
    var theLength = cards.length - 1;
    var toSwap;
    var tempCard;
 
    function shuffle() {
        console.log("Cards before shuffle:" + cards);
        for (i = theLength; i > 0; i--) {
            toSwap = Math.floor(Math.random() * i);
            tempCard = cards[i];
            cards[i] = cards[toSwap];
            cards[toSwap] = tempCard;
        }
        console.log("Cards after shuffle: "+cards);
        drawCards();
    }
});