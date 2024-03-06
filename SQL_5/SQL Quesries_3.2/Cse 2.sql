drop table users ;
drop table posts ; 
drop table likes ; 
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);
CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);
INSERT INTO users (id, name, created_at) VALUES
    (1, 'Alice', '2022-01-01 08:00:00'),
    (2, 'Bob', '2022-01-02 10:00:00'),
    (3, 'Charlie', '2022-01-03 12:00:00'),
    (4, 'David', '2022-01-04 14:00:00'),
    (5, 'Emma', '2022-01-05 16:00:00'),
    (6, 'Frank', '2022-01-06 18:00:00'),
    (7, 'Grace', '2022-01-07 20:00:00'),
    (8, 'Henry', '2022-01-08 22:00:00'),
    (9, 'Ivy', '2022-01-09 00:00:00'),
    (10, 'Jack', '2022-01-10 02:00:00'),
    (11, 'Kevin', '2022-01-11 04:00:00'),
    (12, 'Lily', '2022-01-12 06:00:00'),
    (13, 'Mike', '2022-01-13 08:00:00'),
    (14, 'Nancy', '2022-01-14 10:00:00'),
    (15, 'Olivia', '2022-01-15 12:00:00'),
    (16, 'Peter', '2022-01-16 14:00:00'),
    (17, 'Queenie', '2022-01-17 16:00:00'),
    (18, 'Ryan', '2022-01-18 18:00:00'),
    (19, 'Samantha', '2022-01-19 20:00:00'),
    (20, 'Tom', '2022-01-20 22:00:00');

-- Insert values into the posts table
INSERT INTO posts (id, user_id, body, created_at) VALUES
    (1, 1, 'Post 1 by Alice', '2022-01-01 08:00:00'),
    (31, 1, 'Post 311 by Alice', '2022-01-01 08:00:00'),
    (2, 2, 'Post 1 by Bob', '2022-01-02 10:00:00'),
    (3, 3, 'Post 1 by Charlie', '2022-01-03 12:00:00'),
    (4, 4, 'Post 1 by David', '2022-01-04 14:00:00'),
    (5, 5, 'Post 1 by Emma', '2022-01-05 16:00:00'),
    (6, 6, 'Post 1 by Frank', '2022-01-06 18:00:00'),
    (7, 7, 'Post 1 by Grace', '2022-01-07 20:00:00'),
    (8, 8, 'Post 1 by Henry', '2022-01-08 22:00:00'),
    (9, 9, 'Post 1 by Ivy', '2022-01-09 00:00:00'),
    (10, 10, 'Post 1 by Jack', '2022-01-10 02:00:00'),
    (11, 11, 'Post 1 by Kevin', '2022-01-11 04:00:00'),
    (12, 12, 'Post 1 by Lily', '2022-01-12 06:00:00'),
    (13, 13, 'Post 1 by Mike', '2022-01-13 08:00:00'),
    (14, 14, 'Post 1 by Nancy', '2022-01-14 10:00:00'),
    (15, 15, 'Post 1 by Olivia', '2022-01-15 12:00:00'),
    (16, 16, 'Post 1 by Peter', '2022-01-16 14:00:00'),
    (17, 17, 'Post 1 by Queenie', '2022-01-17 16:00:00'),
    (18, 18, 'Post 1 by Ryan', '2022-01-18 18:00:00'),
    (19, 19, 'Post 1 by Samantha', '2022-01-19 20:00:00'),
    (20, 20, 'Post 1 by Tom', '2022-01-20 22:00:00');

-- Insert values into the likes table
INSERT INTO likes (id, user_id, post_id, created_at) VALUES
    (1, 2, 1, '2022-01-01 09:00:00'),
    (31, 2, 1, '2022-01-01 09:00:00'),
      (32, 2, 1, '2022-01-01 09:00:00'),
    (2, 3, 2, '2022-01-02 10:00:00'),
    (3, 4, 3, '2022-01-03 11:00:00'),
    (4, 5, 4, '2022-01-04 12:00:00'),
    (5, 6, 5, '2022-01-05 13:00:00'),
    (6, 7, 6, '2022-01-06 14:00:00'),
    (7, 8, 7, '2022-01-07 15:00:00'),
    (8, 9, 8, '2022-01-08 16:00:00'),
    (9, 10, 9, '2022-01-09 17:00:00'),
    (10, 1, 10, '2022-01-10 18:00:00'),
    (11, 2, 11, '2022-01-11 19:00:00'),
    (12, 3, 12, '2022-01-12 20:00:00'),
    (13, 4, 13, '2022-01-13 21:00:00'),
    (14, 5, 14, '2022-01-14 22:00:00'),
    (15, 6, 15, '2022-01-15 23:00:00'),
    (16, 7, 16, '2022-01-16 00:00:00'),
    (17, 8, 17, '2022-01-17 01:00:00'),
    (18, 9, 18, '2022-01-18 02:00:00'),
    (19, 10, 19, '2022-01-19 03:00:00'),
    (20, 1, 20, '2022-01-20 04:00:00');


select a.name  , b.body, count(c.id)   from
 users a left join posts b
 on a.id = b.user_id and year(b.created_at)='2022'
 left join likes c
 on b.id = c.post_id group by  a.id, b.id ;