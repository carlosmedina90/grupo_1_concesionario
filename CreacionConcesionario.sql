
CREATE SCHEMA `concesionario_db` ;

USE concesionario_db;

-- Creación de la tabla autos
CREATE TABLE `autos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombreAuto` varchar(45) NOT NULL,
`marca_id` bigint(5) NOT NULL,
`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
`updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
`modelo` bigint(4) NOT NULL,
`cilindraje` bigint(4) NOT NULL,
`precio` decimal(12,0) NOT NULL,
`descuento` bigint(2) NOT NULL,
`color` varchar(45) NOT NULL,
`textoLargo` varchar(450) NOT NULL,
`imagen` varchar(450) NOT NULL,
`estado` varchar(45) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla marca
CREATE TABLE `marcas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `marca` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla user
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `imagen` varchar(45) NOT NULL,
   `category_id` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


-- Creación de la tabla category
CREATE TABLE `category` (
  `id` int(1) unsigned NOT NULL AUTO_INCREMENT,
  `nombreCategory` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

CREATE TABLE cart (
id INT(11) NOT NULL AUTO_INCREMENT,
auto_id INT(11) NOT NULL,
user_id INT(11) UNSIGNED NOT NULL,
reference VARCHAR(100) NOT NULL,
quantity INT(11) NOT NULL,
price DECIMAL(12,0) NOT NULL,
created_at timestamp NOT NULL DEFAULT current_timestamp(),
updated_at timestamp NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY(`id`),
FOREIGN KEY(`auto_id`) REFERENCES autos(`id`),
FOREIGN KEY(`user_id`) REFERENCES users(`id`)
);


