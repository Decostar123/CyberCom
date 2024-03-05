CREATE TABLE Employee (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    sex VARCHAR(1) check (sex in ('m', 'f')),
    salary INT
);

INSERT INTO Employee (id, name, sex, salary)
VALUES
    (1, 'A', 'm', 2500),
    (2, 'B', 'f', 1500),
    (3, 'C', 'm', 5500),
    (4, 'D', 'f', 500);
    
update Employee set sex = case when sex = 'm' then 'f' when sex='f' then 'm' end ; 
select * from Employee;