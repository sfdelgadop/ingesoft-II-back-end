CREATE DATABASE IF NOT EXISTS relational_db;

USE relational_db;

-- table Rol

CREATE TABLE IF NOT EXISTS Rol(
    id_rol INT(16) NOT NULL AUTO_INCREMENT,
    name_rol VARCHAR (64) NOT NULL,
    PRIMARY KEY (id_rol)
);

INSERT INTO Rol values
(null,'super usuario'),
(null,'administrador');

SELECT * FROM Rol;
DESCRIBE Rol;




-- table follows 

    CREATE TABLE IF NOT EXISTS Follows(
        id_following INT(16) NOT NULL AUTO_INCREMENT ,
        PRIMARY KEY (id_following),
        id_userf INT(16) NOT NULL,
        followname VARCHAR(64) NOT NULL
    );
    ALTER TABLE Follows AUTO_INCREMENT = 5000;

INSERT INTO `Follows` VALUES (null,10001,'kaninoc');    
SELECT * FROM Follows;    
DESCRIBE Follows;