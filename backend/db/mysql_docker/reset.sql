USE myUber_database;
DELETE FROM Users WHERE userID > 0;
DELETE FROM CarInfo WHERE carPlate <> 'NULL';
DELETE FROM Wallet WHERE userID > 0;
DELETE FROM Records WHERE recordID > 0;
DELETE FROM Routes WHERE routeID > 0;
DELETE FROM Boarding WHERE boardingID > 0;
DELETE FROM Passenger WHERE userID > 0;
DELETE FROM Grids WHERE gridID > 0;
ALTER TABLE Routes AUTO_INCREMENT = 1;
ALTER TABLE Boarding AUTO_INCREMENT = 1;
ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE Records AUTO_INCREMENT = 1;
ALTER TABLE Grids AUTO_INCREMENT = 1;
