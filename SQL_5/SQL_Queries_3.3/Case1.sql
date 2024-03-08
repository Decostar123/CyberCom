drop table books  ;
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year INT
);

INSERT INTO books (id,  title, author, publication_year) 
VALUES 
    (1, 'To Kill a Mockingbird', 'Harper Lee', 1960),
    (2, '1984', 'George Orwell', 1949),
    (3, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    (4, 'Pride and Prejudice', 'Jane Austen', 1813),
    (5, 'The Catcher in the Rye', 'J.D. Salinger', 1951),
    (6, 'To the Lighthouse', 'Virginia Woolf', 1927),
    (7, 'Moby-Dick', 'Herman Melville', 1851),
    (8, 'Frankenstein', 'Mary Shelley', 1818),
    (9, 'War and Peace', 'Leo Tolstoy', 1869),
    (10, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954) , 
    ( 11, 'DecoCodes', 'Decostar Sharma', 1813)
    ;
    
    select * from books ; 
    
    select title , author from books where publication_year in (  select min(publication_year) from  books ) ; 
