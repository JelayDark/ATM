<?php

class session {
    private $name;
    private $sername;
    private $card_number;
    private $cvv;
    private $exp;

    function set_card($card_number, $cvv, $exp) {
        $this->card_number = $card_number;
        $this->cvv = $cvv;
        $this->exp = $exp;
    }

    function get_card() {
        return array($this->card_number, );
    }
}

$session = new session();

//echo print_r($session);