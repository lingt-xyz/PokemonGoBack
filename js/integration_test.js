
module.exports = {
  'Login test': function (client) {
    client
      .url('http://dumblev3.encs.concordia.ca/index.html')
      .setValue('input[name="email"]', 'foo@bar.com')
      .setValue('input[name="password]', 'p455w0rdZ')
      .click('button[id="submit"]')
      .assert.containsText('main', 'News feed')
      .end();
  }
};

module.exports = {
  'Game start test': function (client) {
    client
      .url('http://dumblev3.encs.concordia.ca/index.html');
      .click('button[class="nav-link dropdown-toggle"]');
      .click('button[class="dropdown-item"]');
      .assert.containsText('[Info]', 'Game Start !');
      .end();
  }
};

module.exports = {
  'Deal cards test': function (client) {
    client
      .url('http://dumblev3.encs.concordia.ca/index.html');
      .click('button[class="nav-link dropdown-toggle"]');
      .click('button[class="dropdown-item"]');
      .assert.containsText('[Info]: Deal cards to both players.');
      .end();
  }
};



module.exports = {
  'AI plays test': function (client) {
    client
      .url('http://dumblev3.encs.concordia.ca/index.html');
      .click('button[class="nav-link dropdown-toggle"]');
      .click('button[class="dropdown-item"]');
      .click('button[class="btn btn-danger btn-lg"]');
      .assert.containsText('[Battle]: (AI)');
      .end();
  }
};
