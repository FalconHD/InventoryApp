<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../../db/dbConnection.php';
    include_once '../../models/item/readItems.php';


    $database = new Database();
    $db = $database->connect();


    $items = new Read($db);

    $result = $items->readItems();
    $num = $result->rowCount();

    if($num > 0){
        $items = array();
        $items['data'] = array();
        $items['total'] = $num;

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $item = array(
                "item_id"=>$id,
                "NAME" => $NAME,
                "description" => $description,
                "price" => $price,
                "expiration_Date" => $expiration_Date,
                "brand" => $brand,
                "category" => $category,
                "stock" => $stock,
                "user_id" => $user_id
            );

            array_push($items['data'],$item);
        }

        echo json_encode($items);
    }else{
        echo json_encode(
            array('message' => 'no Posts Found')
        );
    }



