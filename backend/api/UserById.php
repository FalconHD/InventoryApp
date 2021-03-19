<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../db/dbConnection.php';
    include_once '../models/read.php';


   
    $database = new Database();
    $db = $database->connect();


    $read = new Read($db);


    $read->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die( json_encode(array('error' => 'invalid Parameter')));
    //get user 

    $read->single();


    //create array 


    $user = array(
        'user_id' => $read->user_id,
        'NAME' => $read->NAME,
        'email' => $read->email,
        'phone' => $read->phone,
        'address' => $read->address,
        'profile_img' => $read->profile_img,
        'lastLogin' => $read->lastLogin 
    );



//make json 

print_r(json_encode($user));

?>
