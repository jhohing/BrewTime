CREATE DATABASE brew_time_db;
USE brew_time_db;

CREATE TABLE coffee
(
	id int NOT NULL AUTO_INCREMENT,
	coffee_name varchar(255) NOT NULL,
	drink BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);