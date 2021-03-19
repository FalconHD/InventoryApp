<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../db/dbConnection.php';
include_once '../models/Login.php';
include_once '../models/sales/newSellerDay.php';

$database = new Database();
$db = $database->connect();

$user = new Login($db);
$seller = new seller($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$user->password = $data->password;
$seller->dateTime = date("Y-m-d");

$result = $user->checkLogin();

$result?$seller->user_id = $result['user_id']:null;
$check = $seller->check();
$row = $check->fetch(PDO::FETCH_ASSOC);


//create array
if ($result) {
    if (!$row) {
        $seller->dateTime = date("Y-m-d");
        $seller->total_sales = 0;
        $seller->revenue = 0;
        $seller->user_id = $result['user_id'];
        $newDay = $seller->newDay();
    }

    print_r(json_encode(array("result" => $result, "row" => $row)));
} else {
    print_r(json_encode(array(
        "error" => "invalide password",
    )));
}
