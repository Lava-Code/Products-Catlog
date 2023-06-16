<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
include_once '../../config/Database.php';
include_once '../../models/Product.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization');
    header("HTTP/1.1 200 OK");
    die();
}

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

$product->SKU = $data->SKU;
$product->name = $data->name;
$product->price = $data->price;
$product->type_id = $data->type_id;

try {
    if ($product->create()) {
        $Product_id = $db->lastInsertId();
        echo json_encode(
            array(
                'Message' => 'Product has been added successfully ',
                'Product_id' => $Product_id,

            )
        );
    }
} catch (Exception $err) {
    header('HTTP/1.1 400 Request failed!...Invaild Data ');
    echo ($err);
    die();
}
