CREATE TABLE notes (
   id SERIAL PRIMARY KEY, 
   "createdBy" INTEGER,
   "createdOn" DATE,
   title VARCHAR(64) NOT NULL,
   contents TEXT NOT NULL
);