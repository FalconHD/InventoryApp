<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


    include_once '../db/dbConnection.php';
    include_once '../models/updateUser.php';


    $database = new Database();
    $db = $database->connect();

    $user = new UpdateUser($db);
    $user->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die( json_encode(array('error' => 'invalid Parameter')));
    $data = json_decode(file_get_contents("php://input"));
    
    $user->NAME = $data->NAME;
    $user->email = $data->email;
    $user->phone = $data->phone;
    $user->address = $data->address;


    
    if($user->update()){
        return json_encode(
            array('message' => 'User updated')
        );
    }else{
        return json_encode(
            array('error' => 'update failed')
        );
    }
