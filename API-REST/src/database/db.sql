CREATE DATABASE relational_db;

USE relational_db;

-- table region 

CREATE TABLE Rol(
    id_rol INT(11) NOT NULL AUTO_INCREMENT,
    name_rol VARCHAR (64) NOT NULL,
    PRIMARY KEY (id_rol)
);
DESCRIBE Rol;


-- table users 

CREATE TABLE Users(
    id_user INT(16) NOT NULL,
    password VARCHAR (64) NOT NULL,
    name_user VARCHAR (64) NOT NULL,
    last_name VARCHAR (64) NOT NULL,
    id_rolf INT(16),
    CONSTRAINT fk_user FOREIGN KEY (id_rolf) REFERENCES Rol(id_rol),
    age INT(3),
    gender VARCHAR (8) NOT NULL,
    followers INT(3),
    followings INT(3),
    favourities INT(3),
    PRIMARY KEY (id_user) 
);
DESCRIBE Users;

-- table followings 

    CREATE TABLE Follows(
        id_following INT(16) NOT NULL,
        PRIMARY KEY (id_following),
        id_userf INT(16) NOT NULL,
        CONSTRAINT fk_userf FOREIGN KEY (id_userf) REFERENCES Users(id_user)      
    );
DESCRIBE Follows;

INSERT INTO Rol values
(1,'usuario'),
(2,'administrador');