<?php
class seller
{
    private $connection;
    private $sales = "sales";
    private $salesday = "salesday";

    //Sales variables
    public $dateTime;
    public $total_sales;
    public $revenue;
    public $user_id;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function newDay()
    {
        $query = 'INSERT INTO ' . $this->sales . '
        SET
            dateTime = :dateTime,
            total_sales = :total_sales,
            revenue = :revenue,
            user_id = :user_id
        ';

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':dateTime', $this->dateTime);
        $stmt->bindParam(':total_sales', $this->total_sales);
        $stmt->bindParam(':revenue', $this->revenue);
        $stmt->bindParam(':user_id', $this->user_id);

        $stmt->execute();
        return $stmt;
    }
    public function check()
    {
        $query = 'SELECT dateTime FROM ' . $this->sales . '
        WHERE user_id=:user_id AND dateTime=:dateTime;
        ';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":dateTime", $this->dateTime);
        $stmt->execute();
        return $stmt;
    }

    public function sellerSummary()
    {
        $query = 'SELECT day_id FROM ' . $this->sales . '
        WHERE user_id=:user_id AND dateTime=:dateTime;
        ';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":dateTime", $this->dateTime);

        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num > 0) {
            $sales = array();
            $sales['data'] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $query = 'SELECT * FROM ' . $this->salesday . '
                WHERE day_id=:day_id;
                ';

                $ids = $this->connection->prepare($query);
                $ids->bindParam(":day_id", $day_id);
                $ids->execute();
                $salesCount = $ids->rowCount();
                $sales['total'] = $salesCount;
                while ($res = $ids->fetch(PDO::FETCH_ASSOC)) {
                    extract($res);
                    $sale = array(
                        'Item_id' => $item_id,
                        'Quantity' => $quantity,
                        'cost' => $cost,
                        'time' => $time,
                        'day_id' => $day_id,
                    );
                    array_push($sales['data'], $sale);
                }
            }

            return $sales;
        } else {
            return array('message' => 'no sales Found');
        }

    }

    public function today()
    {
        $query = 'SELECT * FROM ' . $this->sales . '
    WHERE dateTime=:dateTime && user_id= :user_id
    ';

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":dateTime", $this->dateTime);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        return $res;
    }
}
