<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
      <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
      <meta content="utf-8" http-equiv="encoding">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">

	<link href="css/signin.css" rel="stylesheet">
	
    <title>Login</title>
  </head>
  <body class="text-center">

    <?php
        require_once( 'db.php');

        $user_name = "";
        $user_pwd = "";

        function test_input($data) {
          $data = trim($data);
          $data = stripslashes($data);
          $data = htmlspecialchars($data);
          return $data;
        }

        if (getenv('REQUEST_METHOD') == 'POST') {
          $user_name = test_input($_POST["username"]);
          $user_pwd = test_input($_POST["password"]);
          $query = new pokemongoback_db();
          if($query->user_query($user_name, $user_pwd)){
              if(!isset($_SESSION)){
                  session_start();
              }
              $_SESSION['user_name'] = $user_name;
              $_SESSION['logged_in'] = true;
              header('Location: /');
          }else{
              echo "Invalid login";
          }
        }else{
            ?>
            <form class="form-signin" action="login.php" method="post">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="username" class="sr-only">Username</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="Username: test" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Password: COMP354" required>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2018 - 2019</p>
            </form>
            <?php
        }
    ?>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>