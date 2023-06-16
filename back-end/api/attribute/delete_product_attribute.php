<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

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

$productAttribute->product_id = $_GET['product_id'];

try {
    if ($productAttribute->delete()) {
        echo json_encode(
            array(
                'Message' => 'Product has been deleted successfully '
            )
        );
    }
} catch (Exception $e) {
    header('HTTP/1.1 400 Request failed!...Invaild Data');
    die();
}
