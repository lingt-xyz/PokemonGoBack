<?php
class Card{
	public $quantity = 0;
	public $name = "";
	public $category = "";
	public $hp = 0;
	public $type = "";
	
	
	function __construct ($quantity, $name, $category, $hp, $type){
		$this->quantity = $quantity;
		$this->name = $name;
		$this->category = $category;
		$this->hp = $hp;
		$this->type = $type;
	}
}
?>