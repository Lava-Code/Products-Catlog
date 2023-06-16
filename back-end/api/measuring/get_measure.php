<?php
// Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Measuring.php';

// Instantiate DB object && connection
$database = new Database();
$db = $database->connect();

//Instantiate products object
$measuring = new Measuring($db);

// Product query
$result = $measuring->read();

// Get rows count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // Create products array
    $units_arr = array();
    $units_arr['data'] = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $units_props = array(
            'unit_id' => $unit_id,
            'type_id' => $type_id,
            'unit_name' => $unit_name,
            'measure_unit' => $measure_unit,
        );
        array_push($units_arr['data'], $units_props);
    }
    echo json_encode($units_arr);
} else {
    echo json_encode(
        array('message' => 'No Units Found!')
    );
}
