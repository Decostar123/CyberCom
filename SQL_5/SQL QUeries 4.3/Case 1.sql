show databases ; 
use task ;
drop table if exists orders ; 
drop table if exists users ; 
CREATE TABLE users (
    id INT PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    amount FLOAT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Insert 10 sample values into the 'users' table
INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES
(1, 'John Doe', 'john@example.com', 'password123', '2024-03-10 12:00:00', '2024-03-10 12:00:00'),
(2, 'Jane Smith', 'jane@example.com', 'password456', '2024-03-11 10:00:00', '2024-03-11 10:00:00'),
(3, 'Bob Johnson', 'bob@example.com', 'password789', '2024-03-12 08:00:00', '2024-03-12 08:00:00'),
(4, 'Alice Williams', 'alice@example.com', 'password123', '2024-03-13 08:00:00', '2024-03-13 08:00:00'),
(5, 'Michael Brown', 'michael@example.com', 'password456', '2024-03-14 09:00:00', '2024-03-14 09:00:00'),
(6, 'Sarah Miller', 'sarah@example.com', 'password789', '2024-03-15 10:00:00', '2024-03-15 10:00:00'),
(7, 'David Davis', 'david@example.com', 'password123', '2024-03-16 11:00:00', '2024-03-16 11:00:00'),
(8, 'Emily Jones', 'emily@example.com', 'password456', '2024-03-17 12:00:00', '2024-03-17 12:00:00'),
(9, 'James Wilson', 'james@example.com', 'password789', '2024-03-18 13:00:00', '2024-03-18 13:00:00'),
(10, 'Anna Taylor', 'anna@example.com', 'password123', '2024-03-19 14:00:00', '2024-03-19 14:00:00');

-- Insert 10 sample values into the 'orders' table
INSERT INTO orders (id, user_id, amount, created_at, updated_at) VALUES
(1, 1, 100.50, '2024-03-10 13:00:00', '2024-03-10 13:00:00'),
(2, 2, 200.75, '2024-03-11 11:00:00', '2024-03-11 11:00:00'),
(3, 3, 150.25, '2024-03-12 09:00:00', '2024-03-12 09:00:00'),
(4, 4, 120.00, '2024-03-13 13:00:00', '2024-03-13 13:00:00'),
(5, 5, 180.50, '2024-03-14 14:00:00', '2024-03-14 14:00:00'),
(6, 6, 150.75, '2024-03-15 15:00:00', '2024-03-15 15:00:00'),
(7, 7, 200.25, '2024-03-16 16:00:00', '2024-03-16 16:00:00'),
(8, 8, 170.90, '2024-03-17 17:00:00', '2024-03-17 17:00:00'),
(9, 9, 190.30, '2024-03-18 18:00:00', '2024-03-18 18:00:00'),
(10, 10, 220.60, '2024-03-19 19:00:00', '2024-03-19 19:00:00'),
(12, 10, 1000.60, '2024-02-10 19:00:00', '2024-02-10 19:00:00'),
(13, 10, 100.60, '2024-03-11 19:00:00', '2024-03-11 19:00:00');



insert into users (id, name, email, password, created_at, updated_at) values (
  11 , 'John Doe' , 'john.doe@example.com', '123456' ,  current_timestamp ,  current_timestamp
  );
  -- 1 
  update users users set password = '1234567' where id = 11 ; 
  select * from users;
  -- 2 
  select distinct a.name , a.email from users a join  orders b on a.id = b.user_id ; 

-- 3 

Select a.name , 
case 
	when sum(b.amount) is null then 0  
	else round( sum(b.amount) ,  2) 
end as total_amount_of_order
 from  users a  left join  orders b on a.id = b.user_id group by a.id  order by total_amount_of_order desc ; 
 
 -- 4 
 
 select a.email from users a  left join  orders b on a.id = b.user_id group by a.id  
 having( count(a.id) ) = (  select  count(c.user_id) as user_id_count from orders c  group by c.user_id order by user_id_count desc limit 1  )  ;

-- 5 

select a.id ,  round ( sum(b.amount) , 2 )  as totoal_orders_placed  from users a   join  orders b on a.id = b.user_id group by a.id having sum(b.amount) > 150  ;
 
 -- 6 
 
  select a.email from users a  left join  orders b on a.id = b.user_id where b.user_id is null ;
  
  -- 7 
  
  update users a set a.email = "jane.doe@example.com" where a.id = 1 ; 
  select * from users; 
  
  -- 8 
  delete from orders b where b.user_id in ( select a.id from users a where a.email like '%test%' ) ; 
  
  select * from orders ;
  
  -- 9 
  
  select DAYNAME( a.created_at ) as weekday  , round ( sum(b.amount) , 2) as sale_on_day_of_week
  from users a join  orders b on a.id = b.user_id 
  group by DAYNAME( a.created_at )  ; 
  
  -- 10 
  select   distinct a.id , a.email from users a   join  orders b 
  on a.id = b.user_id and  year(b.updated_at) =  year(current_timestamp )  and right(a.email , length( "example.com" ) ) ="example.com"   ; 
  