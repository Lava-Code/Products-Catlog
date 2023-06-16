<?php

class Product
{
    // DB stuf
    private $conn;
    private $table = 'products';

    // Table properties
    public $product_id;
    public $SKU;
    public $name;
    public $price;
    public $type_id;
    public $product_type;
    public $type_desc;
    public $label;

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
    t.type_value as product_type,
    p.product_id,
    p.SKU,
    p.name,
    p.price,
    p.type_id,
    t.type_desc,
    t.label
    
    FROM 
    ' . $this->table . ' p 
    LEFT JOIN
    product_type t ON p.type_id = t.type_id
    ORDER BY
    product_id DESC';

        // prepare stament
        $stmt = $this->conn->prepare($query);

        // Excute queery
        $stmt->execute();
        return $stmt;
    }

    // Get Single product
    public function read_single()
    {
        // Create query
        $query = ' SELECT 
        t.type_value as product_type,
        p.product_id,
        p.SKU,
        p.name,
        p.price,
        p.type_id
        FROM 
        ' . $this->table . ' p 
        LEFT JOIN
        product_type t ON p.type_id = t.type_id
        WHERE
        p.product_id = ?
        LIMIT 0,1';

        // prepare stament
        $stmt = $this->conn->prepare($query);

        // Bind Product_id
        $stmt->bindParam(1, $this->product_id);

        // Excute queery
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        // Set Properties
        $this->product_id = $row['product_id'];
        $this->SKU = $row['SKU'];
        $this->name = $row['name'];
        $this->price = $row['price'];
        $this->type_id = $row['type_id'];
        $this->product_type = $row['product_type'];
    }

    // Save product
    public function create()
    {
        $query = 'INSERT ' . $this->table . '
        SET
        SKU = :SKU,
        name = :name,
        price = :price,
        type_id = :type_id';

        $stmt = $this->conn->prepare($query);

        // Cleanup the data
        $this->SKU = htmlspecialchars(strip_tags($this->SKU));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->type_id = htmlspecialchars(strip_tags($this->type_id));

        // Bind the data
        $stmt->bindParam(':SKU', $this->SKU);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':type_id', $this->type_id);

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

        $query = 'DELETE FROM ' . $this->table . ' WHERE SKU = :SKU';

        $stmt = $this->conn->prepare($query);

        //$this->SKU = htmlspecialchars(strip_tags($this->SKU));

        $stmt->bindParam(':SKU', $this->SKU);


        if ($stmt->execute()) {
            return true;
        }

        return false;
        // Print error
        printf("Error: %. \n", $stmt->error);
    }
}
