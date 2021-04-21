create database do_an_tot_nghiep;

use do_an_tot_nghiep;

CREATE TABLE `Account` (
	`accountId` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL ,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`role` varchar(10) NOT NULL,
	`phoneNo` varchar(15) NOT NULL ,
	`address` TEXT NOT NULL,
	`imageUrl` TEXT NOT NULL,
	`birthday` DATE NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`accountId`)
);

CREATE TABLE `Comment` (
	`commentId` INT NOT NULL AUTO_INCREMENT,
	`commentParentId` INT NOT NULL ,
	`lessonId` INT NOT NULL,
	`accountId` INT NOT NULL,
	`content` TEXT NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`commentId`)
);

CREATE TABLE `Student` (
	`studentId` INT NOT NULL AUTO_INCREMENT,
	`accountId` INT NOT NULL,
	`displayName` varchar(255),
	`description` TEXT ,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`studentId`)
);

CREATE TABLE `Teacher` (
	`teacherId` INT NOT NULL AUTO_INCREMENT,
	`accountId` INT NOT NULL,
	`displayName` varchar(255) ,
	`description` TEXT ,
	`isPublic` BOOLEAN NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`teacherId`)
);

CREATE TABLE `Course` (
	`courseId` INT NOT NULL AUTO_INCREMENT,
	`teacherId` INT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` TEXT NOT NULL,
	`imageUrl` TEXT NOT NULL,
	`code` varchar(255) NOT NULL,
	`isPublic` BOOLEAN NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`courseId`)
);

CREATE TABLE `Lesson` (
	`lessonId` INT NOT NULL AUTO_INCREMENT,
	`courseId` INT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` TEXT NOT NULL,
	`content` LONGBLOB NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`lessonId`)
);

CREATE TABLE `StudentCourse` (
	`studentId` INT NOT NULL,
	`courseId` INT NOT NULL,
	`isApproved` BOOLEAN NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL
);

CREATE TABLE `Test` (
	`testId` INT NOT NULL AUTO_INCREMENT,
	`courseId` INT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` TEXT NOT NULL,
	`content` LONGBLOB NOT NULL,
	`answer` LONGBLOB NOT NULL,
	`dateTimeStart` DATETIME NOT NULL,
	`dateTimeEnd` DATETIME NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`testId`)
);

CREATE TABLE `StudentTest` (
	`studentId` INT NOT NULL,
	`testId` INT NOT NULL,
	`score` varchar(255) NOT NULL,
	`feedback` TEXT NOT NULL,
	`doAt` DATETIME NOT NULL,
	`feedbackAt` DATETIME NOT NULL
);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk0` FOREIGN KEY (`commentParentId`) REFERENCES `Comment`(`commentId`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk1` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`lessonId`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk2` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`);

ALTER TABLE `Student` ADD CONSTRAINT `Student_fk0` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`);

ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_fk0` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`);

ALTER TABLE `Course` ADD CONSTRAINT `Course_fk0` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`teacherId`);

ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_fk0` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`);

ALTER TABLE `StudentCourse` ADD CONSTRAINT `StudentCourse_fk0` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentId`);

ALTER TABLE `StudentCourse` ADD CONSTRAINT `StudentCourse_fk1` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`);

ALTER TABLE `Test` ADD CONSTRAINT `Test_fk0` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`);

ALTER TABLE `StudentTest` ADD CONSTRAINT `StudentTest_fk0` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentId`);

ALTER TABLE `StudentTest` ADD CONSTRAINT `StudentTest_fk1` FOREIGN KEY (`testId`) REFERENCES `Test`(`testId`);

ALTER TABLE `StudentTest` ADD CONSTRAINT `unique_key` Unique key (`studentId`, `testId`);

ALTER TABLE `StudentCourse` ADD CONSTRAINT `unique_key` Unique key (`studentId`, `courseId`);