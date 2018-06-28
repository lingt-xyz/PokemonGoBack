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
		this.toSwap =[];
		this.tempCard = null;
		//genegrate card will coz a bug that both ai and player will get one more pikachu card
      //  this.generateCardInHand();
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
		$("#divCardDeck-p").html("Deck:"+this.deck.length);
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
							this.shuffleCard();
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
	//shuffle hand card into deck
	shuffleCard(){
				//put all hand card back to deck
				for(let i=0;i<this.cardInHand.length;i++)
				{
					this.deck.push(this.cardInHand[i]);
				} 
				//clear hand card
				while(this.cardInHand.length)
					this.cardInHand.pop();
				
				//shuffle  deck order
				for (let i = this.deck.length; i > 0; i--) 
				{
					this.toSwap = Math.floor(Math.random() * 10);
					this.tempCard = this.deck[i];
					this.deck[i] = this.deck[this.toSwap];
					this.deck[this.toSwap] = this.tempCard;
				}
				
	}

    toString() {
        return "Player";
    }
	//Ai deal card to different div area
	dealCardAi(){
		if(this.deck.length == 0)
					document.getElementById("divAiHand").innerHTML ="Not Enough card";
				else{
					if(this.initialround)
					{	//deal the card first
						for(let i = 0; i <7;i++)
							{
								this.getHandCardAi();
							}
						
				        //isMulligan return false   = need shullfe, true= game continue
						while(!this.isMulligan)
						{
							this.shuffleCard();
							this.dealcard();
						}
						this.initialround = false;
					}
					else
						this.getHandCardAi();
					}
	}
	getHandCardAi(){
		this.cardInHand.unshift(this.deck[0]);
		$("#divAiHand").append(this.cardInHand[0].toHtmlAi());
		this.deck.shift();
		$("#divAiDeck-p").html("Deck:"+this.deck.length);
	}
}
