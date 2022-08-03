CREATE TABLE notes (
   id integer PRIMARY KEY, 
   userId integer,
   title varchar(64),
   text text NOT NULL
);