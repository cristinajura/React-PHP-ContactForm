<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || $_POST['nickname']) {
    die();
    }
        
    if ($_POST) {

      http_response_code(200);
	   $to = "parapanta.transilvania@gmail.com"; 
	   $subject = "Message from: ".filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	   $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
      $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_NUMBER_INT);
      $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

      $emailformat = <<<MSG
      E-mail: $email
      Telephone: $phone
      Message: 
      $message
      MSG;
     wordwrap($emailformat, 70, '\r\n');

     $headers = [
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=utf8',
        'X-Mailer' => 'PHP/' . phpversion()
        ];
     $header = implode('\r\n', $headers);

	 mail($to, $subject, $emailformat, $header);
   }
?>

    

   

	 
       