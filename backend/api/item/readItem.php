<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../../db/dbConnection.php';
    include_once '../../models/item/readItems.php';


   
    $database = new Database();
    $db = $database->connect();


    $read = new Read($db);


    $read->id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(array("error"=>"invalid parameter")));
    //get user 

    $read->readItem();


    //create array 
    if($read->NAME){
        

        $item = array(
            "item_id" => $read->id,
            "NAME" => $read->NAME,
            "description" => $read->description,
            "price" => $read->price,
            "expiration_Date" => $read->expiration_Date,
            "brand" => $read->brand,
            "category" => $read->category,
            "stock" => $read->stock,
            "user_id" => $read->user_id
        );

        echo json_encode($item);
    }else{
        echo json_encode(
            array('message' => 'no Posts Found')
        );
    }

    


?>
