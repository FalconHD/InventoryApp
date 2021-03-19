<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db/dbConnection.php';
include_once '../../models/sales/allsales.php';

$database = new Database();
$db = $database->connect();

$sellers = new seller($db);

$sellers->dateTime = date("Y-m-d");
//get user

$result = $sellers->days();

$days = array();
$days['data'] = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $day = array(
        "day_id" => $day_id,
        "dateTime" => $dateTime,
        "total_sales" => $total_sales,
        "revenue" => $revenue,
        "user_id" => $user_id
    );
    array_push($days['data'],$day);
}
print_r(json_encode($days));
