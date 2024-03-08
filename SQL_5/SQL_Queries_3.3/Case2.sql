
drop table employees ; 

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    salary INTEGER
);
INSERT INTO employees (id, name, age, salary)
VALUES
    (1, 'John', 35, 60000),
    (2, 'Mary', 27, 50000),
    (3, 'Peter', 42, 75000),
    (4, 'Olivia', 29, 55000),
    (5, 'Michael', 38, 80000);
    


-- 1

select * from employees ; 

-- 2
select name , salary from employees  where salary > 60000 ;

-- 3
select id from employees where name='Peter' ; 
update employees set age= 43 where id =3 ; 
update employees set age= 43 where id in ( select id from employees where name='Peter')  ; 
-- update employees set age= 43 where id in ( select id from employees where name='Peter')  ; 

-- 4
delete from employees where id=4 ;

-- 5 
select avg(salary) as avg_salary from employees ;

-- 6 
select name , age from employees where age in ( select max(age) from employees ) ;  

-- 7 
select name , age from employees where age in ( select min(age) from employees ) ;  

-- 8 
select name  from employees where salary in ( select max(salary) from employees ) ;  