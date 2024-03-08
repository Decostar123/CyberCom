-- drop table employees ; 
-- drop  table departments; 
-- drop table managers ;
-- drop table dependent ;  
-- drop table  employees_dependent; 

CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
INSERT INTO managers (manager_id, first_name, last_name)
VALUES
    (1, 'John', 'Doe'),
    (2, 'David', 'Wilson'), 
    (3, 'Jane', 'Doe'),      
    (4, 'Emily', 'Wilson'); 
    
    
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department_id INT,
     title VARCHAR(100), 
    salary DECIMAL(10, 2),
     hire_date DATE,
     manager_id int , 
    FOREIGN KEY (department_id) REFERENCES departments(department_id) , 
    foreign key (manager_id) references  managers(manager_id) 
);
INSERT INTO departments (department_id, department_name)
VALUES
    (1, 'Human Resources'),
    (2, 'Marketing'),
    (3, 'Finance'),
    (4, 'IT');

INSERT INTO employees (employee_id, first_name, last_name, department_id, title, salary ,  hire_date , manager_id )
VALUES
    (1, 'John', 'Doe', 1, 'Project Manager', 50000.00 , '2020-01-15' ,1  ),
    (2, 'Jane', 'Smith', 1, 'HR Manager', 55000.00 , '2019-05-20' ,2 ),
    (3, 'Michael', 'Johnson', 2, 'Senior Software Engineer', 60000.00 ,  '2021-03-10', 3 ),
    (4, 'Emily', 'Brown', 2, 'Marketing Manager', 62000.00 , '2022-07-05' , 4 ),
    (5, 'David', 'Wilson', 3, 'Finance Manager', 70000.00 , '2023-02-18',1 ),
    (6, 'Sarah', 'Taylor', 3, 'Product Manager', 72000.00 ,'2022-11-30', 2 ),
    (7, 'Robert', 'Jones', 4, 'IT Manager', 80000.00 ,  '2020-01-15' , 3),
    (8, 'Emma', 'Lee', 4, 'Software Developer', 85000.00 ,  '2023-02-18' , 4  ) ; 
    

insert into employees values ( 9  ,'Decoatar' , 'Sharma' , 4, 'Software Developer' , 100000 ,  '2024-02-18' , 1 ) ;  


create table dependent(
  dependent_id int primary key  , 
  dependent_first_name varchar(100)  , 
  dependent_last_name varchar(100)  , 
  dependent_age int  
) ;
insert into dependent values 
( 1 , 'david' , 'sharma' , 24 ) ,
 (2 , 'Robert', 'Jones', 14 ) , 
 (3 , 'deepak' , 'sharma' , 22 ) , 
 (4,  'raj' , 'bansal' , 18) , 
 ( 5 , 'rahul' , 'saksena' , 70) , 
 ( 6 , 'priya' , 'bansal' , 35 ) 
 ; 
 
 create table employees_dependent ( 
 entryID int primary key , 
 employee_id int ,
 dependent_id int  , 
 
 foreign key (employee_id) references employees(employee_id) , 
 
 foreign key (dependent_id) references dependent(dependent_id) 
 )  ; 
 
 insert into employees_dependent values
 ( 1 , 8 , 1 ) , 
 ( 2 , 7 , 2 ) ,
 ( 3 , 6 , 3 ) ,
 ( 4 , 8 , 5 ) , 
 ( 5 , 6 , 1 ) ,
 ( 6 , 3 , 6 ) 
 ;






-- 1
select first_name , last_name from Employees where title like '%Manager%' ;  

-- 2 
select b.department_name , round(avg(a.salary), 2)   from    employees a join departments b on a.department_id = b.department_id group by b.department_id  ;
select * from employees ; 

-- 3 
select hire_date , count(employee_id) as people_hired from employees group by( hire_date) order by people_hired   ;

-- 4 
select first_name , last_name , salary from employees order by salary desc limit 10 ;

-- 5 
SET SQL_SAFE_UPDATES = 0;
update employees set salary = salary*1.1 ; 

-- 6 
delete from employees where year(hire_date) < 2000 ; 

-- 7 
-- giving error , how to set the precision if not no in advace 
-- CREATE TABLE employee_stats (
--     department_name VARCHAR(100),
--     total_employees INT,
--     average_salary DECIMAL( , 2)  
-- );

drop table employee_stats; 
CREATE TABLE employee_stats (
    department_name VARCHAR(100),
    total_employees INT,
    average_salary DECIMAL   
);

insert into employee_stats 
select b.department_name , count(a.employee_id) , avg(a.salary)   from  employees a join departments b on  a.department_id = b.department_id group by b.department_id
;

select * from  employee_stats; 
select * from employees ; 
-- 8 

select a.first_name , a.last_name from employees a join managers b on a.manager_id = b.manager_id and a.last_name = b.last_name ; 

-- 9 

select b.department_name , avg(a.salary)  from employees a join departments b on  a.department_id = b.department_id  group by(b.department_id) order by(avg(a.salary)) desc   limit 3  ; 

-- 10 

select a.first_name , a.last_name  from employees a where a.employee_id in (  select distinct(b.employee_id) from employees_dependent b ) order by   a.last_name;