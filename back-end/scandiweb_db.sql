-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 17, 2023 at 12:13 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scandiweb_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `measuring_units`
--

CREATE TABLE `measuring_units` (
  `unit_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `unit_name` varchar(50) NOT NULL,
  `measure_unit` varchar(50) NOT NULL,
  `caption_end` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measuring_units`
--

INSERT INTO `measuring_units` (`unit_id`, `type_id`, `unit_name`, `measure_unit`, `caption_end`) VALUES
(1, 1, 'Size', 'MB', 'MB'),
(2, 2, 'Weight', 'KG', 'KG'),
(3, 3, 'Height', 'CM', ''),
(4, 3, 'Width', 'CM', ''),
(5, 3, 'Length', 'CM', '');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `SKU` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` double(10,2) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `SKU`, `name`, `price`, `type_id`) VALUES
(116, '4558-Dvd', 'Dvd-disc', 150.00, 1),
(120, '9429-Dvd', 'Dvd-disc', 50.00, 1),
(121, '5429-Dvd', 'Dvd-disc', 50.00, 1),
(124, '500-Dvd', 'Dvd-disc', 50.00, 1),
(126, '800', 'Dvd-disc', 50.00, 1),
(127, '900', 'dvd', 10.00, 1),
(129, '901', 'dvd', 10.00, 1),
(130, '902', 'dvd', 10.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_attributes`
--

CREATE TABLE `product_attributes` (
  `attribute_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `attribute_value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_attributes`
--

INSERT INTO `product_attributes` (`attribute_id`, `unit_id`, `product_id`, `attribute_value`) VALUES
(73, 1, 114, 5000),
(74, 1, 115, 5000),
(75, 1, 116, 7000),
(76, 1, 117, 5000),
(77, 1, 118, 5000),
(78, 1, 119, 7000);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `type_id` int(11) NOT NULL,
  `type_value` varchar(20) NOT NULL,
  `type_desc` varchar(75) NOT NULL,
  `label` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`type_id`, `type_value`, `type_desc`, `label`) VALUES
(1, 'DVD', 'Please, provide disc space in MB.Decimals are not allowed.', 'Size'),
(2, 'Book', 'Please, provide weight in KG.Decimal numbers are allowed. ', 'Weight'),
(3, 'Furniture', 'Please, provide dimensions in HxWxL format.Decimal numbers are allowed. ', 'Dimensions');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `measuring_units`
--
ALTER TABLE `measuring_units`
  ADD PRIMARY KEY (`unit_id`),
  ADD UNIQUE KEY `unit_name` (`unit_name`),
  ADD KEY `pro_type` (`type_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `SKU` (`SKU`),
  ADD KEY `Products` (`type_id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`attribute_id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`type_id`),
  ADD UNIQUE KEY `type_value` (`type_value`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `measuring_units`
--
ALTER TABLE `measuring_units`
  MODIFY `unit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `measuring_units`
--
ALTER TABLE `measuring_units`
  ADD CONSTRAINT `pro_type` FOREIGN KEY (`type_id`) REFERENCES `product_type` (`type_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `Products` FOREIGN KEY (`type_id`) REFERENCES `product_type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
