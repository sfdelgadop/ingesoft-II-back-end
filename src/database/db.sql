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


-- table users 

CREATE TABLE IF NOT EXISTS Users(
    id_user INT(16) NOT NULL AUTO_INCREMENT,
    password VARCHAR (64) NOT NULL,
    name_user VARCHAR (64) NOT NULL,
    last_name VARCHAR (64) NOT NULL,
    username VARCHAR (64) NOT NULL UNIQUE KEY,
    email VARCHAR (64) NOT NULL UNIQUE KEY,
    id_rolf INT(16),
    CONSTRAINT fk_user FOREIGN KEY (id_rolf) REFERENCES Rol(id_rol),
    age INT(3),
    gender VARCHAR (16) NOT NULL,
    followers INT(3),
    followings INT(3),
    favourities INT(3),
    PRIMARY KEY (id_user)  
);

ALTER TABLE Users AUTO_INCREMENT = 10000;

INSERT INTO Users 
VALUES (null, 'passwd123', 'kaninoc', 'dest', 'kaninoc18', 'kanino18@sevebien', 1, 25, 'masculino', 0, 0, 0);

INSERT INTO Users 
VALUES (null, '12345', 'Sebastias', 'Delgado', 'sfdelgadop', 'sfdelgadop@unal.edu.co', 1, 21, 'masculino', 0, 0, 0);

SELECT * FROM Users;
DESCRIBE Users;

-- table follows 

    CREATE TABLE IF NOT EXISTS Follows(
        id_following INT(16) NOT NULL AUTO_INCREMENT ,
        PRIMARY KEY (id_following),
        id_userf INT(16) NOT NULL,
        CONSTRAINT fk_userf FOREIGN KEY (id_userf) REFERENCES Users(id_user), 
        followname VARCHAR(64) NOT NULL
    );
    ALTER TABLE Follows AUTO_INCREMENT = 5000;

INSERT INTO `Follows` VALUES (null,10001,'kaninoc');    
SELECT * FROM Follows;    
DESCRIBE Follows;