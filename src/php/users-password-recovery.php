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

<?php require 'config-email.php'; ?>

<?php

  $client_ip = $_SERVER['REMOTE_ADDR'];

  // MESSAGE to USER
  $topic_for_user = "Your Password on ".$domain;
  $message_for_user = '<html>'.
  '<body>'.
  '<p>Hello '.$nick.'.</p>'.
  '<p>Your Account '.$email.' on '.$domain.' has following Password:</p>'.
  '<p>'.$password.'</p>'.  
  '<p>Best Regards.</p>'.
  '<p>'.$domain.'</p>'.  
  '</body>'.
  '</html>';
  $header_for_user  = "MIME-Version: 1.0\r\n";
  $header_for_user .= "Content-type: text/html; charset=UTF-8\r\n";
  $header_for_user .= "From: $admin_email\r\n";
  $header_for_user .= "Reply-To: $admin_email\r\n";

  // MESSAGE to ADMIN
  $topic_for_admin = "User password recovery on ".$domain;
  $message_for_admin = '<html>'.
  '<body>'.
  '<p>Details:</p>'.  
  '<p>E-mail/Login: '.$email.
  '<br>Nick: '.$nick.
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