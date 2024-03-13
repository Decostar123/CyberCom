drop trigger if exists title_modifer ; 

create trigger title_modifer 
before 
insert
on books  for each row  
set  new.title = concat(  new.title  , length(  new.title ))  ; 

-- can not insert the negative values
 
drop trigger if exists before_insert_trigger ; 
use task  ; 
delimiter // 
CREATE  TRIGGER before_insert_trigger
BEFORE INSERT ON books
FOR EACH ROW
BEGIN
    IF NEW.id < 0 THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Value cannot be negative';
    END IF;
END// 
delimiter ;

insert into books values( 6 , 'Book 6' , 2 , '2001-05-22') ;  
insert into books values( -7 , 'Book 6' , 2 , '2001-05-22') ;  

select * from books ; 