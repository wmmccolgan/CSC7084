-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 15, 2024 at 11:41 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AllTheFeelz`
--

-- --------------------------------------------------------

--
-- Table structure for table `Context`
--

CREATE TABLE `Context` (
  `contextID` int(11) NOT NULL,
  `contextlabel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Context`
--

INSERT INTO `Context` (`contextID`, `contextlabel`) VALUES
(1, 'Work'),
(2, 'Home'),
(3, 'School'),
(4, 'Relationships'),
(5, 'Security'),
(6, 'Joyful practice');

-- --------------------------------------------------------

--
-- Table structure for table `reading`
--

CREATE TABLE `reading` (
  `ReadingId` int(255) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `enjoyment` int(11) NOT NULL,
  `sadness` int(11) NOT NULL,
  `anger` int(11) NOT NULL,
  `contempt` int(11) NOT NULL,
  `disgust` int(11) NOT NULL,
  `fear` int(11) NOT NULL,
  `surprise` int(11) NOT NULL,
  `Context` int(11) NOT NULL,
  `UserComment` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reading`
--

INSERT INTO `reading` (`ReadingId`, `timestamp`, `enjoyment`, `sadness`, `anger`, `contempt`, `disgust`, `fear`, `surprise`, `Context`, `UserComment`, `user_id`) VALUES
(2, '2024-03-14 21:47:48.802492', 2, 5, 4, 1, 1, 3, 7, 5, 'Car died. Really annoyed', 1),
(6, '2024-03-15 00:00:00.000000', 2, 3, 4, 3, 2, 6, 6, 4, 'adsfsdf', 4),
(7, '2024-03-15 00:00:00.000000', 2, 3, 4, 3, 2, 6, 6, 4, 'adsfsdf', 4),
(9, '2024-03-15 00:00:00.000000', 5, 3, 3, 4, 4, 5, 3, 5, 'ja;shjdfk;ajhsdfkjasdhf', 4),
(10, '2024-03-15 00:00:00.000000', 2, 3, 4, 3, 2, 6, 6, 4, 'From Postman', 6),
(11, '2024-03-15 00:00:00.000000', 2, 2, 5, 6, 2, 7, 1, 3, 'Late submitting webapp assignment, but pleased to have learing regardless of the grade.', 6),
(12, '2024-03-15 22:39:09.750253', 10, 1, 1, 1, 1, 1, 5, 1, 'Just a perfect day. I\'m glad I spent it with you.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `UserEmail` varchar(225) NOT NULL,
  `UserFirst` varchar(225) NOT NULL,
  `UserLast` varchar(225) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `UserEmail`, `UserFirst`, `UserLast`, `username`, `password`) VALUES
(1, 'wmccolgan01@qub.ac.uk', 'William', 'McColgan', 'willymc', 'Password123!'),
(2, 'william@mccolgans.ie', 'William', 'McColgan', 'WorkWilly', '123Password!'),
(3, 'usertwo@gmail.com', 'Post', 'Man', 'PostMan', 'Password'),
(4, 'jakesnake@hotmail.com', 'Jake', 'Snake', 'jakesnake', 'passpasspass'),
(5, 'john@doe.co.uk', 'John', 'Doe', 'johndoe', 'password1!'),
(6, 'usertwo@gmail.com', 'Post', 'Man', 'manopost', 'Password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Context`
--
ALTER TABLE `Context`
  ADD PRIMARY KEY (`contextID`);

--
-- Indexes for table `reading`
--
ALTER TABLE `reading`
  ADD PRIMARY KEY (`ReadingId`),
  ADD KEY `userid` (`user_id`),
  ADD KEY `Context` (`Context`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Context`
--
ALTER TABLE `Context`
  MODIFY `contextID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reading`
--
ALTER TABLE `reading`
  MODIFY `ReadingId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reading`
--
ALTER TABLE `reading`
  ADD CONSTRAINT `reading_ibfk_1` FOREIGN KEY (`Context`) REFERENCES `Context` (`contextID`),
  ADD CONSTRAINT `reading_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
