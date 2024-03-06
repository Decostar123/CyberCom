drop table sales ; 
CREATE TABLE sales (
    id INT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

INSERT INTO sales (id, date, customer_id, product_id, quantity, total_price) VALUES
    (1, '2021-01-15', 101, 201, 2, 49.98),
    (2, '2021-01-20', 102, 202, 1, 24.99);


INSERT INTO sales (id, date, customer_id, product_id, quantity, total_price) VALUES
    (3, '2021-02-10', 103, 203, 3, 74.97),
    (4, '2021-02-25', 104, 204, 2, 149.98);


INSERT INTO sales (id, date, customer_id, product_id, quantity, total_price) VALUES
    (5, '2021-03-05', 105, 205, 1, 99.99),
    (6, '2021-03-15', 106, 206, 2, 199.98);


select * from sales;
-- doo we have to select for all the years or just the fyears prsent ??
select sum(total_price) as sales , month(date) as 'month'  from sales where year(date) = '2021'  group by( month(date)) order by( month(date)); 
 