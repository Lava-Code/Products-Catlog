<?php

class ProductAttribute
{
    // DB stuf
    private $conn;
    private $table = 'product_attributes';

    // Table properties
    public $product_id;
    public $unit_id;
    public $attribute_value;

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
    m.unit_name as measuring_units,
    att.product_id,
    att.attribute_id,
    att.unit_id,
    att.attribute_value,
    m.unit_name,
    m.measure_Unit,
    m.caption_end
    
    FROM 
    ' . $this->table . ' att 
    LEFT JOIN
    measuring_units m ON att.unit_id = m.unit_id
    ORDER BY
    att.attribute_id';

        // prepare stament
        $stmt = $this->conn->prepare($query);

        // Excute queery
        $stmt->execute();
        return $stmt;
    }


    //Save attribute
    public function create()
    {
        $query = 'INSERT ' . $this->table . '
        SET
        product_id = :product_id,
        unit_id = :unit_id,
        attribute_value = :attribute_value';


        $stmt = $this->conn->prepare($query);

        // Cleanup the data
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->unit_id = htmlspecialchars(strip_tags($this->unit_id));
        $this->attribute_value = htmlspecialchars(strip_tags($this->attribute_value));

        // Bind the data
        $stmt->bindParam(':product_id', $this->product_id);
        $stmt->bindParam(':unit_id', $this->unit_id);
        $stmt->bindParam(':attribute_value', $this->attribute_value);


        if ($stmt->execute()) {
            return true;
        }

        return false;
        // Print error
        printf("Error: %. \n", $stmt->error);
    }


    // Delete product
    public function delete()
    {

        $query = 'DELETE FROM ' . $this->table . ' WHERE product_id = :product_id';

        $stmt = $this->conn->prepare($query);

        $this->product_id = htmlspecialchars(strip_tags($this->product_id));

        $stmt->bindParam(':product_id', $this->product_id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
        // Print error
        printf("Error: %. \n", $stmt->error);
    }
}
