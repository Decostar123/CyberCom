
-- 2. ONE-TO-MANY RELATIONSHIP
CREATE TABLE College (
  collegeID INT PRIMARY KEY,
  collegeName VARCHAR(50),
  collegeCity VARCHAR(50)
);

CREATE TABLE Student (
  studentID INT PRIMARY KEY,
  studentName VARCHAR(50),
  studentAddress VARCHAR(100),
  collegeID INT,
  FOREIGN KEY (collegeID) REFERENCES College(collegeID)
);

