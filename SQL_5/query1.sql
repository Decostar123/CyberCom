CREATE TABLE Employee(

 employeeName varchar(50) , 
 employeeID int , 
 department varchar(50) , 
 role varchar(50) , 
 age int , 
 salary int , 
 PRIMARY KEY(employeeID)
)

CREATE TABLE Leave(
leaveID int , 
reason varchar(50) , 
start_date DATE  , 
end_date DATE , 
PRIMARY KEY(leaveID)
)

CREATE TABLE Employee_Leave(
employeeID int, 
leaveID int, 
PRIMARY KEY(employeeID,leaveID ), 
FOREIGN KEY(employeeID) references Employee(employeeID), 
FOREIGN KEY(leaveID) references Leave(leaveID)
)