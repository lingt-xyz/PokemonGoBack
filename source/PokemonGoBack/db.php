<?php

require_once ("Card.php");

define('DB_NAME', 'pokemongoback');
/** MySQL database username */
define('DB_USER', 'pokemongoback');
/** MySQL database password */
define('DB_PASSWORD', 'pokemongoback');
/** MySQL hostname */
define('DB_HOST', 'localhost');

class pokemongoback_db
{

    private $db_user = DB_USER;

    private $db_password = DB_PASSWORD;

    private $db_name = DB_NAME;

    private $db_host = DB_HOST;
    
    private $conn;
    private $db_connect_error;
    private $db_execute_result;

    /**
     * Sign up
     *
     * @param $user_name
     * @param $user_pwd
     * @return bool
     */
    public function user_insert($user_name, $user_pwd)
    {
        $this->db_connect();
        $sql_insert = "INSERT INTO USER (USER_NAME, USER_PWD) VALUES ('$user_name', '$user_pwd')";

        if ($this->conn->query($sql_insert) == TRUE) {
            $this->db_execute_result = true;

        } else {
            $this->db_execute_result = false;
            //$result_json['Result'] = "ERROR";
        }  
        $this->db_close();       
        return $this->db_execute_result;
    }

    /**
     * Validating sign in
     *
     * @param $user_name
     * @param $user_pwd
     * @return bool
     */
    public function user_query($user_name, $user_pwd)
    {
        $this->db_connect();

        $sql = "SELECT USER_NAME, USER_PWD FROM USER WHERE USER_NAME = '$user_name' AND USER_PWD = '$user_pwd'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    /**
     * Check the existence of $user_name
     * @param $user_name
     * @return bool
     */
    public function user_query_id($user_name)
    {
        $this->db_connect();

        $sql = "SELECT USER_NAME FROM USER WHERE USER_NAME = '$user_name'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    /**
     * Check whether $user_name has any card.
     * @param $user_name
     * @return bool
     */
    public function card_existence_query_id($user_name)
    {
        $this->db_connect();

        $sql = "SELECT USER_NAME FROM CARD WHERE USER_NAME = '$user_name'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    /**
     * Get all cards
     * @param $user_name
     * @return array
     */
    public function card_collection_query_user_name($user_name)
    {
        $cards = array();
        $this->db_connect();

        $sql = "SELECT QUANTITY, NAME, CATEGORY, HP, TYPE FROM CARD WHERE USER_NAME = '$user_name'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $cards[] = new Card($row["QUANTITY"], $row["NAME"], $row["CATEGORY"], $row["HP"], $row["TYPE"]);
            }
        }

        $this->db_close();

        return $cards;
    }

    public function card_delete_user_name($user_name)
    {
        $this->db_connect();

        $sql = "DELETE FROM CARD WHERE USER_NAME = '$user_name'";
        if ($this->conn->query($sql) == TRUE) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    public function card_array_insert($cards_user, $user_name, $is_ai = false)
    {
        $this->db_connect();

        $sql = "";
        foreach ($cards_user as $card){
            $card_quantity = $card -> quantity;
            $card_name = $card -> name;
            $card_category = $card->category;
            $card_hp = $card -> hp;
            $card_type = $card -> type;
            $sql .= "INSERT INTO CARD VALUES (DEFAULT, '$user_name', '$card_quantity', '$card_name', '$card_category', '$card_hp', '$card_type', '$is_ai');";
        }
        $sql = substr($sql, 0, strlen($sql) - 1);
        if ($this->conn->multi_query($sql) == TRUE) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    public function insert()
    {
        $this->db_connect();

        $sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')";

        if ($this->conn->query($sql) == TRUE) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }


    public function delete_by_id($id)
    {
        $this->db_connect();

        $sql = "DELETE FROM MyGuests WHERE id=3";
        if ($this->conn->query($sql) == TRUE) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }
        $this->db_close();
        return $this->db_execute_result;
    }

    public function update()
    {
        $this->db_connect();

        $sql = "UPDATE MyGuests SET lastname='Doe' WHERE id=2";

        if ($this->conn->query($sql) == TRUE) {
            $this->db_execute_result = true;
        } else {
            $this->db_execute_result = false;
        }

        $this->db_close();
    }

    public function query()
    {
        $this->db_connect();

        $sql = "SELECT id, firstname, lastname FROM MyGuests";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $this->db_execute_result = true;
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                echo "id: " . $row["id"] . " - Name: " . $row["firstname"] . " " . $row["lastname"] . "<br>";
            }
        } else {
            $this->db_execute_result = false;
        }

        $this->db_close();
    }

    private function db_connect()
    {
        $this->conn = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_name);
        // Check connection
        if ($this->conn->connect_error) {
            $this->db_connect_error = $this->conn->connect_error;
            return false;
        } else {
            $this->conn->set_charset('utf8');
            return true;
        }
    }

    private function db_close()
    {
        $this->conn->close();
    }
}
