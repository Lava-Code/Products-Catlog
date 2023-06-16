<?php

class Measuring
{
    // DB stuf
    private $conn;
    private $table = 'measuring_units';

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get products
    public function read()
    {
        // Create query
        $query = ' SELECT 
        m.unit_id,
        m.type_id,
        m.unit_name,
        m.measure_unit

    FROM 
    ' . $this->table . ' m 
    ORDER BY
    m.unit_id DESC';

        // prepare stament
        $stmt = $this->conn->prepare($query);

        // Excute queery
        $stmt->execute();
        return $stmt;
    }
}
