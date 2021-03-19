<?php
class seller
{
    private $connection;
    private $salesday = "salesday";
    private $sales = "sales";

    //Sales variables
    public $dateTime;
    public $total_sales;
    public $revenue;
    public $user_id;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function sellersSummary()
    {
        $query = 'SELECT day_id FROM ' . $this->sales . '
        WHERE dateTime=:dateTime;
        ';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":dateTime", $this->dateTime);

        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num > 0) {
            $sales = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $query = 'SELECT * FROM ' . $this->salesday . '
                WHERE day_id=:day_id;
                ';

                $ids = $this->connection->prepare($query);
                $ids->bindParam(":day_id", $day_id);
                $ids->execute();
                $sales[$day_id] = array();
                $salesCount = $ids->rowCount();
               
                while ($res = $ids->fetch(PDO::FETCH_ASSOC)) {
                    extract($res);
                    $sale = array(
                        'Item_id' => $item_id,
                        'Quantity' => $quantity,
                        'cost' => $cost,
                        'time' => $time,
                        'day_id' => $day_id,
                    );
                    array_push($sales[$day_id], $sale);
                }
            }

            return $sales;
        } else {
            return array('message' => 'no sales Found');
        }

    }

    public function days()
    {
        $query = 'SELECT * FROM ' . $this->sales . '
    WHERE dateTime=:dateTime
    ORDER BY revenue
    ';

        $result = $this->connection->prepare($query);
        $result->bindParam(":dateTime", $this->dateTime);
        $result->execute();
 
        
        return $result;

    }
}
