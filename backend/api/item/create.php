<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


    include_once '../../db/dbConnection.php';
    include_once '../../models/item/createItem.php';


    $database = new Database();
    $db = $database->connect();

    $item = new CreateItem($db);

    $data = json_decode(file_get_contents("php://input"));
    $item->NAME = $data->NAME;
    $item->description = $data->description;
    $item->price = $data->price;
    $item->expiration_Date = $data->expiration_Date;
    $item->brand = $data->brand;
    $item->category = $data->category;
    $item->stock = $data->stock;
    $item->user_id = $data->user_id;


    
    if($item->addItem()){
        return json_encode(
            array('message' => 'Item added')
        );
    }else{
        return json_encode(
            array('error' => 'Item failed')
        );
    }
