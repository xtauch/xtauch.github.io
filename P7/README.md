## Available Scripts
Use npm install in the backend directory to install packages.

In the directory src, you can run: npm start.

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

### `MySQL`

CREATE DATABASE p7 SET ‘utf8’;
USE p7;

CREATE TABLE Users (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(250) NOT NULL, dateError date, failedAttempts smallint NOT NULL default 0, token varchar(500), PRIMARY KEY (id, username)) ;


CREATE TABLE Gifs (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, titre varchar(200) NOT NULL, image LONGBLOB NOT NULL, postdate date NOT NULL, PRIMARY KEY (id)) ;

CREATE table Comments (id int UNSIGNED NOT NULL AUTO_INCREMENT, publication_id int UNSIGNED NOT NULL, username varchar(50) NOT NULL, postdate date NOT NULL, comment varchar(500) NOT NULL, PRIMARY KEY (id, publication_id)) ;

ALTER TABLE Comments ADD CONSTRAINT fk_publication_id FOREIGN KEY (publication_id) REFERENCES Gifs(id);

