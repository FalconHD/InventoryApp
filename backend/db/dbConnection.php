<?php 
   class Database{
    private $host = 'localhost';
       private $db_name = 'env';
       private $username = "root";
       private $password = "youssef";
       private $connection ;


       public function connect(){
           $this->connection = null ;
           try{
                $this->connection = new PDO('mysql:host=' .$this->host . ';dbname=' . $this->db_name , $this->username , $this->password);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           }catch(PDOException $error) {
                echo 'Connection error : ' .$error->getMessage();
           };
           return $this->connection;
       }
   }
