-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 192.168.99.100    Database: cryptocaddy
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_code` varchar(10) NOT NULL,
  `currency_name` varchar(45) NOT NULL,
  PRIMARY KEY (`currency_id`),
  UNIQUE KEY `currency_code_UNIQUE` (`currency_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange`
--

DROP TABLE IF EXISTS `exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange` (
  `exchange_id` int(11) NOT NULL AUTO_INCREMENT,
  `exchange_name` varchar(45) NOT NULL,
  PRIMARY KEY (`exchange_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange`
--

LOCK TABLES `exchange` WRITE;
/*!40000 ALTER TABLE `exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market`
--

DROP TABLE IF EXISTS `market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `market` (
  `market_id` int(11) NOT NULL AUTO_INCREMENT,
  `exchange_id` int(11) NOT NULL,
  `trading_currency_id` int(11) NOT NULL,
  `base_currency_id` int(11) NOT NULL,
  `market_name` varchar(45) NOT NULL,
  PRIMARY KEY (`market_id`),
  UNIQUE KEY `market_name_exchange_idk` (`exchange_id`,`market_name`),
  KEY `trading_currency_id_fk` (`trading_currency_id`),
  KEY `exchange_id_fk_idx` (`exchange_id`),
  KEY `base_currency_id_fk_idx` (`base_currency_id`),
  CONSTRAINT `base_currency_id_fk` FOREIGN KEY (`base_currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `exchange_id_fk` FOREIGN KEY (`exchange_id`) REFERENCES `exchange` (`exchange_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `trading_currency_id_fk` FOREIGN KEY (`trading_currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market`
--

LOCK TABLES `market` WRITE;
/*!40000 ALTER TABLE `market` DISABLE KEYS */;
/*!40000 ALTER TABLE `market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_username` char(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_jwt_UNIQUE` (`user_username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_exchange`
--

DROP TABLE IF EXISTS `user_exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_exchange` (
  `user_exchange_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `exchange_id` int(11) NOT NULL,
  `user_exchange_nickname` varchar(45) DEFAULT NULL,
  `user_exchange_apikey` varchar(128) NOT NULL,
  `user_exchange_apisecret` varchar(128) NOT NULL,
  PRIMARY KEY (`user_exchange_id`),
  UNIQUE KEY `idx_user_exchange_nickname` (`user_id`,`user_exchange_nickname`),
  KEY `idx_fk_user_exchange_exchange_id` (`exchange_id`),
  CONSTRAINT `fk_user_exchange_exchange_id` FOREIGN KEY (`exchange_id`) REFERENCES `exchange` (`exchange_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_exchange_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_exchange`
--

LOCK TABLES `user_exchange` WRITE;
/*!40000 ALTER TABLE `user_exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_exchange_gdax`
--

DROP TABLE IF EXISTS `user_exchange_gdax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_exchange_gdax` (
  `user_exchange_id` int(11) NOT NULL,
  `user_exchange_gdax_paraphrase` varchar(45) NOT NULL,
  PRIMARY KEY (`user_exchange_id`),
  CONSTRAINT `user_exchange_id_fk` FOREIGN KEY (`user_exchange_id`) REFERENCES `user_exchange` (`user_exchange_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_exchange_gdax`
--

LOCK TABLES `user_exchange_gdax` WRITE;
/*!40000 ALTER TABLE `user_exchange_gdax` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_exchange_gdax` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-01  1:28:51
