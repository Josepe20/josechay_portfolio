<?php
  $receiving_email_address = 'chepechay16@gmail.com';

  function post_value($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
  }

  function clean_header_value($value) {
    return str_replace(array("\r", "\n"), '', $value);
  }

  function send_contact_email($receiving_email_address) {
    $name = post_value('name');
    $email = post_value('email');
    $subject = post_value('subject');
    $message = post_value('message');

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
      http_response_code(422);
      return 'Please complete all required fields.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      http_response_code(422);
      return 'Please provide a valid email address.';
    }

    $safe_name = clean_header_value($name);
    $safe_email = clean_header_value($email);
    $safe_subject = clean_header_value($subject);
    $safe_receiving_email = clean_header_value($receiving_email_address);

    $email_subject = 'Portfolio Contact: ' . $safe_subject;
    $email_body = "Name: {$safe_name}\n";
    $email_body .= "Email: {$safe_email}\n\n";
    $email_body .= "Message:\n{$message}\n";

    $headers = array(
      'From: Portfolio Contact <' . $safe_receiving_email . '>',
      'Reply-To: ' . $safe_name . ' <' . $safe_email . '>',
      'Content-Type: text/plain; charset=UTF-8',
      'X-Mailer: PHP/' . phpversion()
    );

    if (mail($receiving_email_address, $email_subject, $email_body, implode("\r\n", $headers))) {
      return 'OK';
    }

    http_response_code(500);
    return 'Unable to send email. Please try again later.';
  }

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed.';
    exit;
  }

  echo send_contact_email($receiving_email_address);
?>
