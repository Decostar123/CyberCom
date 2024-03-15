use task   ; 
-- 0	33	16:19:19	drop table if exists orders	Error Code: 3730. Cannot drop table 'orders' referenced by a foreign key constraint 'product_returns_ibfk_1' on table 'product_returns'.	0.000 sec
-- alter table product_returns drop foreign key product_returns_ibfk_1 ; -- 
drop table if exists category ; 
drop table if exists orders ; 
drop table if exists product_returns ;
drop table if exists orders ; 
 drop table if exists users ; 
 drop table if exists orders ; 
 drop table if exists product ;
 
-- Create the "orders" table
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
   
    user_city varchar(100) 
  
);
CREATE TABLE category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) 
    
);
CREATE TABLE product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255) , 
    product_price int , 
    category_id int references category(category_id) 
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
   
    order_date DATE , 
    product_id int , 
    user_id int , 
     FOREIGN KEY (product_id) REFERENCES product(product_id)
);
INSERT INTO category (category_id, category_name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Books'),
(4, 'Home and Kitchen');


INSERT INTO product (product_id, product_name , product_price , category_id ) VALUES
(1, 'Laptop' , 20 ,1 ),
(2, 'Smartphone' , 30 ,1 ),
(3, 'Tablet' , 40 ,1 ),
(4, 'TV', 50 , 1 ),
(5, 'Headphones' , 60 , 2) , 
(6, 'TShirt' , 150 , 2 ) 
;
INSERT INTO users (user_id, user_name, user_email, user_city ) VALUES
(1, 'John Doe', 'john@example.com',"USA"),
(2, 'Jane Smith', 'jane@example.com', 'Canada'),
(3, 'Bob Johnson', 'bob@example.com', 'USA') ;


-- Insert sample values into the "orders" table
INSERT INTO orders (order_id, order_date , product_id , user_id)
VALUES
    (1, '2023-01-15' , 6 ,3 ),
    (2, '2023-02-20' ,  5 , 2 ),
    (3, '2023-03-10', 4 , 2 ),
    (4, '2023-04-05', 6 , 1 );

-- Create the "returns" table
CREATE TABLE product_returns (
    return_id INT PRIMARY KEY,
    order_id INT,
  
    return_date DATE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert sample values into the "returns" table
INSERT INTO product_returns (return_id, order_id, return_date)
VALUES
    (1, 2, '2023-02-25'),
    (2, 3,  '2023-03-15');


-- Insert more sample values into the "orders" table
INSERT INTO orders (order_id, order_date ,  product_id , user_id )
VALUES
    (5, '2023-05-12' ,1 , 2  ),
    (6, '2023-06-08' , 2 , 1  ),
    (7, '2023-07-20' , 3 ,  3  );

-- Insert more sample values into the "returns" table
INSERT INTO product_returns (return_id, order_id, return_date)
VALUES
    (3, 4, '2023-04-15'),
    (4, 6, '2023-06-20'),
    (5, 7, '2023-07-25');


select * from product_returns ; 
select * from orders ; 

-- 1 
-- Write a SQL query to retrieve the names of all customers who have made at 
-- least one order in the "orders" table and have not made any orders in the 
-- "returns" table

select b.user_name from orders a join users b  on a.user_id= b.user_id  where order_id not in (  select order_id from  product_returns  )  ; 

-- 2.
--	Write a SQL query to retrieve the names of all customers who have made orders 
-- in the "orders" table and have returned at least one item in the "returns" table.
select   b.user_name from orders a join users b  on a.user_id= b.user_id  where order_id   in (  select order_id from  product_returns  )  ; 

-- 3 
-- Write a SQL query to retrieve the names of all customers who have made orders in the "orders"
-- table and have not returned any items in the "returns" table.

-- SAME AS FISRT QUESTONS 

-- 4.	
-- Write a SQL query to retrieve the names of all customers who have made orders 
-- in the "orders" table and have returned more items than they have ordered.

-- HOW CAN PERSON NRETUEN MORE ITEM THAN THEY HAVE ORDERED ? 

 

-- 5 
-- Write a SQL query to retrieve the names of all customers who have made
-- orders in the "orders" table and have not returned more items than they have ordered.

-- ERROR IN THE CODE , NEED TO INCLUDE THE MAIN FIELD OUTSIDE IF WANT TO USE IT INSIDE 
-- OR JUST MODIFY THE CODE 
-- select a.user_id , count(a.user_id) as products_ordered 
--  from orders a group by a.user_id 
--  having count(a.user_id) > ( select count(b.order_id) from product_returns b  where b.order_id = a.order_id  )   ; 

 SELECT a.user_id,  u.user_name 
FROM orders a join users u on a.user_id = u.user_id 
GROUP BY a.user_id
HAVING COUNT(a.user_id) > (
    SELECT COUNT(b.order_id)
    FROM product_returns b
    WHERE b.order_id IN (SELECT c.order_id FROM orders c WHERE c.user_id = a.user_id)
);

-- 6
select * from product_returns ;
select * from orders ;  
-- Write a SQL query to retrieve the names of all customers who have made orders
--  in the "orders" table and have spent more than $100 in total on all orders.
select u.user_id , u.user_name ,  sum(b.product_price)  total_order_price  from 
orders a join 
users u 
on a.user_id = u.user_id 
join product b  
on a.product_id = b.product_id   
 where  a.order_id not in ( select c.order_id from product_returns c )  
 group by u.user_id  having total_order_price > 100
 ; 
 
 --  7 
  
-- Write a SQL query to retrieve the names of all customers who have made orders 
-- in the "orders" table and have spent more than $100 in total on all orders, sorted 
-- by the total amount spent in descending order.

select u.user_id , u.user_name ,  sum(b.product_price)  total_order_price  from 
orders a join 
users u 
on a.user_id = u.user_id 
join product b  
on a.product_id = b.product_id   
 where  a.order_id not in ( select c.order_id from product_returns c )  
 group by u.user_id  having total_order_price > 100 
 order by total_order_price desc 
 ; 
  -- 8
 -- Write a SQL query to retrieve the names of all customers who have made orders
 -- in the "orders" table and have ordered products in all categories.
 select * from orders ;
 -- select * from orders  ; 
 select * from product  ; 
 -- select * from categories ; 
 select    a.user_id , b.user_name 
 from
 orders a join users b
 on a.user_id = b.user_id  
 join product p on a.product_id = p.product_id 
 join category c  on p.category_id = c.category_id 
 group by a.user_id
 having count(  distinct  p.category_id ) =  (  select count(*) from category )    ; 
 

  
-- 9.	
-- Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table
--  and have not ordered products in all categories.
select    a.user_id , b.user_name 
 from
 orders a join users b
 on a.user_id = b.user_id  
 join product p on a.product_id = p.product_id 
 join category c  on p.category_id = c.category_id 
 group by a.user_id
 having count(  distinct  p.category_id ) <  (  select count(*) from category )    ; 
 

 
 -- 10 
 -- Write a SQL query to retrieve the names of all customers who have made orders in the "orders" 
 -- table and have ordered products in at least two different categories.
 select    a.user_id , b.user_name 
 from
 orders a join users b
 on a.user_id = b.user_id  
 join product p on a.product_id = p.product_id 
 join category c  on p.category_id = c.category_id 
 group by a.user_id
 having count(   distinct p.category_id ) >= 2     ; 
 
 