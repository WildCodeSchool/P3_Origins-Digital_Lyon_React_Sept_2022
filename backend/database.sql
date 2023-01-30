SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `passwordToken` varchar(200),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;



DROP TABLE IF EXISTS `Videos`;
CREATE TABLE IF NOT EXISTS `Videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(300) NULL,
  `description` TEXT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `img` VARCHAR(300) NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  `promote` TINYINT NULL,
  `category_id` INT NOT NULL,
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
  `img` VARCHAR(300) NOT NULL DEFAULT "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png",
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;

INSERT INTO `Category` (name,description,img) VALUES
("Call of Duty","Call of Duty ou COD est une série de jeux vidéo de tir à la première personne sur la guerre.","https://hd2.tudocdn.net/913234?w=646&h=284"),
("TFT","Teamfight Tactics (abrégé TFT, parfois Combat Tactique (abrégé CT) en français) est un jeu vidéo de type auto battler développé et édité par Riot Games. Il prend place dans l'univers de League of Legends et est basé sur le jeu Dota Auto Chess (en), où le joueur affronte sept adversaires en ligne, qu'il doit combattre en formant une équipe afin d'être le dernier à rester en vie.","https://image.jeuxvideo.com/medias/156224/1562240888-2453-jaquette-avant.jpg"),
("League of Legends","League of Legends (abrégé LoL) est un jeu vidéo sorti en 2009 de type arène de bataille en ligne.Le mode principal du jeu voit s'affronter deux équipes de 5 joueurs en temps réel dans des parties d'une durée d'environ une demi-heure, chaque équipe occupant et défendant sa propre base sur la carte.","https://www.pedagojeux.fr/wp-content/uploads/2019/11/1280x720_LoL.jpg"),
("Valorant","Valorant est un jeu vidéo free-to-play de tir à la première personne en multijoueur développé et édité par Riot Games.Dans le mode de jeu principal, deux équipes de cinq joueurs s'affrontent et les agents utilisent un système économique pour acheter des utilitaires et des armes. Une équipe est en attaque et une est en défense : l'équipe attaquante dispose d'une bombe qu'elle doit poser sur un site. Si elle est suffisamment protégée et qu'elle explose, les attaquants gagnent un point. En revanche, si l'équipe en défense réussit à désamorcer la bombe ou si le temps est écoulé, ce sont eux qui gagnent un point.","https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png"),
("Fortnite","Fortnite est un jeu de battle royale « joueur contre joueur » avec un maximum de 100 joueurs, jouant seul, en équipe de deux, de trois ou à quatre.","https://www.webwise.ie/wp-content/uploads/2018/04/BattleRoyale.png"),
("Counter-Strike: Global Offensive","FValorant est un jeu vidéo free-to-play de tir à la première personne en multijoueur développé et édité par Riot Games.Dans le mode de jeu principal, deux équipes de cinq joueurs s'affrontent et les agents utilisent un système économique pour acheter des utilitaires et des armes. Une équipe est en attaque et une est en défense : l'équipe attaquante dispose d'une bombe qu'elle doit poser sur un site. Si elle est suffisamment protégée et qu'elle explose, les attaquants gagnent un point. En revanche, si l'équipe en défense réussit à désamorcer la bombe ou si le temps est écoulé, ce sont eux qui gagnent un point.","https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1641233427");

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `User_id` INT NOT NULL,
  `Videos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `origins_digital`.`User` (`id`),
  CONSTRAINT `fk_comment_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`)
)
ENGINE = InnoDB;

/* On reactive la verification des clés étrangères*/
SET foreign_key_checks = 1;