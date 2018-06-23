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

    toHtml() {
        return "<p id='draggable4' class='pokemon ui-widget-header'>" + this.cardName + "</p>";
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

class Pokemon extends Card{
    constructor(name, cardType, hp, initalep, maxep){
        super(name, cardType, hp, initalep, maxep);
    }
}