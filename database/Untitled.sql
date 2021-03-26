create database do_an_tot_nghiep;

use do_an_tot_nghiep;

CREATE TABLE Account (
    accountId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role VARCHAR(40) NOT NULL,
    phoneNo VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    imageUrl TEXT,
    birthday DATE NOT NULL,
    isActive BOOLEAN NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);





-- constraint--

-- alter table Article
-- add foreign key (accountId) references Account(accountId);
   

   
   
