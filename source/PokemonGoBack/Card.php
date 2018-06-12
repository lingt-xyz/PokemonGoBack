<?php
class Card{
	public $quantity = 0;
	public $name = "";
	public $category = "";
	public $hp = 0;
	public $type = "";
	public $is_ai = false;
	
	
	function __construct ($quantity, $name, $category, $hp, $type, $is_ai){
		$this->quantity = $quantity;
		$this->name = $name;
		$this->category = $category;
		$this->hp = $hp;
		$this->type = $type;
		$this->is_ai = $is_ai;
	}
}
?>