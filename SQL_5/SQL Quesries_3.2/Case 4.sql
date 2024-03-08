
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount numeric(10, 2)
);


INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES
(1, 101, '2024-01-15', 150.00),
(2, 102, '2024-01-16', 200.00),
(3, 101, '2024-01-17', 100.00),
(4, 103, '2024-01-18', 300.00),
(5, 102, '2024-01-19', 250.00),
(6, 104, '2024-01-20', 400.00),
(7, 103, '2024-01-21', 350.00),
(8, 101, '2024-01-22', 50.00),
(9, 102, '2024-01-23', 150.00),
(10, 104, '2024-01-24', 200.00);
select customer_id , sum(total_amount)  as total_order_amount from orders group by customer_id  order by  total_order_amount desc  ; 