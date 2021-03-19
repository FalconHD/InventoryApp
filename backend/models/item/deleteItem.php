<?php
class DeleteItem {
    private $connection;
    private $table = "item";

    public $id;


    public function __construct($db){
        $this->connection = $db;
    }


    function delete() {
        $query = "DELETE FROM " .$this->table ." WHERE id = :id";
   

    $stmt = $this->connection->prepare($query);


    $stmt->bindParam(":id",$this->id);


   if( $stmt->execute()){
       return true;
   }else{
       return false;
   }
}

}
?>