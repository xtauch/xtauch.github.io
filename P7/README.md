## Available Scripts

In the directory src, you can run: npm start.

In the directory backend, you can run: npm run dev.

### `MySQL`

CREATE DATABASE p7 SET ‘utf8’;
USE p7;

CREATE TABLE Users (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(250) NOT NULL, PRIMARY KEY (id)) ;

CREATE TABLE Gifs (id int UNSIGNED NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, titre varchar(200) NOT NULL, image LONGBLOB NOT NULL, postdate date NOT NULL, PRIMARY KEY (id)) ;

CREATE table Comments (id int UNSIGNED NOT NULL AUTO_INCREMENT, publication_id int UNSIGNED NOT NULL, username varchar(50) NOT NULL, postdate date NOT NULL, comment varchar(500) NOT NULL, PRIMARY KEY (id, publication_id)) ;

ALTER TABLE Comments ADD CONSTRAINT fk_publication_id FOREIGN KEY (publication_id) REFERENCES Gifs(id);

