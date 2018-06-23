class Player {
    constructor(cardCollection, deck, isShuffle = false, order = []) {
        this.cardCollection = cardCollection;
        this.deck = deck;
        this.isShuffle = isShuffle;
        this.order = order;
        // we should shuffle here, or use fixed order
        this.cardInHand = [];
		//card in bench
        this.cardActive = [];
        this.cardDiscard = [];
		
        this.generateCardInHand();
		this.initialround = true;
    }
	
	
    generateCardInHand() {
        if (this.isShuffle) {
            do {
                for (let index of this.order) {// TODO what we really need?
                    this.cardInHand.push(deck[index]);
                }
            } while (this.isMulligan());
        } else {
			
           this.dealcard();
        }
    }
	getHandCard(){
		this.cardInHand.unshift(this.deck[0]);
		$("#divCardInHand").append(this.cardInHand[0].toHtml());
		this.deck.shift();
		$("#divCardDeck").html("Deck:"+this.deck.length);
	}
    dealcard(){
		//first check the card number in deck
				if(this.deck.length == 0)
					document.getElementById("divCardInHand").innerHTML ="Not Enough card";
				else{
					if(this.initialround)
					{	//deal the card first
						for(let i = 0; i <7;i++)
							{
								this.getHandCard();
							}
						
				        //isMulligan return false   = need shullfe, true= game continue
						while(!this.isMulligan)
						{
							//shuffleCard();
							this.dealcard();
						}
						this.initialround = false;
					}
					else
						this.getHandCard();
					}
					
	}
    // check Mulligan by looking into cards in hands
    isMulligan() {
        return this.cardInHand.find(item => item.cardType === "PokeMon");
    }

    toString() {
        return "Player";
    }
}