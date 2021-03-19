<?php
class CreateUser
{
    private $connection;
    private $table = "admin";

    public $NAME;
    public $email;
    public $password;
    public $lastLogin;
    public $phone;
    public $address;
    public $profile_img;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function addUser()
    {
        $query = 'INSERT INTO ' . $this->table . '
                SET
                    NAME = :NAME,
                    email = :email,
                    password = :password
                    ';

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':NAME', $this->NAME);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        // if ($stmt->execute()) {
        //     return json_encode(array("message" => "User added with success"));
        // }

        // // Print error if something goes wrong
        // if ($stmt->error->getMessage() == [23000]) {
        //     return json_encode(array("message" => "User already registred "));
        // }

        // return false;
        try{
            $stmt->execute();
            return json_encode(array("message" => "User added with success"));
        }catch (Throwable $e) {
            return  json_encode(array('error :' . $e->getMessage()));
         }
    }
}
