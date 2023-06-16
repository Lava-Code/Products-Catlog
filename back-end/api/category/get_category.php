<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


include_once '../../config/Database.php';
include_once '../../models/Category.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$category = new Category($db);

// Product query
$result = $category->read();

// Get rows count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // Create products array
    $category_arr = array();
    $category_arr['data'] = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $category_props = array(
            'type_id' => $type_id,
            'product_type' => $type_value,
            'type_desc' => $type_desc
        );
        array_push($category_arr['data'], $category_props);
    }
    echo json_encode($category_arr);
} else {
    echo json_encode(
        array('message' => 'No Category Found!')
    );
}
