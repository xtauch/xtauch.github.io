## Available Scripts

### `npm install`
Use npm install in the backend directory and at the root of the project to install packages.

### `npm start`
In the directory src, you can run: npm start to compile the code.

### `npm run dev`
Create a env directory in the backend directory and create a .env and .env.dev file inside.
Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

SESSION_KEY = RANDOM_KEY_99999141

SESSION_SECRET = RANDOM_SECRET_25252451

COOKIE_SECRET = RANDOM_SECRET_774111414

DB_HOST = localhost

DB_USER = user

DB_PASSWORD = password

DB_NAME = p7

TOKEN = RANDOM_TOKEN_21511661

Then in the directory backend, you can run: npm run dev.

## `MySQL`
To run this project you first need to install mySQL, you can use the following tutorial if you don't know how to :

https://openclassrooms.com/fr/courses/1959476-administrez-vos-bases-de-donnees-avec-mysql/1959969-installez-mysql

If you run into the error with the following code : 'ER_NOT_SUPPORTED_AUTH_MODE'

Run the following command in your console with password as the password you want for your root user:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

Then after in the SQL Command line after identifying yourself with your user infos :

CREATE DATABASE p7 CHARACTER SET 'utf8';

If you don't want to use your root as user for this project then create a new one and don't forget to use it in your env files : 

CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON p7 TO 'xavier'@'localhost';

USE p7;

CREATE TABLE Users (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL UNIQUE, password varchar(250) NOT NULL, dateError date, failedAttempts smallint NOT NULL default 0, token varchar(500), PRIMARY KEY (id, username)) ;

CREATE TABLE Gifs (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, titre varchar(200) NOT NULL, image LONGBLOB NOT NULL, postdate date NOT NULL, PRIMARY KEY (id, username)) ;

CREATE table Comments (id int UNSIGNED NOT NULL AUTO_INCREMENT, publication_id int UNSIGNED NOT NULL, username varchar(50) NOT NULL, postdate date NOT NULL, comment varchar(500) NOT NULL, PRIMARY KEY (id, publication_id, username)) ;

ALTER TABLE Comments ADD CONSTRAINT fk_publication_id FOREIGN KEY (publication_id) REFERENCES Gifs(id);

ALTER TABLE Comments ADD CONSTRAINT fk_username_comments FOREIGN KEY (username) REFERENCES Users(username);

ALTER TABLE Gifs ADD CONSTRAINT fk_username_gifs FOREIGN KEY (username) REFERENCES Users(username);


### `Admin`

Create a user named 'admin' to have access to admin functionnalities.
