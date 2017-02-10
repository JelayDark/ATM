<?php

class admin {
    private $log;
    private $pass;
    private $authenticate;

    function admin () {
        $this->authenticate = false;
    }

    function set_log($log, $pass) {
        $this->log = $log;
        $this->pass = $pass;
    }

    function auth() {
        $this->authenticate = true;
    }

    function get_auth() {
        return $this->authenticate;
    }
}

$admin = new admin();

echo $admin->get_auth();