<?php
require_once '../libs/swift-4.2.1/lib/swift_required.php';

if(((boolean) $_POST['name']) and ((boolean) $_POST['email']) and ((boolean) $_POST['message']))
{
	$body = 'Name: '.$_POST['name']."\n\r";
	$body .= 'Email: '.$_POST['email']."\n\r";
	$body .= 'Message: '.$_POST['message'];

	$username = 'AKIAJPIBV7XE7VVMSVMA';
	$password = 'AibQvqC5JEYQ8lpiXs95/nTRJWUOWK8PZaI2s9HMzcAt';

	$transport = Swift_SmtpTransport::newInstance('email-smtp.us-east-1.amazonaws.com', 465, 'ssl')
					->setUsername($username)
					->setPassword($password);

	$mailer = Swift_Mailer::newInstance($transport);

	$smessage = Swift_Message::newInstance();

	$smessage = Swift_Message::newInstance()
	  ->setSubject('Tchew.info - Contact Us')
	  ->setFrom(array('contact@tchew.info' => 'Tchew Web Design'))
	  ->setTo(array('contact@tchew.info', 'matthew@matthewhammond.net'))
	  ->setBody($body);

	try
	{
		$success = $mailer->send($smessage);
	}
	catch (Exception $e)
	{
		echo 0;
	}

	if ($success)
	{
		echo 1;
	}
	else
	{
		echo 0;
	}
}
else
{
	echo 0;
}