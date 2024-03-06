drop table Activity ; 
CREATE TABLE Activity (
    player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, device_id, event_date)
);

INSERT INTO Activity (player_id, device_id, event_date, games_played)
VALUES
    (1, 2, '2016-03-01', 5),
    (1, 2, '2016-05-02', 6),
    (1, 3, '2017-06-25', 1),
    (3, 1, '2016-03-02', 0),
    (3, 4, '2018-07-03', 5);
    
    ;
    -- 1 way 
select a.player_id , a.event_date , ( 
select sum( b.games_played) from Activity b where b.player_id = a.player_id and b.event_date <= a.event_date
) as games_played_so_far   from Activity a ; 

-- --2way
select   a.player_id , sum(b.games_played)  from   
Activity a join Activity b 
on a.player_id = b.player_id and a.event_date >= b.event_date group by a.player_id, a.event_date   ;