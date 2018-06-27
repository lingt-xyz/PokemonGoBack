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
        require_once('db.php');

        if (!isset($_SESSION)) {
            session_start();
        }

        // step 1: ensure the user has signed in
        if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
            echo '<a class="p-2 text-dark" href="#">' . $_SESSION['user_name'] . ' </a>';
            echo '<a class="btn btn-outline-primary" href="signout.php">Log out</a>';

            // step 2: set card collection
            $card_collection = "";
            if (getenv('REQUEST_METHOD') == 'POST') {
                if (isset($_POST["upload_submit"])) {
                    $card_collection = test_input($_POST["card_collection"]);
                    if (empty($card_collection)) {
                        // Do nothing
                    } else {
                        echo "<script>cardString= " + "$card_collection"+";initCardCollection();</script>";
                        header('Location: /');
                    }
                }
            }else if(getenv('REQUEST_METHOD') == 'GET') {
                // from index.php jumped to this page to update the current card collection
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
                    <div class="form-group col-md-12">
                        <label for="card_collection">User</label>
                        <textarea class="form-control" id="card_collection" name="card_collection"
                                  rows="10"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" name="upload_submit">Submit</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
