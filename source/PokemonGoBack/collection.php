<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="image/favicon.ico"/>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link href="css/grid.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
            integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
            crossorigin="anonymous"></script>
    <title>PokemonGoBack</title>
</head>
<body class="text-center">
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal">Upload Card Collection</h5>
    <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Update Collection</a>
        <a class="p-2 text-dark" href="deck.php?action=update">Update Deck</a>

        <?php
        require_once('util.php');
        require_once('Card.php');
        require_once('db.php');

        if (!isset($_SESSION)) {
            session_start();
        }

        // step 1: ensure the user has signed in
        if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
            echo '<a class="p-2 text-dark" href="#">' . $_SESSION['user_name'] . ' </a>';
            echo '<a class="btn btn-outline-primary" href="signout.php">Log out</a>';

            // step 2: set card collection
            $card_collection_1 = "";
            $card_collection_2 = "";
            if (getenv('REQUEST_METHOD') == 'POST') {
                if (isset($_POST["upload_submit"])) {
                    $card_collection_1 = test_input($_POST["card_collection_1"]);
                    $card_collection_2 = test_input($_POST["card_collection_2"]);
                    if (empty($card_collection_1) || empty($card_collection_2)) {
                        // Do nothing
                    } else {

                        $_SESSION['cards_user'] = getCardsWithType($card_collection_1);
                        $_SESSION['cards_ai'] = getCardsWithType($card_collection_2);
                        $query = new pokemongoback_db();
                        $query -> card_delete_user_name($_SESSION['user_name']);
                        $query -> card_array_insert($_SESSION['cards_user'], $_SESSION['user_name']);
                        $query -> card_array_insert($_SESSION['cards_ai'], $_SESSION['user_name'], true);
                        header('Location: deck.php');
                    }
                }
            }else if(getenv('REQUEST_METHOD') == 'GET') {// update the current card collection
                //if (isset($_POST["action"])) {
                    
                //}
            }
        }else{
            header('Location: signin.php');
        }

        ?>
    </nav>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="row">
                <div class="col-md-6">
                    <?php
                    if (count($card_collection_user) != 0) {
                        echo "<table>";
                        foreach ($card_collection_user as $card) {
                            echo '<tr><td>' . $card->quantity . '</td><td>' . $card->name . '</td><td>' . $card->category . '</td><td>' . $card->hp . '</td><td>' . $card->type . '</td></tr>';
                        }
                        echo "</table>";
                    }
                    ?>
                </div>
                <div class="col-md-6">
                    <?php
                    if (count($card_collection_ai) != 0) {
                        echo "<table>";
                        foreach ($card_collection_ai as $card) {
                            echo '<tr><td>' . $card->quantity . '</td><td>' . $card->name . '</td><td>' . $card->category . '</td><td>' . $card->hp . '</td><td>' . $card->type . '</td></tr>';
                        }
                        echo "</table>";
                    }
                    ?>
                </div>
            </div>
        </div>
    </div<
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <form id="upload_form" action="collection.php" method="post">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="card_collection_1">User</label>
                        <textarea class="form-control" id="card_collection_1" name="card_collection_1"
                                  rows="10">
****** Pokémon Trading Card Game Deck List ******

##Pokémon - 30

* 2 Doduo GEN 55
* 1 Dodrio GEN 56
* 1 Meowth AOR 61
* 1 Meowth GEN 53
* 1 Persian GEN 54
* 2 Diglett GEN 38
* 1 Dugtrio GEN 39
* 2 Geodude GEN 43
* 1 Hitmonchan GEN 48
* 1 Hitmonlee GEN 47
* 3 Machop GEN 40
* 2 Machoke GEN 41
* 2 Espurr GEN 114
* 1 Meowstic GEN 115
* 2 Gastly GEN 33
* 1 Haunter GEN 34
* 2 Jirachi GEN 113
* 1 Jynx FFI 37
* 1 Slowpoke GEN 32
* 2 Zubat GEN 30

##Trainer Cards - 10

* 1 Wally GEN 127
* 1 Red Card GEN 71
* 2 Energy Switch GEN 61
* 1 Switch SUM 132
* 2 Pokémon Fan Club GEN 69
* 1 Shauna GEN 72
* 1 Poké Ball GEN 67
* 1 Floral Crown GEN 126

##Energy - 20

* 10 Psychic Energy TK-AlolanRaichu 20
* 10 Fighting Energy TK-Lycanroc 5

Total Cards - 60

****** Deck List Generated by the Pokémon TCG Online www.pokemon.com/TCGO ******</textarea>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="card_collection_2">AI</label>
                        <textarea class="form-control" id="card_collection_2" name="card_collection_2"
                                  rows="10">
****** Pokémon Trading Card Game Deck List ******

##Pokémon - 32

* 2 Glameow BKP 93
* 2 Purugly TK-PikachuLibre 19
* 3 Electabuzz TK-PikachuLibre 23
* 1 Electivire TK-PikachuLibre 25
* 1 Electrike TK-PikachuLibre 11
* 1 Manectric TK-PikachuLibre 13
* 1 Helioptile FLF 36
* 2 Pikachu GEN 26
* 1 Raichu GEN 27
* 2 Pikachu Libre TK-PikachuLibre 14
* 2 Ducklett TK-Suicune 24
* 2 Swanna TK-Suicune 27
* 2 Froakie BKT 46
* 2 Frogadier BKT 47
* 2 Goldeen TK-Suicune 26
* 2 Seaking TK-Suicune 25
* 1 Shellder GEN 19
* 1 Cloyster GEN 20
* 2 Suicune TK-Suicune 14

##Trainer Cards - 8

* 2 Potion BKP 106
* 3 Tierno BKP 112
* 1 Clemont GEN 59
* 1 Pokémon Center Lady GEN 68
* 1 Misty's Determination BKP 104

##Energy - 20

* 10 Lightning Energy Energy 4
* 10 Water Energy Energy 3

Total Cards - 60

****** Deck List Generated by the Pokémon TCG Online www.pokemon.com/TCGO ******</textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" name="upload_submit">Submit</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
