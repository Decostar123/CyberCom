drop database  if exists sales; 

CREATE DATABASE sales;


USE sales;


drop table if exists customers ; 
drop table if exists orders ; 
drop table if exists products; 
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    unit_price DECIMAL(10, 2),
    description TEXT
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20)
);


CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

 -- 1 

INSERT INTO customers (customer_id, first_name, last_name, email, phone) VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '456-789-0123'),
    (3, 'Michael', 'Johnson', 'michael.johnson@example.com', '789-012-3456'),
    (4, 'Emily', 'Brown', 'emily.brown@example.com', '012-345-6789'),
    (5, 'David', 'Wilson', 'david.wilson@example.com', '234-567-8901');


INSERT INTO products (product_id, product_name, unit_price, description) VALUES
    (1, 'Product A', 100.00, 'Description for Product A'),
    (2, 'Product B', 115.00, 'Description for Product B'),
    (3, 'Product C', 200.00, 'Description for Product C'),
    (4, 'Product D', 25.00, 'Description for Product D'),
    (5, 'Product E', 30.00, 'Description for Product E');


INSERT INTO orders (order_id, order_date, customer_id, product_id) VALUES
    (1, '2024-03-01', 1, 1),
    (2, '2024-03-02', 2, 2),
    (3, '2024-03-03', 3, 3),
    (4, '2024-03-04', 4, 4),
    (5, '2024-03-05', 5, 5),
    (6, '2024-03-06', 1, 2),
    (7, '2024-03-07', 2, 3),
    (8, '2024-03-08', 3, 4),
    (9, '2024-03-09', 4, 5),
    (10, '2024-03-10', 5, 1);
    
    -- 2 
    select a.first_name , a.last_name,a.email, count(a.customer_id) as number_of_orders from customers a  join orders b on a.customer_id = b.customer_id group by(b.customer_id) order by number_of_orders desc;
    
    -- 3 
    
    select b.product_name , count(a.order_id) , sum(b.unit_price) from orders a join products b on  a.product_id = b.product_id group by(b.product_id); 
    
    -- SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

    -- 4 
   --  select c.first_name, c.last_name, c.email , b.product_name from 
--     orders a join products b on a.product_id = b.product_id 
--     join customers c on a.customer_id = c.customer_id   
--     group by c.customer_id, c.first_name, c.last_name, c.email
--       having count(  a.order_id) >=2
--     ;
    
    SELECT c.first_name, c.last_name, c.email, GROUP_CONCAT( b.product_name  )
FROM orders a 
JOIN products b ON a.product_id = b.product_id 
JOIN customers c ON a.customer_id = c.customer_id 
GROUP BY c.customer_id
HAVING COUNT(a.order_id) >= 2;

-- SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

    -- 5 
-- subquery done     
	select c.first_name, c.last_name, c.email from customers c where  c.customer_id in ( 
 select a.customer_id from  orders a 
JOIN products b ON a.product_id = b.product_id and b.unit_price > 50 ) ;

-- tryig by join 
select distinct (c.first_name), c.last_name, c.email   from  orders a 
JOIN products b ON a.product_id = b.product_id and b.unit_price > 50
join customers c on c.customer_id = a.customer_id ;

-- 6 
select distinct b.product_id , b.product_name    from 
orders a 
JOIN products b ON a.product_id = b.product_id  group by( b.product_id) having count( a.product_id) >=2 