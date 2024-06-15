<?php
// error_reporting(E_ALL);
// ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();
// var_dump($conn);

// print_r(json_decode(file_get_contents('php://input')));

$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $user=json_decode(file_get_contents('php://input'));
        $user_id=$user->id;
        // email check   
        // $user->otp !="" &&   
        if( $user->id != "") {
            $r_check="SELECT * FROM booking WHERE id=$user_id;";
            // echo($user_email);
            $stmt= $conn->prepare($r_check);
            $stmt->execute();
            $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $user_count=count($users);

                $data=[];
                if($user_count!=0){
                    // $active = 0;
                    $sql = "UPDATE booking SET status='CANCELLED' WHERE id = '$user_id';";                                         
                    $update = $conn->prepare($sql);
                    $update->execute();
                    $response=['status'=>200,'msg'=> 'Cancelled Succesfully!']; 
                }else{
                    $response=['status'=>400,'msg'=> 'Something went wrong!'];     
                } 
                
            }
        else{
            $response=['status'=> 0,'msg'=> 'No data found!'];
        }
        echo json_encode($response);
        // print_r($response);
        break;
}  
?>