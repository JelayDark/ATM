<?php
require_once('../db.php');
require_once('../console/console.php');

if(isset($_POST['send'])) {

    if(isset($_POST['user']) && isset($_POST['password'])) {

        $name = json_encode($_POST['user']);
        $pass = json_encode($_POST['password']);

        $db = new db();

        $answer = $db->db_request("SELECT login, password FROM admin WHERE login = $name AND password = $pass");

        if($answer) {
            /*$result = $answer->fetch_assoc();
            echo print_r($result);*/

            /*$postdata = http_build_query(true);
            $opts = array('http' =>
                array(
                    'method' => 'post',
                    'header' => 'Content-type: application/x-www-form-urlencoded',
                    'content' =>$postdata,
                    'follow_location' => 1
                )
            );
            $context = stream_context_create($opts);
            $result = file_get_contents('http://mayst.paypress.pro/client/views', false, $context);*/


            /*$ss = curl_init();
            curl_setopt($ss, CURLOPT_URL, 'http://mayst.paypress.pro/client/views');
            curl_setopt($ss, CURLOPT_HEADER, 0);
            curl_setopt($ss, );*/

            $admin->auth();
            header('Location: /');

        } else {
            echo 'not result';
        }
    }
}