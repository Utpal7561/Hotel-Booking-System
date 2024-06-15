<?php
error_reporting(E_ALL);
ini_set("display_errors",1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('DbConnect.php');
$objDb = new DbConnect;
$conn=$objDb->connect();

// print_r(json_decode(file_get_contents('php://input')));
$method= $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        // $user=json_decode(file_get_contents('php://input'));
        $sql="SELECT * FROM reservation ";
        $stmt= $conn->prepare($sql);
        $stmt->execute();
        $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $user_count=count($users);
            $data=[];
            $dataB=[];
            $dataC=[];
            if($user_count!==0){
                $sqlB="SELECT * FROM booking";
                $stmtB= $conn->prepare($sqlB);
                $stmtB->execute();
                $usersB=$stmtB->fetchAll(PDO::FETCH_ASSOC);
                $user_countB=count($usersB);
                if($user_countB!==0){
                    foreach($usersB as $x){
                        $t=[]; 
                        $t['bid']=$x['id'];
                        $t['cid']=$x['cid'];
                        $t['status']=$x['status'];
                        $t['notes']=$x['notes'];
                        $dataB[]=$t;
                    }
                }

                $sqlC="SELECT * FROM customer";
                $stmtC= $conn->prepare($sqlC);
                $stmtC->execute();
                $usersC=$stmtC->fetchAll(PDO::FETCH_ASSOC);
                $user_countC=count($usersC);
                if($user_countC!==0){
                    foreach($usersC as $x){
                        $t=[]; 
                        $t['cid']=$x['cid'];
                        $t['fullname']=$x['fullname'];
                        $t['email']=$x['email'];
                        $t['phone']=$x['phone'];
                        $dataC[]=$t;
                    }
                }

                 foreach ($users as $x) {
                    $t=[]; 
                    $t['id']=$x['id'];
                    $t['start']=$x['start'];
                    $t['end']=$x['end'];
                    $t['type']=$x['type'];
                    $t['adults']=$x['adults'];
                    $t['children']=$x['children'];
                    $t['timestamp']=$x['timestamp'];
                    $t['requests']=$x['requests'];
                    $data[]=$t;
                }
            echo json_encode(['data'=>$data,'datab'=>$dataB, 'datac'=>$dataC]);
             }else{
            $response=['status'=>200,'msg'=> 'Data not Fetch!']; 
            }
            // Check if the query was successful
            // echo json_encode($response);
            break;
    }
?>