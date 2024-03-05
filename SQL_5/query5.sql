CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(255)
) ;

INSERT INTO Customers (id, name) VALUES
    (1, 'Joe'),
    (2, 'Henry'),
    (3, 'Sam'),
    (4, 'Max');


CREATE TABLE Orders (
    id INT PRIMARY KEY,
    customerId INT,
    FOREIGN KEY (customerId) REFERENCES Customers(id)
);


INSERT INTO Orders (id, customerId) VALUES
    (1, 3),
    (2, 1);


select name from Customers where id not in ( select customerId from Orders ) ; 