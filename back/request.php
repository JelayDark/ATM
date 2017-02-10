<?php

class request {

    private $data;

    function request() {
        if(isset($_POST)) {
            $this->data = $_POST;
        } else {
            echo 'Request is not valid';
        }
    }

    function get_data() {
        return $this->data;
    }

    function set_data($data) {
        $this->data = $data;
    }

    function answer() {
        $answer = ($this->data) ? $this->data : '';
        echo json_encode($answer);
    }
}