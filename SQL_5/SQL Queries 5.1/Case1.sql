show databases ; 
use task ;
ALTER TABLE Employee DROP FOREIGN KEY employee_ibfk_1;

drop table if exists Department ; 
drop table if exists orders ; 
drop table if exists users ; 
drop table if exists Employee  ;

CREATE TABLE Department (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

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

CREATE TABLE Employee (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);
INSERT INTO Department (id, name) VALUES
(1, 'HR'),
(2, 'Finance'),
(3, 'Marketing'),
(4, 'Operations'),
(5, 'IT');


INSERT INTO Employee (id, name, salary, department_id) VALUES
(1, 'John', 50000, 1),    
(2, 'Alice', 60000, 2),   
(3, 'Bob', 45000, 3),    
(4, 'Emily', 70000, 4),    
(5, 'Michael', 55000, 5);  
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


-- 3 
select  * from orders; 

select a.id , a.name , sum(b.amount) 
, 
( select sum(c.amount) from orders c where c.user_id = b.user_id and   30 >= datediff(  CURRENT_TIMESTAMP ,  b.updated_at  )  ) as last_30_days

from users a join orders b on a.id = b.user_id  group by a.id   ; 

-- 4 

select * from Employee a  where a.salary > ( select avg( b.salary )  from Employee b  ) order by a.salary desc  ; 

-- 5
 
select b.name  from orders a join users b on a.user_id = b.id where exists (  select  1 from orders c where c.user_id = a.user_id and 90 <  DateDiff(current_timestamp , c.updated_at)  ) ; 

-- 6 

select a.name , a.salary from Employee a join Department b on a.department_id = b.id where a.salary > ( select min( b.salary) from Employee b )
 order by b.id desc , a.salary desc    ;
 
-- 7 

WITH RankedEmployees AS (
    SELECT   
        a.name,
        a.salary,
        a.department_id,
        ROW_NUMBER() OVER (PARTITION BY a.department_id ORDER BY a.salary DESC) AS department_rank
    FROM 
        Employee a 
    JOIN 
        Department b ON a.department_id = b.id
)

SELECT
    name,
    salary
  
FROM
    RankedEmployees  a 
WHERE
    a.department_rank <= 5
ORDER BY
    department_id,
    salary DESC;


-- 8 

select a.name from users a  where a.id in ( select b.id from orders b where b.amount > 150 )   ; 

-- 9 

-- select a.name , sum(b.amount) , avg(b.amount)  from users a join orders b on a.id = b.user_id  group  by a.name ;

select a.name , sum(b.amount) , avg(b.amount)  from users a join orders b on a.id = b.user_id  group  by a.id ; 
-- 10 

select * from orders; 