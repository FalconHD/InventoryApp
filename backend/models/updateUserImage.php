<?php
class updateUserImage
{
    private $connection;
    private $table = "admin";
    public $user_id;
    public $NAME;
    public $email;
    public $lasLogin;
    public $phone;
    public $address;
    public $profile_img;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function update()
    {
        $query = "UPDATE " . $this->table . "
        SET
            profile_img = :profile_img
            WHERE user_id = :user_id
            ";

        $stmt = $this->connection->prepare($query);

        
        $stmt->bindParam(':profile_img', $this->profile_img);
        $stmt->bindParam(':user_id', $this->user_id);


        if ($stmt->execute()) {
            return $stmt;
        };

        printf("Error: %s.\n", $stmt->error);

        return false;

    }

}
