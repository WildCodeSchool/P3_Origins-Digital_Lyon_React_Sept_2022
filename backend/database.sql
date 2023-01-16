SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
/*password hash par default : "password"*/
  `hashedPassword` VARCHAR(255) NOT NULL DEFAULT '$argon2id$v=19$m=65536,t=5,p=1$lcKpgL0a6dCrPnIyv0NMYg$gAyEeuwiBd9KAlcwkDb9WjyZHodEkYwGnBC0oTebpfk',
  `is_admin` TINYINT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


/*Remplissage de la table user avec des users factice*/

INSERT INTO `User`(firstname, lastname, email, is_admin)
VALUES ("admin", "admin", "admin@email.com", 1),
("John", "Doe", "johndoe@email.com", 0),
("Guy", "Chauveau", "guy@email.com", 0),
("Sabine", "De Sousa", "sabine@email.com", 0),
("Bernard", "Roche", "bernard@email.com", 0),
("Dorothée", "Maillet", "dorothée@email.com", 0);

DROP TABLE IF EXISTS `Videos`;
CREATE TABLE IF NOT EXISTS `Videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(300) NOT NULL DEFAULT "test",
  `description` TEXT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `img` VARCHAR(300) NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_playlists`;
CREATE TABLE IF NOT EXISTS `User_has_playlists` (
  `User_id` INT NOT NULL,
  `Videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Videos_id`),
  CONSTRAINT `fk_User_has_videos_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_favorite`;
CREATE TABLE IF NOT EXISTS `User_has_favorite` (
  `User_id` INT NOT NULL,
  `videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `videos_id`),
  CONSTRAINT `fk_User_has_videos_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos2`
    FOREIGN KEY (`videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Category`;
CREATE TABLE IF NOT EXISTS `Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Videos_has_Category`;
CREATE TABLE IF NOT EXISTS `Videos_has_Category` (
  `Videos_id` INT NOT NULL,
  `Category_id` INT NOT NULL,
  PRIMARY KEY (`Videos_id`, `Category_id`),
  CONSTRAINT `fk_Videos_has_Category_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`),
  CONSTRAINT `fk_Videos_has_Category_Category1`
    FOREIGN KEY (`Category_id`)
    REFERENCES `origins_digital`.`Category` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Videos_has_comments`;
CREATE TABLE IF NOT EXISTS `Videos_has_comments` (
  `Videos_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`Videos_id`, `User_id`),
  CONSTRAINT `fk_Videos_has_User_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`),
  CONSTRAINT `fk_Videos_has_User_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `origins_digital`.`User` (`id`))
ENGINE = InnoDB;





/* On reactive la verification des clés étrangères*/
SET foreign_key_checks = 1;