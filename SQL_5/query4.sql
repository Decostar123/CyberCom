CREATE TABLE Person (
    id INT PRIMARY KEY,
    email VARCHAR(255)
);


INSERT INTO Person (id, email) VALUES
    (1, 'john@example.com'),
    (2, 'bob@example.com'),
    (3, 'john@example.com');
    


delete from Person where id not in ( select min(id )  from  Person group by(email)   ) ; 
select * from person ; 