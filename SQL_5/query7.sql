create table Student_Info(
Enrollment_No int primary key , 
name varchar(50) not null, 
age int check (age >=18)  
);




show tables ;
select * from student_info ; 
create table Semester (
semesterCode int primary key , 
semesterLength int , 
isOdd boolean
) ;
create table Subject (
subjectCode int primary key , 
subjectName varchar(50) not null , 
semesterID int references Semester(semesterCode) 
) ; 

create table Marks(
entryID int auto_increment primary key ,
enrollmentNo int references student_info(Enrollment_No) , 
subjectCode int references Subject( subjectCode ), 
marks int not null  , 
grades int  not null 
)
