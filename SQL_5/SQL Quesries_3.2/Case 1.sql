drop table blog_posts; 
drop table blog_comments;
CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP on update CURRENT_TIMESTAMP 
);
CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
     created_at timestamp DEFAULT CURRENT_TIMESTAMP 
);


INSERT INTO blog_posts (id, title, body, author_id, created_at, updated_at) VALUES
    (1, 'Title 1', 'Body 1', 101, '2022-01-01 08:00:00', '2022-01-01 08:00:00'),
    (2, 'Title 2', 'Body 2', 102, '2022-01-02 10:00:00', '2022-01-02 10:00:00'),
    (3, 'Title 3', 'Body 3', 103, '2022-01-03 12:00:00', '2022-01-03 12:00:00'),
    (4, 'Title 4', 'Body 4', 104, '2022-01-04 14:00:00', '2022-01-04 14:00:00'),
    (5, 'Title 5', 'Body 5', 105, '2022-01-05 16:00:00', '2022-01-05 16:00:00'),
    (6, 'Title 6', 'Body 6', 106, '2022-01-06 18:00:00', '2022-01-06 18:00:00'),
    (7, 'Title 7', 'Body 7', 107, '2022-01-07 20:00:00', '2022-01-07 20:00:00'),
    (8, 'Title 8', 'Body 8', 108, '2022-01-08 22:00:00', '2022-01-08 22:00:00'),
    (9, 'Title 9', 'Body 9', 109, '2022-01-09 00:00:00', '2022-01-09 00:00:00'),
    (10, 'Title 10', 'Body 10', 110, '2022-01-10 02:00:00', '2022-01-10 02:00:00');


INSERT INTO blog_comments (id, post_id, body, author_id, created_at) VALUES
    (1, 1, 'Comment 1', 201, '2022-01-01 09:00:00'),
    (2, 1, 'Comment 2', 202, '2022-01-01 10:00:00'),
    (3, 2, 'Comment 3', 203, '2022-01-02 11:00:00'),
    (4, 2, 'Comment 4', 204, '2022-01-02 12:00:00'),
    (5, 3, 'Comment 5', 205, '2022-01-03 13:00:00'),
    (6, 3, 'Comment 6', 206, '2022-01-03 14:00:00'),
    (7, 4, 'Comment 7', 207, '2022-01-04 15:00:00'),
    (8, 4, 'Comment 8', 208, '2022-01-04 16:00:00'),
    (9, 5, 'Comment 9', 209, '2022-01-05 17:00:00'),
    (10, 5, 'Comment 10', 210, '2022-01-05 18:00:00');
    
    -- 1 , by correlated query 
    select title , body , 
    ( select count(*)  from blog_comments b where b.post_id = a.id )
    from blog_posts a  order by created_at desc  limit 5   ; 
    
    -- 2 , using jons , not that the nultiple group by have been used 
    
    select a.title , a.body , count(b.post_id) from blog_posts a left join blog_comments b on a.id = b.post_id 
    group by a.id , a.title, a.body order by(a.created_at) desc limit 5  ;