#DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
`uid` varchar(255) NOT NULL,
`email` varchar(254) NOT NULL,
`name` varchar(48) DEFAULT NULL,
PRIMARY KEY (`uid`),
UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
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

#DROP TABLE IF EXISTS `user_exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_exchange` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`uid` varchar(255) NOT NULL,
`name` varchar(45) DEFAULT NULL,
`key` varchar(128) NOT NULL,
`secret` varchar(128) NOT NULL,
`passphrase` varchar(128) DEFAULT NULL,
PRIMARY KEY (`id`),
CONSTRAINT `user_uid_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_exchange`
--

LOCK TABLES `user_exchange` WRITE;
/*!40000 ALTER TABLE `user_exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_exchange` ENABLE KEYS */;
UNLOCK TABLES;
