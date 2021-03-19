<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../db/dbConnection.php';
include_once '../models/updateUserImage.php';

$database = new Database();
$db = $database->connect();

$user = new updateUserImage($db);
$user->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die( json_encode(array('error' => 'invalid Parameter')));
if (isset($_FILES["file"]) && isset($_GET['user_id'])) {

    if ($_FILES['file']['size'] > 1000000) {
        echo json_encode(array("message" => "Exceeded filesize limit."));
        exit;
    }

    $fileNameCmps = explode(".", $_FILES["file"]["name"]);
    $fileExtension = strtolower(end($fileNameCmps));

    if (in_array($fileExtension, array('jpg', 'png'))) {
        $uniqid = uniqid() . "." . time() . "." . $fileExtension;
        $target_file = "../uploads/" . $uniqid;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
            $user->profile_img = $target_file;
            $rs = $user->update();
            if ($rs) {
                echo json_encode(
                    array('message' => $target_file)
                );
            } else {
                echo json_encode(
                    array('error' => 'update failed')
                );
            }
            
            exit;
        } else {
            echo json_encode(array("message" => "Ooops!, There was some error"));
            exit;
        }
    } else {
        echo json_encode(array("message" => "file type not allowed"));
        exit;
    }
}
