
CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);
INSERT INTO inventory  VALUES
    (1, 'Laptop', 10, 899.99, 'electronics'),
    (2, 'Smartphone', 20, 599.99, 'electronics'),
    (3, 'Tablet', 15, 349.99, 'electronics'),
    (4, 'Smartwatch', 30, 199.99, 'electronics'),
    (5, 'Headphones', 25, 149.99, 'electronics');
    
    
select * from inventory where category = 'electronics' and quantity > 0 order by price desc ; 
    
    
