
drop table if exists Salaries ; 
drop table if exists Employees ; 
drop table if exists Departments ; 






CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255)
);


CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255),
    department_id INT REFERENCES Departments(department_id) ,
    salary DECIMAL(10, 2) 
);

--  CREATING TABLE IS LIKE A CONSTRUCTIOR CALL  
CREATE TABLE Salaries (
    salary_id INT PRIMARY KEY ,
    employee_id INT REFERENCES Employees(employee_id) ,
    salary DECIMAL(10, 2),
    date DATE 
);

INSERT INTO Departments (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance');

-- Insert values into the Employees table
INSERT INTO Employees (employee_id, name, department_id, salary) VALUES
(1, 'John Doe', 1, 50000.00),
(2, 'Jane Smith', 2, 60000.00),
(3, 'Bob Johnson', 1, 55000.00),
(4, 'Alice Williams', 3, 62000.00),
(5, 'Michael Brown', 2, 58000.00),
(6, 'Emily Jones', 1, 51000.00),
(7, 'David Davis', 3, 63000.00),
(8, 'Sarah Miller', 2, 59000.00),
(9, 'James Wilson', 1, 54000.00),
(10, 'Anna Taylor', 3, 64000.00);

-- Insert values into the Salaries table
INSERT INTO Salaries (salary_id, employee_id, salary, date) VALUES
(1, 1, 50000.00, '2023-01-01'),
(2, 2, 60000.00, '2023-01-01'),
(3, 3, 55000.00, '2023-01-01'),
(4, 4, 62000.00, '2023-01-01'),
(5, 5, 58000.00, '2023-01-01'),
(6, 6, 51000.00, '2023-01-01'),
(7, 7, 63000.00, '2023-01-01'),
(8, 8, 59000.00, '2023-01-01'),
(9, 9, 54000.00, '2023-01-01'),
(10, 10, 64000.00, '2023-01-01');

-- 1 
select a.name from Employees a join  Departments b on a.department_id = b.department_id and  b.department_name = 'Sales' ; 

-- 2 
select  count( b.department_id) as total_working_employees , b.department_name from  Employees a join  Departments b on a.department_id = b.department_id  group by b.department_id order by department_name  ; 

-- 3 

select   b.department_name , avg(a.salary) from  Employees a join  Departments b
on a.department_id = b.department_id  
group by b.department_id order by  b.department_id    ; 

-- 4 

-- Calculate the limit using a subquery
