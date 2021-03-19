<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


    include_once '../../db/dbConnection.php';
    include_once '../../models/sales/newSale.php';


    $database = new Database();
    $db = $database->connect();


    $user = new Sale($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->user_id = $data->user_id;
    $user->dateTime = date("Y-m-d");
    $user->quantity = $data->quantity;
    $user->item_id = $data->item_id;

    $result = $user->addSale();
    if($result){
        print_r(json_encode($result));
    }else{
        print_r(json_encode(array("error"=>"no samury for this user today")));
    }

    


?>