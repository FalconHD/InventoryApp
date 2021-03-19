<?php
class CreateItem
{
    private $connection;
    private $table = "item";

    public $NAME;
    public $description;
    public $price;
    public $expiration_Date;
    public $brand;
    public $category;
    public $stock;
    public $user_id;

    public function __construct($db)
    {
        $this->connection = $db;
    }


    function addItem(){
        $query = "INSERT INTO " .$this->table. "
        (NAME,description,price,expiration_Date,brand,category,stock,user_id) 
        VALUES 
        (:NAME,:description,:price,:expiration_Date,:brand,:category,:stock,:user_id)";

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':NAME', $this->NAME);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':expiration_Date', $this->expiration_Date);
        $stmt->bindParam(':brand', $this->brand);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':stock', $this->stock);
        $stmt->bindParam(':user_id', $this->user_id);


        if($stmt->execute()){
            return true;
        };


        printf("Error: %s.\n", $stmt->error);

        return false;

        



    }



}
?>