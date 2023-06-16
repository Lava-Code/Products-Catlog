<?php

class Category
{
    // DB stuf
    private $conn;
    private $table = 'product_type';

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
    t.type_id,
    t.type_value,
    t.type_desc

    FROM 
    ' . $this->table . ' t 
    ORDER BY
    t.type_id ASC';

        // prepare stament
        $stmt = $this->conn->prepare($query);

        // Excute queery
        $stmt->execute();
        return $stmt;
    }
}
