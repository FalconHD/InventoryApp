<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../../db/dbConnection.php';
    include_once '../../models/sales/newSellerDay.php';


   
    $database = new Database();
    $db = $database->connect();


    $seller = new seller($db);
  

    $seller->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die( json_encode(array('error' => 'invalid Parameter')));
    $seller->dateTime = date("Y-m-d");
    //get user 

    $result = $seller->today();


    print_r(json_encode($result));

?>