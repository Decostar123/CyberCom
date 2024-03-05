
-- 3. ONE-TO-ONE RELATIONSHIP
CREATE TABLE Team (
  teamID INT PRIMARY KEY,
  teamName VARCHAR(20),
  countryName VARCHAR(50)
);

CREATE TABLE Player (
  playerID INT,
  playerName VARCHAR(50),
  teamID INT,
  expertise VARCHAR(50),
  PRIMARY KEY(playerID),
  FOREIGN KEY (teamID) REFERENCES Team(teamID)
);