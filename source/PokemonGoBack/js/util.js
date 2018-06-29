var Card_Type = { pokemon: "pokemon", trainer: "trainer", energy: "energy" };
var Energy_Type = { colorless: "colorless", water: "water", lightning: "lightning", psychic: "psychic", fighting: "fighting" };
var Trainer_Type = { stadium: "stadium", supporter: "supporter", item: "item" };
var Ability_Type = { dam: "dam", deenergize:"deenergize",redamage: "redamage", heal: "heal", deck: "deck", cond: "cond", search: "search", draw: "draw", applystat: "applystat", swap: "swap", reenergize: "reenergize", add: "add", shuffle: "shuffle", destat: "destat" };
var Target_Pokemon = { your_active: "your-active", opponet_active: "opponent-active", choice_opponet: "choice:opponet", choice_your: "choice:your", choice_bench: "choice:opponet-bench", choice_your_banch: "choice:your-bench" };
var Target_Player = { you: "you", them: "them" };

// use Fisher-Yates Shuffle 
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
