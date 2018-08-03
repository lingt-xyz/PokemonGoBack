QUnit.test("Card Parse", function( assert ) {
    initCardCollection();
    assert.notEqual(Card_Collection, 0);
});

QUnit.test("Ability Parse", function( assert ) {
    initAbility();
    assert.notEqual(Ability_Collection, 0);
});

QUnit.test("Ability Class", function( assert ) {
    let t = new Ability(1, Ability_Type.dam);
    assert.equal(t.lineNumber, 1);
    assert.equal(t.abilityName, "dam");
});

QUnit.test("Card Class", function( assert ) {
    let card = new Card(1, "PP", Card_Type.pokemon, false);
    assert.equal(card.cardName, "PP");
    assert.equal(card.cardType, "pokemon");
    assert.equal(card.isAi, false);
    assert.equal(card.role, "user");
});

QUnit.test("Player Class", function( assert ) {
    assert.equal(user, null);
    assert.equal(ai, null);
    assert.equal(currentPlayer, null);
});

QUnit.test("shuffle", function( assert ) {
    let t = new Array("a", "b", "c");
    shuffle(t);
    assert.equal(t.length, 3);
});

QUnit.test("UUID", function(assert){
    var uuid1 = getUUID();
    var uuid2 = getUUID();
    assert.equal(uuid2, uuid1+1);
});

QUnit.test("findFromArray", function(assert){
    var o1 = {id:1, value:2};
    var testArray = [o1, o1];
    findFromArray(testArray, 1);
    assert.equal(testArray.length, 2);
});

QUnit.test("findAndRemoveFromArray", function(assert){
    var o1 = {id:1, value:2};
    var testArray = [o1, o1];
    findAndRemoveFromArray(testArray, 1);
    assert.equal(testArray.length, 1);
});

QUnit.test("removeFromArray", function(assert){
    var o1 = {id:1, value:2};
    var testArray = [o1, o1];

    var target = {id:1, value:2};
    removeFromArray(testArray, target);
    assert.equal(testArray.length, 1);
});

QUnit.test("removeFromArrayByIndex", function(assert){
    var o1 = {id:1, value:2};
    var testArray = [o1, o1];
    removeFromArrayByIndex(testArray, 1);
    assert.equal(testArray.length, 1);
});