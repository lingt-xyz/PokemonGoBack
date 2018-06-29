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
    assert.equal(t.id, 1);
    assert.equal(t.abilityName, "dam");
});

QUnit.test("Card Class", function( assert ) {
    let card = new Card(1, "PP", Card_Type.pokemon, false);
    assert.equal(card.id, 1);
    assert.equal(card.cardName, "PP");
    assert.equal(card.cardType, "pokemon");
    assert.equal(card.isAi, undefined);
    assert.equal(card.role, "player");
});

QUnit.test("Player Class", function( assert ) {
    assert.equal(player, null);
    assert.equal(ai, null);
});

QUnit.test("shuffle", function( assert ) {
    let t = new Array("a", "b", "c");
    shuffle(t);
    assert.equal(t.length, 3);
});