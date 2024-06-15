<?php
error_reporting(E_ALL);
ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();
// var_dump($conn);

// print_r(json_decode(file_get_contents('php://input')));

//checking the datas gas recived from frontend ->it ll display in newteok->preview
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $user=json_decode(file_get_contents('php://input'));
            // echo $user->email;
            // echo(gettype($user));

            $user_name=$user->username;
            $user_email=$user->email;
            $user_phone=$user->phone;
            $user_password=$user->password;
            // $currentDateTime = date("Y-m-d H:i:s"); // Format: YYYY-MM-DD HH:MM:SS
            // echo "Current date and time is: " . $currentDateTime;

            if($user_name && $user_email && $user_phone && $user_password ){
            $sql= "INSERT INTO administrator(adminId, fullname, password, email, phone) 
            VALUES(null, :name, :password, :email, :phone )"; 

            $stmt = $conn->prepare($sql);
            $stmt->bindParam( ':phone', $user->phone);
            $stmt->bindParam( ':password', $user->password);
            $stmt->bindParam( ':name' , $user->username);
            $stmt->bindParam( ':email' , $user->email);
            
            if($stmt->execute()) {
                    $response=['status'=>200,'msg'=> 'Successfully Register'];
                    
            }else{
                $response=['status'=> 0,'msg'=> 'Somthing went wrong'];
            }
            echo json_encode($response);
            break;
        }
    }

?>