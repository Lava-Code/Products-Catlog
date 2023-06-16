<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.attribute.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$productAttribute = new ProductAttribute($db);

// Product query
$result = $productAttribute->read();

// Get rows count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // Create products array
    $products_attributes_arr = array();
    $products_attributes_arr['data'] = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_attributes_props = array(
            'attribute_id' => $attribute_id,
            'unit_id' => $unit_id,
            'product_id' => $product_id,
            'unit_name' => $unit_name,
            'attribute_value' => $attribute_value,
            'measure_Unit' => $measure_Unit,
            'caption_end' => $caption_end

        );
        array_push($products_attributes_arr['data'], $product_attributes_props);
    }
    echo json_encode($products_attributes_arr);
} else {
    echo json_encode(
        array('message' => 'No Products Found!')
    );
}
