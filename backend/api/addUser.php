<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../db/dbConnection.php';
include_once '../models/createUser.php';

$database = new Database();
$db = $database->connect();

$user = new CreateUser($db);

$data = json_decode(file_get_contents("php://input"));




  

$user->NAME = $data->NAME;
$user->email = $data->email;
$user->password = password_hash($data->password, PASSWORD_DEFAULT);
$result = $user->addUser();
if ($result) {
    print_r($result);
} else {
    print_r(json_encode(array('error' => 'Adding failed')));
}
