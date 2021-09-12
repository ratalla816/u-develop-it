DROP DATABASE IF EXISTS election;
CREATE DATABASE election;
USE election;
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL
);

DESCRIBE candidates;

INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES ('Ronald', 'Firbank', 1);

DESCRIBE candidates;

SELECT * FROM candidates;

INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES
  ('Virginia', 'Woolf', 1),
  ('Piers', 'Gaveston', 0),
  ('Charles', 'LeRoi', 1),
  ('Katherine', 'Mansfield', 1),
  ('Dora', 'Carrington', 0),
  ('Edward', 'Bellamy', 0),
  ('Montague', 'Summers', 1),
  ('Octavia', 'Butler', 1),
  ('Unica', 'Zurn', 1);
  
  SELECT * FROM candidates;
  
  SELECT first_name, last_name FROM candidates;

SELECT first_name, industry_connected
FROM candidates
WHERE industry_connected = 1;

SELECT first_name, last_name, industry_connected
FROM candidates
WHERE id = 5;

DROP DATABASE election;

USE election;

DESCRIBE candidates;

SELECT * FROM candidates;

source db/db.sql

DROP DATABASE IF EXISTS election;
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL
);

DESCRIBE candidates;

SELECT * FROM candidates;

UPDATE candidates
SET industry_connected = 1
WHERE id = 3;

SELECT * FROM candidates;

SELECT id = 3 FROM candidates;

SELECT first_name, last_name
FROM candidates
WHERE id = 3;

DELETE FROM candidates 
WHERE first_name = "Montague"; 

