<?php 

// TODO

class Card {
    public function __construct($line_number,$card_name,$card_type)
    {
        this->$line_number=$line_number;
        this->$card_name=$card_name;
        this->$card_type=$card_type;
    }
    
}

class Pokemon extends Card {
     public function __construct($card_id,$card_name,$card_type,$cardStage,$cardBasic,$property,$hp,$retreat,$attacks)
    {
        // call Card's constructor
        parent::__construct($card_id,$card_name,$card_type);
         this->$cardStage=$cardStage;
         this->$cardBasic=$cardBasic;
         this->$property=$property;
         this->$hp=$hp;
         this->$retreat=$retreat;
         this->$attacks=$attacks;
    }
    
}

class Trainer extends Card {
    public function __construct($card_id,$card_name,$card_type,$trainer_type,$ability_index)
    {
        // call Card's constructor
        parent::__construct($card_id,$card_name,$card_type);
        this->$trainer_type=$trainer_type;
        this->$ability_index=$ability_index;
    }
    
}

class Energy extends Card {
    public function __construct($card_id,$card_name,$card_type,$energy)
    {
        // call Card's constructor
        parent::__construct($card_id,$card_name,$card_type);
        this->$energy=$energy;
    }
    
}
?> 
