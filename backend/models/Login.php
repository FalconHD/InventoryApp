<?php
class Login
{
    private $connection;
    private $table = "admin";

    //Admin variables
    public $NAME;
    public $email;
    public $password;
    public $lastLogin;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function checkLogin()
    {
        $query = 'SELECT
            a.user_id,
            a.NAME,
            a.password,
            a.email,
            a.lastLogin,
            a.phone,
            a.address,
            a.profile_img
          FROM ' . $this->table . ' a
          WHERE
            a.email = ?
          LIMIT 0,1
                  ';

        try {
            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(1, $this->email);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($this->password, $row['password'])) {
                $res = array(
                    "user_id" => $row['user_id'],
                    "NAME" => $row['NAME'],
                    "email" => $row['email'],
                    "phone" => $row['phone'],
                    "address" => $row['address'],
                    "profile_img" => $row['profile_img'],
                );
                //updating Last Login
                $query = 'UPDATE ' . $this->table . ' SET lastLogin = ? WHERE email = ?';
                $this->lastLogin = date("Y-m-d H:i:s");
                $stmt = $this->connection->prepare($query);
                $stmt->bindParam(1, $this->lastLogin);
                $stmt->bindParam(2, $this->email);
                $stmt->execute();

                // $query = 'UPDATE ' . $this->table . ' SET lastLogin = ? WHERE email = ?';
                // $this->lastLogin = date("Y-m-d H:i:s");
                // $stmt = $this->connection->prepare($query);
                // $stmt->bindParam(1, $this->lastLogin);
                // $stmt->bindParam(2, $this->email);
                return $res;

            }
        } catch (Throwable $th) {
            return json_encode(array($th->getMessage()));
        }

    }

}
