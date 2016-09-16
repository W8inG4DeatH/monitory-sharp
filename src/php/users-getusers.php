<?php require 'config-mysql.php'; ?>

<?php

  $tab_name = "users";

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
  $conn = mysql_connect($servername, $db_username, $db_password);
  $dbs = mysql_select_db($db_name, $conn);
  mysql_query('SET NAMES utf8');

  //--------------------------------------------------------------------------
  // 2) Query database for data
  //--------------------------------------------------------------------------
  if(isset($_GET["id"])) {
    $id = $_GET['id'];
    $cmd = "SELECT * FROM $tab_name WHERE id = $id";
  } else if(isset($_GET["email"])) {
    $email = $_GET['email'];
    $cmd = "SELECT * FROM $tab_name WHERE email = $email";
  } else if(isset($_GET["activation"])) {
    $activation = $_GET['activation'];
    $cmd = "SELECT * FROM $tab_name WHERE activation = $activation";
  } else {
    $cmd = "SELECT * FROM $tab_name";
  }
  $result = mysql_query($cmd);          //query
  $data = array();
  while ( $row = mysql_fetch_row($result) )
  {
    $data[] = $row;
  }
  echo json_encode( $data );
  mysql_close($conn);

?>