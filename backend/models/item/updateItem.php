<?php
class UpdateItem
{
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

    public function __construct($db)
    {
        $this->connection = $db;
    }


    function update(){
        $query = "UPDATE " .$this->table. " 
        SET
            NAME = :NAME,
            description = :description,
            price = :price,
            expiration_Date = :expiration_Date,
            brand = :brand,
            category = :category,
            stock = :stock,
            user_id = :user_id
            WHERE id = :id
            ";

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':NAME', $this->NAME);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':expiration_Date', $this->expiration_Date);
        $stmt->bindParam(':brand', $this->brand);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':stock', $this->stock);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':id', $this->id);


        if($stmt->execute()){
            return true;
        };


        printf("Error: %s.\n", $stmt->error);

        return false;

        



    }



}
?>