<?php
/**
 * Created by PhpStorm.
 * User: ling
 * Date: 03/06/18
 * Time: 12:48 PM
 */

session_start();
session_destroy();
header('Location: signin.php');
?>