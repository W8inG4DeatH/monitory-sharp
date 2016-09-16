<?php 
 
  $_POST = json_decode(file_get_contents('php://input'), true);
  $user = $_POST['data'];
 
  $id = $user[0];
  $email = $user[1];
  $password = $user[2];
  $first_name = $user[3];
  $last_name = $user[4];
  $street = $user[5];
  $city_code = $user[6];
  $city = $user[7];
  $phone = $user[8];
  $admin = $user[9];
  $state = $user[10];
  $activation = $user[11];
  $data = $user[12];
  $nick = $user[13];

?>

<?php require 'config-mysql.php'; ?>

<?php

  $tab_name = "users";

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
  mysql_connect("$servername", "$db_username", "$db_password")or die("cannot connect"); 
  mysql_select_db("$db_name")or die("cannot select DB");
  mysql_query('SET NAMES utf8');

  // Insert data into mysql 
  $sql="UPDATE $tab_name SET email='$email', password='$password', first_name='$first_name', last_name='$last_name', street='$street', city_code='$city_code', city='$city', phone='$phone', state='$state', activation='$activation', data='$data', nick='$nick' WHERE id='$id'";
  $result=mysql_query($sql);

  // close connection 
  mysql_close();

?>

<?php require 'config-email.php'; ?>

<?php

  $client_ip = $_SERVER['REMOTE_ADDR'];

  // MESSAGE to USER
  $topic_for_user = "Your Account on ".$domain." is activated";
  $message_for_user = '<html>'.
  '<body>'.
  '<p>Welcome '.$nick.'.</p>'.
  '<p>Your Account on '.$domain.' is activated.</p>'.
  '<p>Details:</p>'.  
  '<p>E-mail/Login: '.$email.
  '<br>Password: '.$password.
  '<br>First name: '.$first_name.
  '<br>Last name: '.$last_name.
  '<br>Street: '.$street.
  '<br>City code: '.$city_code.
  '<br>City: '.$city.
  '<br>Phone: '.$phone.'</p>'.
  '<br>Thank you for Account registration.</p>'.
  '<p>'.$domain.'</p>'.  
  '</body>'.
  '</html>';
  $header_for_user  = "MIME-Version: 1.0\r\n";
  $header_for_user .= "Content-type: text/html; charset=UTF-8\r\n";
  $header_for_user .= "From: $admin_email\r\n";
  $header_for_user .= "Reply-To: $admin_email\r\n";

  // MESSAGE to ADMIN
  $topic_for_admin = "User activation on ".$domain;
  $message_for_admin = '<html>'.
  '<body>'.
  '<p>Details:</p>'.  
  '<p>E-mail/Login: '.$email.
  '<br>Password: '.$password.
  '<br>First name: '.$first_name.
  '<br>Last name: '.$last_name.
  '<br>Street: '.$street.
  '<br>City code: '.$city_code.
  '<br>City: '.$city.
  '<br>Phone: '.$phone.'</p>'.
  '</body>'.
  '</html>';
  $header_for_admin  = "MIME-Version: 1.0\r\n";
  $header_for_admin .= "Content-type: text/html; charset=UTF-8\r\n";
  $header_for_admin .= "From: $admin_email\r\n";
  $header_for_admin .= "Reply-To: $email\r\n";
    
  mail($email, $topic_for_user, $message_for_user, $header_for_user);
  mail($copy_email, $topic_for_user, $message_for_user, $header_for_user);
  mail($admin_email, $topic_for_admin, $message_for_admin, $header_for_admin);
  mail($copy_email, $topic_for_admin, $message_for_admin, $header_for_admin);

?>