
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10, 2)
);


INSERT INTO employees (id, name, department, salary) VALUES
(1, 'John Doe', 'sales', 60000),
(2, 'Jane Smith', 'sales', 55000),
(3, 'Michael Johnson', 'marketing', 48000),
(4, 'Emily Brown', 'sales', 52000),
(5, 'David Lee', 'finance', 70000),
(6, 'Sarah Davis', 'sales', 48000),
(7, 'Robert Wilson', 'sales', 60000);

select name,salary  from employees where department='sales' and salary > 50000;