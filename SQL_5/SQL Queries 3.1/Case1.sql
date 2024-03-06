drop table customers;
CREATE TABLE customers (
    id SERIAL PRIMARY KEY ,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP 
);

INSERT INTO customers (name, email, created_at) VALUES
    ('John Smith', 'johnsmith@gmail.com', '2022-01-01 10:00:00'),
    ('Jane Doe', 'janedoe@yahoo.com', '2022-01-02 11:00:00'),
    ('Bob Johnson', 'bobjohnson@hotmail.com', '2022-01-03 12:00:00'),
    ('Sarah Lee', 'sarahlee@gmail.com', '2022-01-04 13:00:00'),
    ('David Kim', 'davidkim@yahoo.com', '2022-01-05 14:00:00');


-- 1 
select * from customers where right(email, length('@gmail.com') ) = '@gmail.com' ; 

-- 2 , group by can causeproblem ,in case of multipoleminimum 
select * from customers where created_at = ( select min(created_at) from customers) ;
	
-- 3, date is not working 
select * from customers where  created_at >='2022-01-03' ;

-- 4 
update   customers set email='davidkim@gmail.com' where id = 5 ; 


-- 5 
delete from customers where id =  2 ; 

-- 6 
select count(id) as "Total_Customers" from customers; 
select * from customers;
  

