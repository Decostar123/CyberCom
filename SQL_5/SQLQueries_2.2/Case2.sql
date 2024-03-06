
CREATE TABLE Activity (
    player_id INT,
    device_id INT,
    event_date DATE,
    games_played INT,
    PRIMARY KEY (player_id, event_date)
);

INSERT INTO Activity (player_id, device_id, event_date, games_played)
VALUES
    (1, 2, '2016-03-01', 5),
    (1, 2, '2016-05-02', 6),
    (2, 3, '2017-06-25', 1),
    (3, 1, '2016-03-02', 0),
    (3, 4, '2018-07-03', 5);
;

-- 1 way  
select player_id , 
( select b.device_id from Activity b where  b.event_date =   ( select min( c.event_date ) from Activity c 
where c.player_id = a.player_id group by(c.player_id)  )     ) as device_id from Activity a group by player_id ; 

-- 2 way
select a.player_id , a.device_id from Activity a join ( select player_id , min(event_date) as event_date from Activity group by (player_id)  ) b  on 
a.player_id = b.player_id and a.event_date = b.event_date ;

