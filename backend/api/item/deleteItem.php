<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db/dbConnection.php';
include_once '../../models/item/deleteItem.php';

$database = new Database();
$db = $database->connect();

$item = new DeleteItem($db);


$item->id = isset($_GET["id"]) ? $_GET["id"] : die(json_encode(array("error"=>"invalid Parameter")));


if($item->delete()){
    return json_encode(array(
        "message" => "item deleted"
    ));
}else {
    return json_encode(array(
        "error"=>"item not deleted"
    ));
}



?>
