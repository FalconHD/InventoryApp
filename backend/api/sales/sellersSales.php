<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../../db/dbConnection.php';
    include_once '../../models/sales/allsales.php';


   
    $database = new Database();
    $db = $database->connect();


    $seller = new seller($db);


    
    $seller->dateTime = date("Y-m-d");
    //get user 

    $result = $seller->sellersSummary();


    print_r(json_encode($result));

?>
