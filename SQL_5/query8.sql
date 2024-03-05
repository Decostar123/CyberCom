drop table person ; 
drop table address ; 
CREATE TABLE Person (
    personId INT PRIMARY KEY,
    lastName VARCHAR(255),
    firstName VARCHAR(255)
);


INSERT INTO Person (personId, lastName, firstName) VALUES
    (1, 'Wang', 'Allen'),
    (2, 'Alice', 'Bob');


CREATE TABLE Address (
    addressId INT PRIMARY KEY,
    personId INT,
    city VARCHAR(255),
    state VARCHAR(255),
    FOREIGN KEY (personId) REFERENCES Person(personId)
);


INSERT INTO Address (addressId, personId, city, state) VALUES
    (1, 2, 'New York City', 'New York'),
    (2, 3, 'Leetcode', 'California');
    
    
   select  p.firstName , p.lastName, a.city, a.state from Person p left join Address a on p.personId = a.personId 