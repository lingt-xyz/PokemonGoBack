let uuid = 0;
function getUUID(){
    return ++uuid;
}

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

function findFromArray(array, id){
    return array.find(element => element.id == id);
}

function findAndRemoveFromArray(array, id){
    let element = findFromArray(array, id);
    array.splice(array.indexOf(element), 1);
    return element;
}

function removeFromArray(array, element){
    array.splice(array.indexOf(element), 1);
}

function removeFromArrayByIndex(array, index){
    array.splice(index, 1);
}