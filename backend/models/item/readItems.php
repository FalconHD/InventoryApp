<?php
    class Read {
        private $connection;
        private $table = "item";
        public $id ;
        public $NAME;
        public $description;
        public $price;
        public $expiration_Date;
        public $brand;
        public $category;
        public $stock;
        public $user_id;

        public function __construct($db) {
            $this->connection = $db;
          }

          public function readItems(){
            $query = 'SELECT 
                i.id,
                i.NAME,
                i.description,
                i.price,
                i.expiration_Date,
                i.brand,
                i.category,
                i.stock,
                i.user_id
                FROM ' . $this->table . ' i';
        
                $stmt = $this->connection->prepare($query);
            // Execute query
            $stmt->execute();
            
            return $stmt;
            }

            public function readUserItems(){
                $query = 'SELECT 
                    i.id,
                    i.NAME,
                    i.description,
                    i.price,
                    i.expiration_Date,
                    i.brand,
                    i.category,
                    i.stock,
                    i.user_id
                    FROM ' . $this->table . ' i
                    WHERE 
                        i.user_id = ?';
            
                    $stmt = $this->connection->prepare($query);
    
                // Execute query
                $stmt->bindParam(1,$this->user_id);
                $stmt->execute();
                
                return $stmt;
                }


            public function readItem(){
                $query = 'SELECT
                    i.id, 
                    i.NAME,
                    i.description,
                    i.price,
                    i.expiration_Date,
                    i.brand,
                    i.category,
                    i.stock,
                    i.user_id
                    FROM ' . $this->table . ' i
                    WHERE 
                        i.id = ?
                    LIMIT 0,1
                            ';
            
            $stmt = $this->connection->prepare($query);
            
    
                
            //BIND ID 

            $stmt->bindParam(1,$this->id);
            $stmt->execute();


            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $this->id = $row['id'];
                $this->NAME = $row['NAME'];
                $this->description = $row['description'];
                $this->price = $row['price'];
                $this->expiration_Date = $row['expiration_Date'];
                $this->brand = $row['brand'];
                $this->category = $row['category'];
                $this->stock = $row['stock'];
                $this->user_id = $row['user_id'];
                return $stmt;
            }else{
                die(
                    json_encode(
                      array('error' => 'no Post Found')
                    ));
            }

            }


    
}
?>