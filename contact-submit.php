<?php
require_once __DIR__ . '/functions.php';
if($_SERVER['REQUEST_METHOD']==='POST'){csrf_check();$name=trim((string)($_POST['name']??''));$email=filter_var(trim((string)($_POST['email']??'')),FILTER_VALIDATE_EMAIL);$subject=trim((string)($_POST['subject']??''));$message=trim((string)($_POST['message']??''));if($name!==''&&$email&&$subject!==''&&$message!==''){db()->prepare('INSERT INTO messages(name,email,subject,message) VALUES(?,?,?,?)')->execute([$name,$email,$subject,$message]);$_SESSION['contact_sent']=true;}header('Location: contact.php');exit;}
