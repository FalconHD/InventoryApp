<?php
class Sale
{
    private $connection;
    private $sales = "sales";
    private $salesday = "salesday";
    private $item = "item";

    public $day_id;
    public $dateTime;
    public $total_sales;
    public $revenue;
    public $user_id;
    public $quantity;
    public $cost;
    public $item_id;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function addSale()
    {

        $query2 = 'SELECT price FROM ' . $this->item . '
        WHERE id=:item_id ;
        ';

        $stmt = $this->connection->prepare($query2);

        $stmt->bindParam(":item_id", $this->item_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->cost = $row['price'] * $this->quantity;
        $query = 'SELECT day_id FROM ' . $this->sales . '
        WHERE user_id=:user_id AND dateTime=:dateTime;
        ';
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":dateTime", $this->dateTime);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->day_id = $res['day_id'] ? $res['day_id'] : null;
        //next
        $query = 'INSERT INTO ' . $this->salesday . '
                SET
                    quantity = :quantity,
                    cost = :cost,
                    item_id = :item_id,
                    day_id = :day_id';

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':item_id', $this->item_id);
        $stmt->bindParam(':day_id', $this->day_id);
        $stmt->bindParam(':cost', $this->cost);

        $stmt->bindParam(':day_id', $this->day_id);
        if ($this->day_id && $stmt->execute()) {
            $query = 'SELECT total_sales,revenue FROM ' . $this->sales . '
            WHERE day_id = :day_id';
            $stmt = $this->connection->prepare($query);

            $stmt->bindParam(":day_id", $this->day_id);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->total_sales = $res['total_sales'] + $this->quantity;
            $this->revenue = $res['revenue'] + $this->cost ;

            //updating quantity and revenue

            $query = 'UPDATE ' . $this->sales . '
            SET
            total_sales = :total_sales,
            revenue = :revenue
            WHERE day_id = :day_id';

            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(':total_sales', $this->total_sales);
            $stmt->bindParam(':day_id', $this->day_id);
            $stmt->bindParam(':revenue', $this->revenue);

            $stmt->execute();
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

}
