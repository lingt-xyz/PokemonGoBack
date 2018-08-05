<html lang="en">
  <head>
      <head>
          <?php
          $page_header = 'Update Deck';
          require_once("header.php");
          ?>
      </head>
  </head>
  <body class="text-center">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 class="my-0 mr-md-auto font-weight-normal">Upload Deck</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="collection.php?action=update">Update Collection</a>
	    <a class="p-2 text-dark" href="#">Update Deck</a>

            <?php
            require_once( 'util.php');
            require_once( 'db.php');

            if(!isset($_SESSION)){
                session_start();
            }

            // step 1: sign in
            if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
                echo '<a class="p-2 text-dark" href="#">' . $_SESSION['user_name'] . ' </a>';
                echo '<a class="btn btn-outline-primary" href="signout.php">Log out</a>';

                // step 2 deck
                $deck_1 = "";
                $deck_2 = "";
                if (getenv('REQUEST_METHOD') == 'POST') {
                    if (isset($_POST["update_submit"])) {
                        $deck_1 = test_input($_POST["deck_1"]);
                        $deck_2 = test_input($_POST["deck_2"]);
                        if (empty($deck_1) || empty($deck_2)) {
                            $_SESSION['deck_user'] = "";
                            $_SESSION['deck_ai'] = "";
                            //echo "<script>userOrder=null;aiOrder=null;alert('test');</script>";
                        } else {
                            $_SESSION['deck_user'] = splitByNewLine($deck_1);
                            $_SESSION['deck_ai'] = splitByNewLine($deck_2);
                        }
                        header('Location: /');
                    }
                }if (getenv('REQUEST_METHOD') == 'GET') {//update the current deck
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
				<form id="upload_form" action="deck.php" method="post">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="deck_1">User</label>
							<textarea class="form-control" id="deck_1" name="deck_1" rows="10">
51
52
53
58
44
43
33
32
57
57
34
35
33
33
45
46
28
31
46
47
29
57
58
57
57
55
58
56
58
58
58
57
48
57
57
38
58
58
34
36
37
54
39
52
41
49
50
37
58
39
40
40
57
47
36
30
58
54
57
30</textarea>
						</div>
						<div class="form-group col-md-6">
							<label for="deck_2">AI</label>
							<textarea class="form-control" id="deck_2" name="deck_2" rows="10">
25
3
16
1
25
4
5
6
6
14
25
26
25
25
7
20
8
10
25
9
3
9
11
7
26
26
12
25
26
8
14
12
13
2
1
26
25
25
26
26
17
19
15
2
20
26
17
20
18
18
26
26
22
23
24
11
21
13
21
25</textarea>
						</div>
					</div>
					<button type="submit" class="btn btn-primary" name="update_submit">Submit</button>
				</form>
			</div>
        </div>
    </div>
  </body>
</html>
