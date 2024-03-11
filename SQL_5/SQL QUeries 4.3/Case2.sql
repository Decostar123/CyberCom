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
select a.name, count(a.id)  orders_made   from users a join orders b on a.id = b.user_id group by a.id order by orders_made desc limit 10 ;

-- 2 

select  * from orders; 

select a.name , sum(b.amount) ,( select sum(c.amount) from orders c where c.user_id = b.user_d and   datediff( b.updated_at , INTERVAL 10 DAY)  ) from users a join orders b on a.id = b.user_id  group by a.id   ; 