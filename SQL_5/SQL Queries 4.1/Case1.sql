
drop table if exists book_borrowings ; 
drop table if exists book_category_mappings ;
drop table if exists books ;
drop table if exists authors ; 
drop table if exists book_categories ;
drop table if exists customers ; 




CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);




CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    author_id INT,
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);





CREATE TABLE book_category_mappings (
    id INT PRIMARY KEY,
    book_id INT,
    category_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);

CREATE TABLE book_borrowings (
    id INT PRIMARY KEY,
    book_id INT,
    customer_id INT,
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    -- Assuming customers table exists with id column
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);






-- Insert into authors table
INSERT INTO authors (id, name) VALUES
(1, 'Author 1'),
(2, 'Author 2'),
(3, 'Author 3');

-- Insert into book_categories table
INSERT INTO book_categories (id, name) VALUES
(1, 'Fiction'),
(2, 'Non-Fiction'),
(3, 'Science Fiction');

-- Insert into books table
INSERT INTO books (id, title, author_id, publication_date) VALUES
(1, 'Book 1', 1, '2020-01-01'),
(2, 'Book 2', 1, '2020-02-01'),
(3, 'Book 3', 2, '2021-03-01'),
(4, 'Book 4', 2, '2020-04-01'),
(5, 'Book 5', 3, '2020-05-01');

-- Insert into book_category_mappings table
INSERT INTO book_category_mappings (id, book_id, category_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 1),
(5, 5, 3);



-- Insert data into the customers table
INSERT INTO customers (id, name, email)
VALUES
    (101, 'Customer 1', 'customer1@example.com'),
    (102, 'Customer 2', 'customer2@example.com'),
    (103, 'Customer 3', 'customer3@example.com'),
    (104, 'Customer 4', 'customer4@example.com'),
    (105, 'Customer 5', 'customer5@example.com');

INSERT INTO book_borrowings (id, book_id, customer_id, borrow_date)
VALUES
    (1, 1, 101, '2021-01-01'),
    (2, 2, 102, '2021-02-01'),
    (3, 1, 103, '2021-02-15'),
    (4, 3, 104, '2021-03-01'),
    (5, 1, 105, '2021-03-15'),
    (6, 2, 101, '2021-04-01'),
    (7, 4, 102, '2021-04-15'),
    (8, 1, 103, '2021-05-01'),
    (9, 5, 104, '2021-05-15'),
    (10, 2, 105, '2021-06-01');


-- Insert into book_borrowings table (assuming it exists)
-- Example data for book borrowings
-- INSERT INTO book_borrowings (id, book_id, customer_id, borrow_date) VALUES
-- (1, 1, 101, '2021-01-01'),
-- (2, 2, 102, '2021-02-01'),
-- (3, 3, 103, '2021-03-01'),
-- (4, 4, 104, '2021-04-01'),
-- (5, 5, 105, '2021-05-01');

-- 1 
select * from books where  year(publication_date) = '2020' ; 

-- 2 
-- select max(count(b2.id))    from books b2 group by b2.id  ; 
 select a.name from  authors a where a.id in (
 select b1.author_id from books b1  group by b1.author_id  having count(b1.author_id) =
 ( select count(b2.author_id) as _id  from books b2 group by (b2.author_id)  order by _id desc limit 1  ) 
 
 
 
 
 ) ;
 
 -- it can be done by join also, but it will also use the subquery onlyne time but in thatcase 
 
 -- 3 , now doing it by join 
 
 select  b.name from book_category_mappings a join book_categories b on a.category_id = b.id group by a.category_id having count(a.category_id) = (
 
 select count(c.category_id) as _id from book_category_mappings c group by c.category_id order by _id desc limit 1  
 
 ) ;
 -- 4 
 
 select  b.name from books a join authors b on a.author_id = b.id join book_category_mappings c on  a.id = c.book_id join book_categories d  on c.category_id = d.id  and d.name='Fiction' group by author_id  
 
 having count(author_id) = (
 select count(author_id) as __id  from books a join authors b on a.author_id = b.id join book_category_mappings c on  a.id = c.book_id join book_categories d  on c.category_id = d.id  and d.name='Fiction' group by author_id  
 order by __id desc limit 1 
 
 ) ; 

 select * from book_category_mappings ; 
 
 
 --  5 
 
 select b.title  from book_borrowings a join  books b on a.book_id = b.id  group by (a.book_id) order by count(a.book_id) desc limit 5  ;