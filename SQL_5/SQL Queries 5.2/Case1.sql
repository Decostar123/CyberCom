ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_2;

drop table if exists product ; 
drop table if exists category ;


 

drop table if exists orders ;
drop table if exists users ;

drop table if exists sales_man ; 

 CREATE TABLE sales_man (
    sales_man_id INT PRIMARY KEY,
    sales_man_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    sales_man_city varchar(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255)
);
CREATE TABLE product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    sales_man_id int ,
    
    amount FLOAT,
    created_at TIMESTAMP,
    shipping_city varchar(100),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(product_id), 
    FOREIGN KEY (sales_man_id) REFERENCES sales_man(sales_man_id)
);

INSERT INTO sales_man (sales_man_id, sales_man_name, email, password, created_at, updated_at , sales_man_city ) VALUES
(1, 'Rahul Kumar', 'rahul@example.com', 'password123', '2024-03-10 12:00:00', '2024-03-10 12:00:00' , 'cityG'),
(2, 'Priya Patel', 'priya@example.com', 'password456', '2024-03-11 10:00:00', '2024-03-11 10:00:00' , 'cityH'),
(3, 'Deepak Sharma', 'deepak@example.com', 'password789', '2024-03-12 08:00:00', '2024-03-12 08:00:00' , 'cityA'),
(4, 'Neha Gupta', 'neha@example.com', 'password123', '2024-03-13 08:00:00', '2024-03-13 08:00:00' , 'cityB'),
(5, 'Rajesh Singh', 'rajesh@example.com', 'password456', '2024-03-14 09:00:00', '2024-03-14 09:00:00' , 'cityC' ) ;
INSERT INTO category (category_id, category_name) VALUES
(1, 'Electronics'),
(2, 'Appliances'),
(3, 'Accessories') , 
(4, 'clothing') 


;

INSERT INTO product (product_id, product_name, category_id) VALUES
(1, 'Laptop', 1),
(2, 'Smartphone', 1),
(3, 'Tablet', 1),
(4, 'TV', 2),
(5, 'Headphones', 3) , 
(6, 'TShirt', 4) 

;

INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES
(1, 'John Doe', 'john@example.com', 'password123', '2024-03-10 12:00:00', '2024-03-10 12:00:00'),
(2, 'Jane Smith', 'jane@example.com', 'password456', '2024-03-11 10:00:00', '2024-03-11 10:00:00'),
(3, 'Bob Johnson', 'bob@example.com', 'password789', '2024-03-12 08:00:00', '2024-03-12 08:00:00') ;


INSERT INTO orders (order_id, user_id, product_id ,sales_man_id,  amount, created_at , shipping_city) VALUES
(1, 1, 1, 3, 1500.00, '2024-03-10 13:00:00' ,  'cityA' ),
(2, 2, 2, 4,800.00, '2024-03-11 11:00:00' , 'cityB'),
(3, 3, 3, 2,500.00, '2024-03-12 09:00:00' , 'cityC' ),
(4, 1, 4, 2,2000.00, '2024-03-13 13:00:00' , 'cityD' ),
(5, 2, 5, 5,100.00, '2024-03-14 14:00:00' , 'cityA' ),
(6, 3, 1, 3,1200.00, '2024-03-15 15:00:00', 'cityD'),
(7, 1, 2, 2,700.00, '2024-03-16 16:00:00' , 'cityB'),
(8, 2, 3, 1,300.00, '2024-03-17 17:00:00' , 'cityA' ),
(9, 3, 4, 2,1800.00, '2024-03-18 18:00:00' , 'cityA' ),
(10, 1, 5, 5,50.00, '2024-03-19 19:00:00', 'cityB'), 
(11, 3, 6,2, 500.00, '2023-03-12 09:00:00' , 'cityD'),
(12, 1, 6, 3,2000.00, '2023-03-13 13:00:00' , 'cityC'),
(13, 2, 6, 2,100.00, '2023-03-14 14:00:00' , 'cityB'),
(14, 3, 6, 5,1200.00, '2023-03-15 15:00:00' , 'cityC') ; 

select * from users ;



--  1
-- Write a SQL query to retrieve the names of all customers who have placed 
-- orders for products in the "Electronics" category, along with the total amount they 
-- have spent on all orders. The output should be sorted by the total amount spent in descending order.


select a.name , sum(b.amount) as total_amount_on_orders from 
users a join orders b on a.id = b.user_id 
join product c on b.product_id = c.product_id 
join category d on c.category_id = d.category_id and d.category_name = "Electronics"

group by a.id , a.name  ; 

 
-- 2 

-- Write a SQL query to retrieve the names of all employees who have sold at
-- least one product in the "Clothing" category, along with the total revenue they have 0
-- generated from those sales. The output should be sorted by total revenue generated in descending order.


select  d.sales_man_name , sum(a.amount) as revenue_generated from
 orders a join product b 
 on a.product_id = b.product_id 
 join category c
 on b.category_id = c.category_id and c.category_name = 'clothing' 
 join sales_man d
 on a.sales_man_id = d.sales_man_id 
 group by d.sales_man_id , d.sales_man_name
 order by revenue_generated  desc ; 

 
-- 3
-- Write a SQL query to retrieve the names of all customers who have placed orders
-- for products in both the "Electronics" and "Clothing" categories. The output should
-- only include customers who have ordered products in both categories.
select b.name , group_concat( distinct( lower(d.category_name))) as categories_ordered from 
orders a join users b
 on a.user_id = b.id  
 join product c
 on  a.product_id = c.product_id 
 join category d on c.category_id = d.category_id group by b.id , b.name  having 
 categories_ordered like  "%Electronics%" and categories_ordered like  "%Clothing%" ; 
 
 -- 4.
 -- Write a SQL query to retrieve the names of all employees who have sold at least one product
 -- to a customer who has a shipping address in the same city as the employee. The output should 
 -- only include employees who have made at least one such sale.
 
 select * from sales_man ;
 select  d.sales_man_id , d.sales_man_name,  d.sales_man_city  from 
 orders a join product b 
 on a.product_id = b.product_id 
 join category c
 on b.category_id = c.category_id
 join sales_man d
 on a.sales_man_id = d.sales_man_id 
 and  a.shipping_city = d.sales_man_city 
 group by  d.sales_man_id , d.sales_man_name ;
 
 -- 5 
 -- Write a SQL query to retrieve the names of all customers who have placed 
 -- orders for products in the "Electronics" category, but have never placed
 -- an order for products in the "Clothing" category.
 
 -- INTERSECT WILL ACT LIKE MINUS 
 
 -- 1 way 
 select distinct  u.id , u.name  from 
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join category c
 on b.category_id = c.category_id and c.category_name = 'Electronics' 
 and ( u.id , u.name ) not in  
 (
  select u.id , u.name  from 
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join category c
 on b.category_id = c.category_id and c.category_name = 'Clothing');
 
--  2 way 
 SELECT u.id, u.name  
FROM users u 
JOIN orders a ON u.id = a.user_id 
JOIN product b ON a.product_id = b.product_id 
JOIN category c ON b.category_id = c.category_id 
WHERE c.category_name = 'Electronics'
EXCEPT
SELECT u.id, u.name  
FROM users u 
JOIN orders a ON u.id = a.user_id 
JOIN product b ON a.product_id = b.product_id 
JOIN category c ON b.category_id = c.category_id 
WHERE c.category_name = 'Clothing';

-- 6 

-- Write a SQL query to retrieve the names of all employees who have sold at
--  least one product to customers who have placed orders for products in the "Electronics" category,
--  but have never placed an order for products in the "Clothing" category. The output should only 
-- include employees who have made at least one such sale.
 
select c.sales_man_id , c.sales_man_name from 
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join sales_man c on  a.sales_man_id = c.sales_man_id 
 join category d
 on b.category_id = d.category_id and d.category_name = 'Electronics' where 
 
 ( c.sales_man_id , c.sales_man_name) not in
 (
select c.sales_man_id , c.sales_man_name from 
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join sales_man c on  a.sales_man_id = c.sales_man_id 
 join category d
 on b.category_id = d.category_id and d.category_name = 'Clothing'  
 ) 
 
 ; 
-- 7.	
-- Write a SQL query to retrieve the names of all customers who have
--  placed orders for more than five different products in the "Electronics" category.

select u.id , u.name    from  
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join sales_man c on  a.sales_man_id = c.sales_man_id 
 join category d
 on b.category_id = d.category_id and d.category_name = 'Electronics' group by u.id 
 having count(  distinct(b.product_id)  ) >  5  ;
 
 -- 8 
 
 -- Write a SQL query to retrieve the names of all employees who have sold products to customers
 -- who have placed orders for more than five different products in the "Electronics" category.
 -- The output should only include employees who have made at least one such sale.
 
select c.sales_man_id , c.sales_man_name     from  
 users u join  
 orders a on u.id = a.user_id join product b 
 on a.product_id = b.product_id 
 join sales_man c on  a.sales_man_id = c.sales_man_id 
 join category d
 on b.category_id = d.category_id  and d.category_name = 'Electronics' group by c.sales_man_id , c.sales_man_name   having count(u.id) > 5 ;
