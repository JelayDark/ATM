<?php
require_once('../db.php');
require_once ('../request.php');

$db = new db();

$result = $db->db_request("SELECT 1_hundred, 2_hundred, 5_hundred, 1_thousand, 5_thousand FROM ATM WHERE id = 1111111111)");

if($result) {
    $answer = $result->fetch_assoc();
    $data->set_data($answer);
    $data->answer();
} else {
    echo $db->get_error();
}