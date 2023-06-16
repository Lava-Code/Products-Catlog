<?php
// Header
header('Access-Control-Allow: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$product = new Product($db);


// Get the ID From URL

$product->product_id = isset($_GET['product_id']) ? $_GET['product_id'] : die();


// Get product
$product->read_single();

// Create An array of product
$product_arry = array(
    'product_id' => $product->product_id,
    'SKU' => $product->SKU,
    'name' => $product->name,
    'price' => $product->price,
    'type_id' => $product->type_id,
    'product_type' => $product->product_type
);
print_r(json_encode($product_arry));
