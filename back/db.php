<?php

class db {

    private $connection;

    function __construct() {
        $this->connection = new mysqli('diana00.mysql.ukraine.com.ua', 'diana00_bankomat', 't53db9he', 'diana00_bankomat');

        if($this->connection->connect_errno) {
            echo 'Error: cant connect to DB. ' . $this->connection->connect_error;
        } else {
            //echo 'Connection is enable';
        }
    }

    function get_error() {
        return $this->connection->error;
    }

    function db_request($prompt) {
        return $this->connection->query($prompt);
    }

    function __destruct() {
        $this->connection->close();
    }
}


/*app.post("/getUser", function() {
    //logic ...

    return ...
    echo
})*/