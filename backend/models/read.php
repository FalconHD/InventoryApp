<?php
    class Read {
        private $connection ;
        private $table = "admin";



        public $user_id;
        public $NAME;
        public $email;
        public $lasLogin;
        public $phone;
        public $address;
        public $profile_img;

        public function __construct($db) {
            $this->connection = $db;
          }

        public function read(){
            $query = 'SELECT 
                a.user_id,
                a.NAME,
                a.email,
                a.lastLogin,
                a.phone,
                a.address,
                a.profile_img
                FROM ' . $this->table . ' a';
        
        $stmt = $this->connection->prepare($query);

      // Execute query
      $stmt->execute();
      
      return $stmt;
    }
//Single User Reader ================================>
    public function single(){
      $query = 'SELECT 
          a.user_id,
          a.NAME,
          a.email,
          a.lastLogin,
          a.phone,
          a.address,
          a.profile_img
          FROM ' . $this->table . ' a 
          WHERE 
            a.user_id = ?
          LIMIT 0,1
                  ';

            $stmt = $this->connection->prepare($query)?$this->connection->prepare($query):die(
              json_encode(
                array('error' => 'no User Found')
              ));

          

        // Execute query


        //BIND ID 

        $stmt->bindParam(1,$this->user_id);
        $stmt->execute();


        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->user_id = $row['user_id'];
        $this->NAME = $row['NAME'];
        $this->email = $row['email'];
        $this->phone = $row['phone'];
        $this->address = $row['address'];
        $this->profile_img = $row['profile_img'];
        $this->lastLogin = $row['lastLogin'];

      }
    }



    
?>