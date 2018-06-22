var cardName = "";
var cardType = { Energy: "Energy", PokeMon: "PokeMon", Trainer: "Trainer" };
var energyType = { Colorless: "colorless", Water: "water", Lightning: "lightning", Psychic: "psychic", Fighting: "fighting", notE: "ne" };

var cardCurrentHealth = 0;
var cardCurrentEnergy = 0;
var cardMaxEnergy = 0;
var CardMaxHealth = 0;
var m_turn = 1;
var isMulligan = true;//bool -> var
var cardDeck = [];
var cardGrave = [];
var handCard = [];
var i;
class Card {
	constructor(name, cardType, hp, initalep, maxep) {
		//energy card  has 0 hp, 1ep and 0maxep--> cannot apply energy card on it
		//& train card has 0 hp ,0 ep and 0 maxep
		this.cardName = name;
		this.cardType = cardType;
		this.cardCurrentHealth = hp;
		this.CardMaxHealth = hp;
		this.cardCurrentEnergy = initalep;
		this.cardMaxEnergy = maxep;
	}
	toString() {
		var str = "";
		switch (this.cardType) {
			case cardType.Energy:
				str = "Energy";
                /*switch(this.energyType){
                    case energyType.Colorless:str += ": colorless";break;
                    case energyType.Water: str += ": water";break;
                    case energyType.Lightning: str+=": lightning";break;
                    case energyType.Psychic: str+= ": psychic"; break;
                    case energyType.Fighting: str+=": fighting";break;
                    case energyType.notE: srt = "error, not energy card"; break;
                }*/
				break;
			case cardType.PokeMon:
				str = "Pokemon";
                /*switch(this.pokemonType)
                {
                    case pokemonType.Basic: str+=": basic";break;
                    case pokemonType.Stage-one: str+=": stage1";break;
                    case pokemonType.notP: str ="error, not pokemon card";break;
                }		*/
				break;
			case cardType.Trainer:
				str = "Trainer";
                /*switch(this.trainType)
                {
                    case trainType.Stadium: str+=": stadium"; break;
                    case trainType.Supporter: str+=": supporter"; break;
                    case trainType.Itemm: str+=": item"; break;
                    case trainType.notT: str ="error, not trainer card"; break;
                }*/
				break;
			default:
				alert('Default case');
		}
		document.getElementById("handcard").innerHTML = "switch funtion";
		//return "Card: "+this.cardName + ":" + str + this.hp+" "+this.initalep+" "+this.maxep;
	}
}
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


function GetHandCard() {
	//var img = document.createElement("img");
	//img.src = "cardimg/"+cardDeck[index].cardName+"Card.png"
	//document.body.appendChild(img);
	//put first card into hand card
	handCard.push(cardDeck[0]);
	//and remove it from deck 
	document.getElementById("handcard").innerHTML = "lol";
	for (i = 0; i < cardDeck.length - 1; i++) {
		cardDeck[i] = cardDeck[i + 1];
	}
	document.getElementById("handsize").innerHTML = handCard.length;
	document.getElementById("decksize").innerHTML = cardDeck.length;
	document.getElementById("handcard").innerHTML = "1";
}
//shuffle hand card into deck
function shuffleCard() {
	//put all hand card back to deck
	for (i = 0; i < handCard.length; i++) {
		cardDeck.push(handCard[i]);
	}
	//clear hand card
	while (handCard.length)
		handCard.pop();

	//shuffle  deck order
	for (i = cardDeck.length; i > 0; i--) {
		toSwap = Math.floor(Math.random() * 10);
		tempCard = cardDeck[i];
		cardDeck[i] = cardDeck[toSwap];
		cardDeck[toSwap] = tempCard;
	}

}
function Deal() {
	//first check the card number in deck
	if (cardDeck.length == 0)
		document.getElementById("handcard").innerHTML = "Not Enough card";
	else {
		if (m_turn == 1)//=->==
		{	//deal the card first
			for (i = 0; i < 7; i++) {
				GetHandCard();
			}
			Mulligan();
			//isMulligan   = need shullfe,not mulligan = game continue
			while (isMulligan) {
				shuffleCard();
				Deal();
			}
			m_turn++;
		}
		else
			GetHandCard();
	}
	document.getElementById("handcard").innerHTML = "piki";
}

function Mulligan() {
	//check by look into handcard

	//if not nulligen--> isMulligan = false-->break the while loop in Deal();
	//not sure find()will work
	if (handCard.find(Card => Card.cardType === "PokeMon")
				{
		isMulligan = false;
	}	//if is mulligan-->shullfe and isMulligan = true
	else {
		isMulligan = true;
	}

}