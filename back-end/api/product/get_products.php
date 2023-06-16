<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$product = new Product($db);

// Product query
$result = $product->read();

// Get rows count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // Create products array
    $products_arr = array();
    $products_arr['data'] = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_props = array(
            'product_id' => $product_id,
            'SKU' => $SKU,
            'name' => $name,
            'price' => $price,
            'type_id' => $type_id,
            'product_type' => $product_type,
            'type_desc' => $type_desc,
            'label' => $label,

        );
        array_push($products_arr['data'], $product_props);
    }
    echo json_encode($products_arr);
} else {
    echo json_encode(
        array('message' => 'No Products Found!')
    );
}
