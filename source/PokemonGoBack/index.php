<html lang="en">
  <head>
      <?php
      $page_header = 'PokemonGoBack';
      require_once ("header.php");
      ?>
      <script src="js/go.js"></script>
  </head>
  <body class="text-center">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 class="my-0 mr-md-auto font-weight-normal">PokemonGoBack</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <button type="button" onclick ="#">Start a New Game</button>
            <a class="p-2 text-dark" href="collection.php?action=update">Update Collection</a>
            <a class="p-2 text-dark" href="deck.php?action=update">Update Deck</a>
            <?php
            require_once( 'db.php');

            if(!isset($_SESSION)){
                session_start();
            }

            // step 1: sign in
            if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
                echo '<a class="p-2 text-dark" href="#">' . $_SESSION['user_name'] . ' </a>';
                echo '<a class="btn btn-outline-primary" href="signout.php">Log out</a>';
            }else{
                header('Location: signin.php');
            }

            ?>
        </nav>
    </div>

    <div class="container-fluid" id="divPlayMat">
        <div class="row">
            <div class="col-md-8 offset-md-2" id="divAiHand"></div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-10 offset-md-1" style="background-color: honeydew">
                    <div class="row">
                        <div class="col-md-1 offset-md-1" id="divAiDiscard"><p id="divAiDiscard-p">Discard</p><img src="image/DeckCard.png" height="90" width="63" ></div>
                        <div class="col-md-8" id="divAiActive"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1 offset-md-1" id="divAiDeck"><p id="divAiDeck-p">Deck</p><img src="image/DeckCard.png" height="90" width="63"></div>
                    </div>
                    <div class="row">
                        <p id="svgCardMat-p"></p>
                        <div class="col align-self-center" id="svgCardMat">
                            <svg height="300" width="300"  >
                                <ellipse cx="150" cy="150" rx="150" ry="150" style="fill:lightslategray;stroke:purple;stroke-width: 2px" id="svgCardMat"/>
                            </svg>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-md-1 offset-md-10" id="divCardDeck"><p id="divCardDeck-p">Deck</p>
                            <img src="image/DeckCard.png" height="90" width="63"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 offset-md-2" id="divCardActive"></div>
                        <div class="col-md-1" id="divCardDiscard"><p id="divCardDiscard-p" >Discard</p>
                            <img src="image/DeckCard.png" height="90" width="63"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 offset-md-2 draggable ui-widget-content" id="divCardInHand"></div>
        </div>
    </div>
  </body>
</html>
