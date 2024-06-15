-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 14, 2024 at 05:30 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `adminId` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`adminId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`adminId`, `fullname`, `password`, `email`, `phone`) VALUES
(1, 'John Doe', 'password123', 'john@example.com', '1234567891'),
(2, 'utpal', '12345678', 'admin@gmail.com', '8473003156'),
(3, 'utpald', '12345678', 'ud78764@gmail.com', '8473003186');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
  `notes` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_customer__fk` (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `cid`, `status`, `notes`) VALUES
(1, 1, 'CANCELLED', NULL),
(2, 1, 'CONFIRMED', NULL),
(4, 3, 'CANCELLED', NULL),
(5, 1, 'PENDING', NULL),
(6, 4, 'CONFIRMED', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cid`, `fullname`, `email`, `password`, `phone`) VALUES
(1, 'Utpal Sangma', 'utpal@gmail.com', '$2y$10$svbagAgViNOEJADAMZCv7.RJDptYHr6zEZz6L0QbFHwcv8xiJSjyu', '9001991001'),
(3, 'Asha', 'asha@gmail.com', '$2y$10$OTAGJ.UA/wzFBLbpetJFc.5Avf4lD6ZTDuq88q65lN3tlxV99Blha', '8475002568'),
(4, 'pidim g momin', 'pidimmomin21@gmail.com', '$2y$10$EV12m4UoNOJsQd4W4LWnreptCPSERB0KUqU7oTmpfyWN16l0KrRmG', '9362284315'),
(5, 'utpal das', 'user@gmail.com', '$2y$10$UrFNBKoZzCk5yrGeiLN9feIFXt3zNfVEEXEhztokfu2O47Tjq0tES', '08473003186');

-- --------------------------------------------------------

--
-- Table structure for table `pricing`
--

DROP TABLE IF EXISTS `pricing`;
CREATE TABLE IF NOT EXISTS `pricing` (
  `pricing_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `nights` int(11) NOT NULL,
  `total_price` double NOT NULL,
  `booked_date` date NOT NULL,
  PRIMARY KEY (`pricing_id`),
  KEY `pricing_booking__fk` (`booking_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pricing`
--

INSERT INTO `pricing` (`pricing_id`, `booking_id`, `nights`, `total_price`, `booked_date`) VALUES
(1, 1, 1, 250, '2024-02-28'),
(2, 2, 1, 180, '2024-05-15'),
(3, 3, 3, 2000, '2024-05-15'),
(4, 4, 1, 150, '2024-05-16'),
(5, 5, 2, 500, '2024-05-16'),
(6, 6, 1, 250, '2024-05-16');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` varchar(30) NOT NULL,
  `end` varchar(30) NOT NULL,
  `type` enum('Single','Double','Deluxe') DEFAULT 'Single',
  `requirement` enum('No Preference','Non Smoking','Smoking') DEFAULT 'No Preference',
  `adults` int(2) NOT NULL,
  `children` int(2) DEFAULT '0',
  `requests` varchar(500) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `start`, `end`, `type`, `requirement`, `adults`, `children`, `requests`, `timestamp`, `hash`) VALUES
(1, '2024-02-29', '2024-03-01', 'Deluxe', 'Smoking', 2, 0, '', '2024-02-28 13:23:20', '65df33c83f5fa'),
(2, '2024-05-17', '2024-05-18', 'Double', 'Non Smoking', 3, 2, 'no', '2024-05-15 05:17:48', '6644457cc3aaa'),
(4, '2024-05-18', '2024-05-19', 'Single', 'Non Smoking', 1, 0, 'Guiter', '2024-05-15 19:12:52', '664509344d2d7'),
(5, '2024-05-18', '2024-05-20', 'Deluxe', 'Non Smoking', 2, 2, 'Extra Towel', '2024-05-16 07:36:55', '6645b797cbaf4'),
(6, '2024-05-18', '2024-05-19', 'Deluxe', 'Smoking', 2, 2, '', '2024-05-16 10:15:16', '6645dcb4e9910');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
