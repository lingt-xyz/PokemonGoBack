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
            <button type="button" onclick="startNewGame(null,null);">Start a New Game</button>
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
            <div class="col-md-1 offset-md-2" id="divSizeOfHandAi"></div>
            <div class="col-md-7" id="divAiHand"></div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-10 offset-md-1" style="background-color: honeydew">
                    <div class="row">
                        <div class="col-md-1 offset-md-2" id="divAiDeck">
                            <p id="divAiDeck-p">Deck</p>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-md-1" id="divAiDiscard">
                            <p id="divAiDiscard-p">Discard</p>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-md-6" id="divAiActive">
                            <p id="divAiActive-p">hand card</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-1 offset-md-2" id="svgCardMat-turn"></div>
                        <div class="col-md-1" id="divPrizeCards">
                            <div id="divPrizeCardAi" style="height:120px;width:100px;margin:auto">
                                <img height='90px' width='60px' src="image/DeckCard.png">
                            </div>
                            <div id="divPrizeCardPlayer" style="height:120px;width:100px;margin:auto">
                                <img height='90px' width='60px' src="image/DeckCard.png">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div id="svgCardMatAi" style="height:120px;width:100px;margin:auto"></div>
                            <svg height="280" style="position:absolute;top:0%;left:20%" width="320">
                                <ellipse rx="150" ry="120" style="fill:lightslategray;opacity:0.4;stroke:purple;stroke-width: 2px" cy="140" cx="160"></ellipse>
                            </svg>
                            <div id="svgCardMat" style="height:120px;width:100px;margin:auto"></div>
                        </div>
                        <div class="col-md-2" id="battle-info"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1 offset-md-2">
                            <button type="button" id="endTurn" onclick="game.aiPlayTurn()">End My Turn</button>
                        </div>
                        <div class="col-md-5" id="divCardActive">
                        </div>
                        <div class="col-md-1" id="divCardDiscard">
                            <p id="divCardDiscard-p">Discard</p>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="col-md-1 dragPlayer" id="divCardDeck">
                            <p id="divCardDeck-p">Deck</p>
                            <img src="image/DeckCard.png" height="90" width="63">
                        </div>
                        <div class="" id="hiddenCards" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-1 offset-md-2" id="divSizeOfHand"></div>
            <div class="col-md-7 draggable ui-widget-content dragPlayer" id="divCardInHand"></div>
        </div>
    </div>
  </body>
</html>
