drop table movies ;
CREATE TABLE movies (
    id INT PRIMARY KEY,
    movie VARCHAR(100),
    description VARCHAR(100),
    rating FLOAT(3, 2)
);


INSERT INTO movies (id, movie, description, rating)
VALUES 
    (1, 'War', 'great 3D', 8.9),
    (2, 'Science', 'fiction', 8.5),
    (3, 'irish', 'boring', 6.2),
    (4, 'Ice song', 'Fantasy', 8.6),
    (5, 'House card', 'Interesting', 9.1);
    
    
    
    
    select * from movies where id%2 != 0 and description != 'boring' order by rating desc;