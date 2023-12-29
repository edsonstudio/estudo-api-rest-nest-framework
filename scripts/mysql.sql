CREATE DATABASE db_nest_store;

USE db_nest_store;

CREATE TABLE `db_nest_store`.`tb_product` (
  `id` INT NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `description` TEXT(4000) NOT NULL,
  PRIMARY KEY (`id`));