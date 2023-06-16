<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}
include_once '../../config/Database.php';
include_once '../../models/Product.attribute.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$productAttribute = new ProductAttribute($db);

$data = json_decode(file_get_contents("php://input"));
$productAttribute->product_id = $data->product_id;
$productAttribute->unit_id = $data->unit_id;
$productAttribute->attribute_value = $data->attribute_value;


try {
    if ($productAttribute->create()) {
        echo json_encode(
            array(
                'Message' => 'Product attribute has been added successfully ',
            )
        );
    }
} catch (Exception $e) {
    header('HTTP/1.1 400 Request failed!...Invaild Data');
    die();
}
