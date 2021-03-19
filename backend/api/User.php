<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    include_once '../db/dbConnection.php';
    include_once '../models/read.php';


    $database = new Database();
    $db = $database->connect();


    $read = new Read($db);

    $result = $read->Read();
    $num = $result->rowCount();



    if($num > 0){
        $users = array();
        $users['data'] = array();
        $users['total'] = $num;

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $user = array(
                'user_id' => $user_id,
                'NAME' => $NAME,
                'email' => $email,
                'phone' => $phone,
                'address' => $address,
                'profile_img' => $profile_img,
                'lastLogin' => $lastLogin 
            );

            array_push($users['data'],$user);
        }

        echo json_encode($users);
    }else{
        echo json_encode(
            array('message' => 'no Posts Found')
        );
    }



?>