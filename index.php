<?php
require_once( 'util.php');
require_once( 'db.php');

if(!isset($_SESSION)){
    session_start();
}

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
?>
<html lang="en">
  <head>
      <?php
      $page_header = 'PokemonGoBack';
      require_once("header.php");
      ?>
      <script src="js/go.js"></script>
  </head>
  <body class="text-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">PokemonGoBack</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#" onclick="goHome(); return false;">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Start a New Game
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" onclick="startNewGame(); return false;">Use Random Deck</a>
                        <a class="dropdown-item" href="#" onclick="startDefinedGame(); return false;">Use Predefined Deck</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Testing Scenarios
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" onclick="startNewGame(); return false;">Retreat</a>
                        <a class="dropdown-item" href="#" onclick="startEnvolveGame(); return false;">Envolve</a>
                        <a class="dropdown-item" href="#" onclick="startItemGame(); return false;">Use Item</a>
                        <a class="dropdown-item" href="#" onclick="startChooseAbilityGame(); return false;">Choose</a>
                        <a class="dropdown-item" href="#" onclick="startPrizeGame(); return false;">End turn</a>
                        <a class="dropdown-item" href="#" onclick="startPrizeGame(); return false;">Collect prize card</a>
                        <a class="dropdown-item" href="#" onclick="showDiscard(); return false;">Show Discard</a>
                    </div>
                </li>
            </ul>
            <a class="p-2 text-dark" href="collection.php?action=update">Update Collection</a>
            <a class="p-2 text-dark" href="deck.php?action=update">Update Deck</a>
            <?php
            // step 1: sign in
            echo '<a class="p-2 text-dark" href="#">' . $_SESSION['user_name'] . ' </a>';
			echo '<a class="btn btn-outline-primary" href="signout.php">Log out</a>';
            ?>
        </div>
    </nav>

    <div class="container-fluid" id="gobackDiv" style="display: none;">
        <div class="row">
            <!-- playing area -->
            <div class="col-7 offset-md-1 bg-warning" style="height: 810px;">
                <!-- ai playing area -->
                <div id="divAi" class="h-50 my-0">
                    <div class="row my-0">
                        <div class="col-2 bg-light">
                            <span>Hand: {{ player.handCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-8 bg-light" id="divHandCollectionAi" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.handCollection" v-html="card.toHtml()"></span>
                        </div>
                        <div class="col-2 bg-light"></div>
                    </div>
                    <div class="row my-0">
                        <div class="col-2 bg-light">
                            <span>Deck: {{ player.deckCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-8 bg-secondary" id="divBenchCollectionAi" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.benchCollection" v-html="card.toHtml()"></span>
                        </div>
                        <div class="col-2 bg-light">
                            <span>Discard: {{ player.discardCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                    </div>
                    <div class="row mb-0">
                        <div class="col-2 bg-light">
                            <span>Prize: {{ player.prizeCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-4 offset-md-2 bg-secondary" id="divMatCollectionAi" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.matCollection" v-html="card.showImage()"></span>
                        </div>
                        <div class="col-2 offset-md-2 bg-light"></div>
                    </div>
                </div>
                <!-- user playing area -->
                <div id="divUser" class="h-50 my-0">
                    <div class="row mt-0 mb-3">
                        <div class="col-2 bg-light">
                            <span>Prize: {{ player.prizeCollection.length }}</span>
                            <img height='90px' width='60px' src="image/DeckCard.png">
                        </div>
                        <div class="col-4 offset-md-2 bg-secondary" id="divMatCollection" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.matCollection" v-html="card.toHtml()"></span>
                        </div>
                        <div class="col-2 offset-md-2 bg-light">
                            <button type="button" id="endTurn" class="btn btn-danger btn-lg" onclick="game.aiPlayTurn()">End My Turn</button>
                        </div>
                    </div>
                    <div class="row my-0">
                        <div class="col-2 bg-light">
                            <span>Deck: {{ player.deckCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-8 bg-secondary" id="divBenchCollection" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.benchCollection" v-html="card.toHtml()"></span>
                        </div>
                        <div class="col-2 bg-light">
                            <span>Discard: {{ player.discardCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                    </div>
                    <div class="row my-0">
                        <div class="col-2 bg-light">
                            <span>Hand: {{ player.handCollection.length }} </span>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-8 bg-light" id="divHandCollection" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
                            <span v-for="card in player.handCollection" v-html="card.toHtml()"></span>
                        </div>
                        <div class="col-2 bg-light"></div>
                    </div>
                </div>
            </div>

            <!-- console area -->
            <div class="col-3 bg-dark" style="height: 810px;">
                <div class="col-12 bg-success text-left" id="divGameConsole" style="height: 100%; overflow: auto;"></div>
            </div>
        </div>
    </div>

    <div class="container" id="hideDiv">
        <div class="jumbotron">
            <h1 class="display-4">Pokemon Goback!</h1>
            <h2 class="display-5">How to Play:</h2>
            <hr class="my-4">
            <ol class="list-group text-left">
                <li class="list-group-item">Click "Start a New Game" from the menu or the button below to play.</li>
                <li class="list-group-item">Place your Pokemon to your opponent's <font color="red">mat</font> to battle.</li>
                <li class="list-group-item">Place your Item to your opponent's <font color="red">mat</font> to use.</li>
                <li class="list-group-item">Double click a card to show details.</li>
                <li class="list-group-item">Get more information from the panel on the right side of the page.</li>
            </ol>
            <p></p>
            <p class="lead">
                    <a class="btn btn-primary btn-lg" href="#" onclick="startNewGame(); return false;" role="button">Start</a>
            </p>
        </div>
    </div>

    <?php
        require_once ("footer.php");
    ?>

  </body>
</html>
<?php
}else{
	header('Location: signin.php');
}
?>