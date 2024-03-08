drop table Sales  ;   
drop table Cars ; 

drop table Customers;
-- Creating table Cars
CREATE TABLE Cars (
    CarID INT PRIMARY KEY,
    Brand VARCHAR(50),
    Model VARCHAR(50),
    Year INT,
    Mileage INT,
    Price DECIMAL(10,2),
    Available BIT
);

-- Creating table Customers
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20)
);

-- Creating table Sales
CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    CarID INT,
    CustomerID INT,
    SaleDate DATE,
    SalePrice DECIMAL(10,2),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
-- Inserting values into table Cars
INSERT INTO Cars (CarID, Brand, Model, Year, Mileage, Price, Available)
VALUES 
    (1, 'Toyota', 'Corolla', 2019, 25000, 15000.00, 1),
    (2, 'Honda', 'Civic', 2018, 30000, 16000.00, 1),
    (3, 'Ford', 'Fusion', 2017, 35000, 17000.00, 0),
    (4, 'Chevrolet', 'Malibu', 2016, 40000, 18000.00, 1),
    (5, 'Nissan', 'Altima', 2015, 45000, 19000.00, 1),
    (6, 'Hyundai', 'Sonata', 2014, 50000, 20000.00, 0),
    (7, 'Kia', 'Optima', 2013, 55000, 21000.00, 1),
    (8, 'Volkswagen', 'Jetta', 2012, 60000, 22000.00, 1),
    (9, 'BMW', '3 Series', 2011, 65000, 23000.00, 0),
    (10, 'Mercedes-Benz', 'C-Class', 2010, 70000, 24000.00, 1),
    (11, 'Audi', 'A4', 2009, 75000, 25000.00, 1),
    (12, 'Lexus', 'ES', 2008, 80000, 26000.00, 0),
    (13, 'Infiniti', 'Q50', 2007, 85000, 27000.00, 1),
    (14, 'Cadillac', 'CTS', 2006, 90000, 28000.00, 1),
    (15, 'Acura', 'TLX', 2005, 95000, 29000.00, 0),
    (16, 'Lincoln', 'MKZ', 2004, 100000, 30000.00, 1),
    (17, 'Buick', 'LaCrosse', 2003, 105000, 31000.00, 1),
    (18, 'Chrysler', '300', 2002, 110000, 32000.00, 0),
    (19, 'Tesla', 'Model S', 2001, 115000, 33000.00, 1),
    (20, 'GMC', 'Terrain', 2000, 120000, 34000.00, 1);

-- Inserting values into table Customers
INSERT INTO Customers (CustomerID, FirstName, LastName, Email, PhoneNumber)
VALUES 
    (1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210'),
    (3, 'Michael', 'Johnson', 'michael.johnson@example.com', '555-123-4567'),
    (4, 'Emily', 'Brown', 'emily.brown@example.com', '456-789-0123'),
    (5, 'William', 'Davis', 'william.davis@example.com', '321-987-6540'),
	(6, 'Decostar', 'Sharma', 'william.davis@example.com', '704-109-298');

-- Inserting values into table Sales
INSERT INTO Sales (SaleID, CarID, CustomerID, SaleDate, SalePrice)
VALUES 
    (1, 1, 1, '2024-03-01', 15000.00),
    (2, 2, 2, '2024-03-02', 16000.00),
    (3, 3, 3, '2024-03-03', 17000.00),
    (4, 4, 4, '2024-03-04', 18000.00),
    (5, 5, 5, '2024-03-05', 19000.00),
    (6, 6, 1, '2024-03-06', 20000.00),
    (7, 7, 2, '2024-03-07', 21000.00),
    (8, 8, 3, '2024-03-08', 22000.00),
    (9, 9, 4, '2024-03-09', 23000.00),
    (10, 10, 5, '2024-03-10', 24000.00),
    (11, 11, 1, '2024-03-11', 25000.00),
    (12, 12, 2, '2024-03-12', 26000.00),
    (13, 13, 3, '2024-03-13', 27000.00),
    (14, 14, 4, '2024-03-14', 28000.00),
    (15, 15, 5, '2024-03-15', 29000.00),
    (16, 16, 1, '2024-03-16', 30000.00),
    (17, 17, 2, '2024-03-17', 31000.00),
    (18, 18, 3, '2024-03-18', 32000.00),
    (19, 19, 4, '2024-03-19', 33000.00),
    (20, 20, 5, '2024-03-20', 34000.00);

-- 1 
select * from Cars order by price desc limit 10  ; 

-- 2 
select round( avg(price) , 2 )  from Cars where price is not null  ;

-- 3 

select a.customerID , b.FirstName , b.Lastname , count( a.customerID) as number_of_cars_purchased from Sales a join Customers b on a.CustomerID = b.CustomerID  group by( a.customerID) ; 

-- 4 

select * from Customers ;
-- giving error about the select alias being used in the where  
-- select * from  ( Customers a left join Sales b on a.CustomerID = b.CustomerID) as d  where d.SaleDate is null   ; 
select * from Customers a where a.CustomerID not in (  select distinct( CustomerID ) from   Sales ) ;  
 
 -- 5 
 select * from Cars ; 
 insert into Cars ( carid, brand , model, year , mileage , price , available )  values ( 21 ,'Toyota' , 'Corolla', 2022, 0, 20000 , 1  ); 
 
 -- 6 
 select * from Sales ; 
 update Cars set price = price*1.1 ; 
 
 -- 7 
 delete from Sales  where saleDate < str_to_date('January 1, 2022' , '%M %d, %Y') ; 
