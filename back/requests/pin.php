<?php
require_once('../db.php');
require_once ('../request.php');
require_once('../session.php');

$db = new db();
$data = new request();

$recieved_data = $data->get_data();
$card_number = $session->get_card();
$CVV = $recieved_data['cvv'];
$exp = json_encode($recieved_data['exp1'] . '/' . $recieved_data['exp2']);

$result = $db->db_request("SELECT PIN FROM cards WHERE number = $card_number AND CVV = $CVV AND exp = $exp AND PIN = $PIN)");

if($result) {
    $answer = $result->fetch_assoc();
    $data->set_data($answer);
    $data->answer();
} else {
    echo $db->get_error();
}