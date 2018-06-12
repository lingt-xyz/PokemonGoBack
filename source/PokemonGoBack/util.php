<?php
$card_collection_user = array();
$card_collection_ai = array();

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function splitByNewLine($data){
	return explode("\n", $data);
}

function getCards($str){
	$card_collection = array();
	$data = explode("\n", $str);
	foreach($data as $row) {
		//echo $row;
		$pattern = "/\*\s+([0-9]{1,2})\s+(([a-zA-ZÀ-ÿ\-]+)|([a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+)|([a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+))\s+([\w\-]+)\s+([0-9]{1,})/";
		// group 1, group 2, group 6, group 7
		preg_match_all($pattern, $row, $matches, PREG_SET_ORDER);
		if(count($matches) == 0){
			continue;
		}
		//print_r($matches[0][1]. ' ' .$matches[0][2]. ' ' .$matches[0][6]. ' ' .$matches[0][7]);
		$card_collection[] = new Card($matches[0][1], $matches[0][2], $matches[0][6], $matches[0][7]);
	}
	return $card_collection;
}

function getCardsWithType($str){
	$card_collection = array();
	$data = explode("\n", $str);
	$type = "";
	foreach($data as $row) {
		if(!empty($row)){
			if(startsWith($row, "##Pokémon")){
				$type = "Pokémon";
			}else if(startsWith($row, "##Trainer")){
				$type = "Trainer";
			}else if(startsWith($row, "##Energy")){
				$type = "Energy";
			}else{
				$pattern = "/\*\s+([0-9]{1,2})\s+(([a-zA-ZÀ-ÿ\-]+)|([a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+)|([a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+\s+[a-zA-ZÀ-ÿ\-]+))\s+([\w\-]+)\s+([0-9]{1,})/";
				// group 1, group 2, group 6, group 7
				preg_match_all($pattern, $row, $matches, PREG_SET_ORDER);
				if(count($matches) == 0){
					continue;
				}
				//print_r($matches[0][1]. ' ' .$matches[0][2]. ' ' .$matches[0][6]. ' ' .$matches[0][7]);
				$card_collection[] = new Card($matches[0][1], $matches[0][2], $matches[0][6], $matches[0][7], $type);
			}
		}
	}
	return $card_collection;
}
?>