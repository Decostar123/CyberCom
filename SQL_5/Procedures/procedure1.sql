desc  cars ; 
select * from cars ;
-- alter table cars drop column partitions,  drop column partitions,  drop column partitions, 
--  drop column partitions,  drop column partitions, ;
DROP PROCEDURE IF EXISTS car_year;
DROP PROCEDURE IF EXISTS set_varible;
drop procedure if exists crud ; 

DELIMITER // 
create procedure car_year(  
in year_car int ) 

begin
	select * from cars a where  a.year <= year_car ;
end 
//
DELIMITER ; 
 
DELIMITER // 
create procedure set_varible(  
 IN year_car INT  , 
out count_car int  ) 

begin

	set @output_val :=0 ; 
    case 
		  WHEN year_car = 1 THEN SET @output_value = 'one' ; 
			WHEN year_car = 2 THEN SET @output_value = 'two'  ;
        ELSE SET @output_value = 'zero'; 
         
	end case; 
        
        select @output_value ; 
        
	-- select * into count_car from cars a where  a.year <= year_car ;
    
end 

//
DELIMITER ; 

delimiter // 

create procedure  CRUD ( in crud_num int , in car_id int  , in car_brand varchar(50) , in model varchar(50), 
in car_year int , in mileage int , in car_price int , in car_availble bit )
begin 
-- 1 for inserting 
-- 2 for reading by id 
-- 3 for updating brand  
-- 4 for deleing by id 
-- 5 for select all 
	case 
    when crud_num = 1 then insert into cars values(car_id,car_brand,model,car_year, mileage, car_price, 
    car_availble)   ;  
    when crud_num = 2 then select * from cars a  where a.carid = car_id ;  
    when crud_num = 3 then update cars set brand = car_brand where carid = car_id ; 
    when crud_num = 4 then delete from cars where carid = car_id  ; 
    when crud_num = 5 then select * from cars ; 
    end case ; 
end  // 

delimiter ;  


select * from cars ; 

call car_year(2019) ; 


-- declare count_car int ;
-- set @count_car :=0 ;   
call set_varible( 2015 , @count_car ) ; 
-- select @count_car ; 

call CRUD( 1 , 22, 'deco' , 'star' , 2024 , 10000000 ,1234567 ,1 ) ; 
call CRUD( 2 , 22, null , null , null , null ,null ,null ) ; 
call CRUD( 5 , null, null , null , null , null ,null ,null ) ;
call CRUD( 4 , 22, null , null , null , null ,null ,null ) ; 
call CRUD( 3 , 22, 'deco_code' , null , null , null ,null ,null ) ; 
-- 0	577	18:50:14	call CRUD( 4 , 22, null , null , null , null ,null ,null )	
-- Error Code: 1054. Unknown column 'cars' in 'where clause'	0.031 sec