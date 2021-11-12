-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2020 at 01:20 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `citas`
--

CREATE TABLE `citas` (
  `id_citas` int(11) NOT NULL,
  `id_paciente_citas` int(11) NOT NULL,
  `fecha_citas` date NOT NULL,
  `hora_citas` time NOT NULL,
  `duracion_citas` int(11) NOT NULL,
  `observacion_citas` varchar(255) NOT NULL,
  `id_estados` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `especificaciones_procedimientos`
--

CREATE TABLE `especificaciones_procedimientos` (
  `id_especificaciones_procedimientos` int(11) NOT NULL,
  `nombre_especificaciones_procedimientos` varchar(255) NOT NULL,
  `costo_especificaciones_procedimientos` float NOT NULL,
  `duracion_especificaciones_procedimientos` int(11) NOT NULL,
  `id_procedimientos` int(11) NOT NULL,
  `id_estados` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modificado` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `especificaciones_procedimientos`
--

INSERT INTO `especificaciones_procedimientos` (`id_especificaciones_procedimientos`, `nombre_especificaciones_procedimientos`, `costo_especificaciones_procedimientos`, `duracion_especificaciones_procedimientos`, `id_procedimientos`, `id_estados`, `created`, `modificado`) VALUES
(1, 'Подмышки', 650, 30, 1, 3, '2020-07-31 08:00:18', '0000-00-00 00:00:00'),
(2, 'Лицо', 800, 30, 1, 3, '2020-07-31 08:01:59', '0000-00-00 00:00:00'),
(3, 'Верхняя губа', 250, 30, 1, 3, '2020-07-31 08:02:14', '0000-00-00 00:00:00'),
(4, 'Грудь', 800, 30, 1, 3, '2020-07-31 08:02:31', '0000-00-00 00:00:00'),
(5, 'Плечи', 850, 30, 1, 3, '2020-07-31 08:02:46', '0000-00-00 00:00:00'),
(6, 'Рука до локтя + пальцы', 1000, 30, 1, 3, '2020-07-31 08:03:09', '0000-00-00 00:00:00'),
(7, 'Линия живота', 500, 30, 1, 3, '2020-07-31 08:03:24', '0000-00-00 00:00:00'),
(8, 'Глубокое бикини', 850, 30, 1, 3, '2020-07-31 08:03:38', '0000-00-00 00:00:00'),
(9, 'Голень + пальцы + колена', 1000, 30, 1, 3, '2020-07-31 08:03:56', '0000-00-00 00:00:00'),
(10, 'Ноги полностью', 1300, 30, 1, 3, '2020-07-31 08:06:15', '0000-00-00 00:00:00'),
(11, 'PRX-T33', 2500, 60, 2, 3, '2020-07-31 08:29:25', '0000-00-00 00:00:00'),
(12, 'Ботокс', 200, 30, 9, 3, '2020-07-31 08:29:54', '0000-00-00 00:00:00'),
(13, 'Ксеомин', 200, 30, 9, 3, '2020-07-31 08:30:12', '0000-00-00 00:00:00'),
(14, 'Ботулакс', 150, 30, 9, 3, '2020-07-31 08:30:36', '0000-00-00 00:00:00'),
(15, 'Диспорт', 100, 30, 9, 3, '2020-07-31 08:33:11', '0000-00-00 00:00:00'),
(16, 'Мезоботокс', 80, 30, 9, 3, '2020-07-31 08:34:24', '0000-00-00 00:00:00'),
(17, 'Классический + ароматерапия', 1500, 60, 10, 3, '2020-07-31 08:36:58', '0000-00-00 00:00:00'),
(18, 'Релакс + ароматерапия', 2000, 60, 10, 3, '2020-07-31 08:37:15', '0000-00-00 00:00:00'),
(19, 'Антицеллюлитный', 1200, 60, 10, 3, '2020-07-31 08:38:16', '0000-00-00 00:00:00'),
(20, 'Линфодренажный', 1500, 60, 10, 3, '2020-07-31 08:38:33', '0000-00-00 00:00:00'),
(21, 'Сегментированный', 800, 30, 10, 3, '2020-07-31 08:38:50', '0000-00-00 00:00:00'),
(22, 'Тайский традиционный', 3000, 90, 10, 3, '2020-07-31 08:39:11', '0000-00-00 00:00:00'),
(23, 'Prueba', 500, 30, 11, 4, '2020-08-08 20:27:27', '0000-00-00 00:00:00'),
(24, 'preparado prueba', 500, 30, 11, 4, '2020-08-08 22:47:00', '0000-00-00 00:00:00'),
(25, 'fddsfs', 250, 45, 13, 4, '2020-08-08 22:59:49', '0000-00-00 00:00:00'),
(26, 'frer', 450, 33, 13, 4, '2020-08-08 23:34:08', '0000-00-00 00:00:00'),
(27, 'dsafd', 452, 60, 13, 4, '2020-08-08 23:34:36', '0000-00-00 00:00:00'),
(28, 'Ejemplo', 500, 60, 16, 4, '2020-08-09 11:24:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `id_estados` int(11) NOT NULL,
  `nombre_estados` varchar(100) NOT NULL,
  `tabla_estados` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id_estados`, `nombre_estados`, `tabla_estados`, `created`, `modified`) VALUES
(1, 'ACTIVO', 'procedimientos', '2020-08-01 12:22:43', '0000-00-00 00:00:00'),
(2, 'INACTIVO', 'procedimientos', '2020-08-01 12:32:18', '0000-00-00 00:00:00'),
(3, 'ACTIVO', 'especificaciones_procedimientos', '2020-08-01 12:32:39', '0000-00-00 00:00:00'),
(4, 'INACTIVO', 'especificaciones_procedimientos', '2020-08-01 12:22:53', '0000-00-00 00:00:00'),
(5, 'ACTIVO', 'citas', '2020-08-02 09:43:08', '0000-00-00 00:00:00'),
(6, 'CANCELADO', 'citas', '2020-08-04 13:07:06', '0000-00-00 00:00:00'),
(7, 'INACTIVO', 'citas', '2020-08-02 09:43:29', '0000-00-00 00:00:00'),
(8, 'PAGADO', 'citas', '2020-08-02 09:44:16', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `extra_procedimientos`
--

CREATE TABLE `extra_procedimientos` (
  `id_extra_procedimientos` int(11) NOT NULL,
  `id_procedimientos` int(11) NOT NULL,
  `id_especificacion_procedimientos` int(11) DEFAULT NULL,
  `id_citas` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `costo_extra_procedimientos` float NOT NULL,
  `descuento_extra_procedimientos` int(11) NOT NULL,
  `orden_extra_procedimientos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id_pacientes` int(11) NOT NULL,
  `imya_pacientes` varchar(255) NOT NULL,
  `familia_pacientes` varchar(255) NOT NULL,
  `ochestvo_pacientes` varchar(255) NOT NULL,
  `telefon_pacientes` varchar(20) NOT NULL,
  `fecha_n_pacientes` date NOT NULL,
  `observacion_pacientes` varchar(255) NOT NULL,
  `n_pasporte_pacientes` varchar(40) NOT NULL,
  `created_pacientes` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_pacientes` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`id_pacientes`, `imya_pacientes`, `familia_pacientes`, `ochestvo_pacientes`, `telefon_pacientes`, `fecha_n_pacientes`, `observacion_pacientes`, `n_pasporte_pacientes`, `created_pacientes`, `modified_pacientes`) VALUES
(10, 'Наталья', 'Иванова', 'Ивановна', '+7-(905)-041-01-45', '1998-03-02', '', '', '2020-07-25 19:04:06', '0000-00-00 00:00:00'),
(11, 'Елена', 'Старкова', 'Витальевна', '+7-(960)-584-69-66', '1876-02-25', '', '', '2020-07-26 14:44:36', '0000-00-00 00:00:00'),
(12, 'Ирина', 'Степанова', 'Ивановна', '+7-(952)-663-89-44', '1995-03-04', '', '', '2020-07-26 14:47:31', '0000-00-00 00:00:00'),
(13, 'Карина', 'Абрилова', 'Романовна', '+7-(965)-878-55-66', '1987-05-24', '', '', '2020-07-26 14:50:41', '0000-00-00 00:00:00'),
(14, 'Надежда', 'Неструева', 'Павловна', '+7-(955)-789-55-53', '1986-08-04', '', '', '2020-07-26 15:12:28', '0000-00-00 00:00:00'),
(16, 'Александра', 'Тарасова', 'Николаевна', '+7-(970)-466-89-99', '1988-05-25', '', '', '2020-08-03 08:29:43', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `procedimientos`
--

CREATE TABLE `procedimientos` (
  `id_procedimientos` int(11) NOT NULL,
  `nombre_procedimientos` varchar(100) NOT NULL,
  `precio_procedimientos` float NOT NULL,
  `duracion_procedimientos` int(11) NOT NULL,
  `id_tipo_procedimientos` int(11) NOT NULL,
  `id_estado_procedimientos` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `procedimientos`
--

INSERT INTO `procedimientos` (`id_procedimientos`, `nombre_procedimientos`, `precio_procedimientos`, `duracion_procedimientos`, `id_tipo_procedimientos`, `id_estado_procedimientos`, `created`, `modified`) VALUES
(1, 'Лазерная эпиляция', 0, 0, 1, 1, '2020-07-30 14:04:07', '0000-00-00 00:00:00'),
(2, 'Пилинг', 0, 0, 2, 1, '2020-07-30 14:07:38', '0000-00-00 00:00:00'),
(3, 'Ультразвуковая чистка + механическая', 1000, 90, 5, 1, '2020-07-30 14:08:03', '0000-00-00 00:00:00'),
(4, 'Лимфодренажная капсула', 1000, 60, 5, 1, '2020-07-30 14:08:26', '0000-00-00 00:00:00'),
(5, 'Кавитация', 1000, 60, 3, 1, '2020-07-30 14:09:20', '0000-00-00 00:00:00'),
(6, 'Радиоволновой лифтинг', 1000, 60, 3, 1, '2020-07-30 14:09:38', '0000-00-00 00:00:00'),
(7, 'Вакуумный массаж', 1200, 30, 3, 1, '2020-07-30 14:09:56', '0000-00-00 00:00:00'),
(8, 'Прессотерапия', 900, 30, 5, 1, '2020-07-30 14:10:53', '0000-00-00 00:00:00'),
(9, 'Ботулинотерапия', 0, 0, 4, 1, '2020-07-30 14:11:39', '0000-00-00 00:00:00'),
(10, 'Массаж', 0, 0, 1, 1, '2020-07-30 14:20:55', '0000-00-00 00:00:00'),
(11, 'prueba 53', 0, 0, 2, 2, '2020-08-08 16:03:14', '0000-00-00 00:00:00'),
(12, 'prueba2', 1500, 30, 5, 2, '2020-08-08 16:08:07', '0000-00-00 00:00:00'),
(13, 'Prueba 3', 0, 0, 1, 2, '2020-08-08 18:06:04', '0000-00-00 00:00:00'),
(14, 'prueba 2', 200, 45, 5, 2, '2020-08-08 20:15:38', '0000-00-00 00:00:00'),
(15, 'Masaje', 250, 30, 5, 2, '2020-08-09 11:24:06', '0000-00-00 00:00:00'),
(16, 'prueba', 0, 0, 1, 2, '2020-08-09 11:24:30', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_procedimientos`
--

CREATE TABLE `tipo_procedimientos` (
  `id_tipo_procedimientos` int(11) NOT NULL,
  `nombre_tipo_procedimientos` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_procedimientos`
--

INSERT INTO `tipo_procedimientos` (`id_tipo_procedimientos`, `nombre_tipo_procedimientos`, `created`, `modified`) VALUES
(1, 'ПО ЗОНАМ', '2020-07-28 06:47:13', '0000-00-00 00:00:00'),
(2, 'ПО ПРЕПАРАТАМ', '2020-07-28 06:48:06', '2020-07-28 06:48:06'),
(3, 'ПО КОЛ-ВУ ЗОН', '2020-07-28 07:29:09', '0000-00-00 00:00:00'),
(4, 'ПО ЭДИНИЦАМ', '2020-07-30 13:38:48', '0000-00-00 00:00:00'),
(5, 'БЕЗ ДОП.', '2020-07-30 13:42:12', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_citas`),
  ADD KEY `id_paciente_citas` (`id_paciente_citas`);

--
-- Indexes for table `especificaciones_procedimientos`
--
ALTER TABLE `especificaciones_procedimientos`
  ADD PRIMARY KEY (`id_especificaciones_procedimientos`),
  ADD KEY `id_tipo_procedimientos` (`id_procedimientos`);

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estados`);

--
-- Indexes for table `extra_procedimientos`
--
ALTER TABLE `extra_procedimientos`
  ADD PRIMARY KEY (`id_extra_procedimientos`),
  ADD KEY `id_procedimientos` (`id_procedimientos`),
  ADD KEY `id_citas` (`id_citas`),
  ADD KEY `id_especificacion_procedimientos` (`id_especificacion_procedimientos`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_pacientes`);

--
-- Indexes for table `procedimientos`
--
ALTER TABLE `procedimientos`
  ADD PRIMARY KEY (`id_procedimientos`),
  ADD KEY `id_tipo_procedimientos` (`id_tipo_procedimientos`),
  ADD KEY `id_estado_procedimientos` (`id_estado_procedimientos`);

--
-- Indexes for table `tipo_procedimientos`
--
ALTER TABLE `tipo_procedimientos`
  ADD PRIMARY KEY (`id_tipo_procedimientos`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citas`
--
ALTER TABLE `citas`
  MODIFY `id_citas` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `especificaciones_procedimientos`
--
ALTER TABLE `especificaciones_procedimientos`
  MODIFY `id_especificaciones_procedimientos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `extra_procedimientos`
--
ALTER TABLE `extra_procedimientos`
  MODIFY `id_extra_procedimientos` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_pacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `procedimientos`
--
ALTER TABLE `procedimientos`
  MODIFY `id_procedimientos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tipo_procedimientos`
--
ALTER TABLE `tipo_procedimientos`
  MODIFY `id_tipo_procedimientos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_paciente_citas`) REFERENCES `pacientes` (`id_pacientes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `especificaciones_procedimientos`
--
ALTER TABLE `especificaciones_procedimientos`
  ADD CONSTRAINT `especificaciones_procedimientos_ibfk_1` FOREIGN KEY (`id_procedimientos`) REFERENCES `procedimientos` (`id_procedimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `extra_procedimientos`
--
ALTER TABLE `extra_procedimientos`
  ADD CONSTRAINT `extra_procedimientos_ibfk_1` FOREIGN KEY (`id_citas`) REFERENCES `citas` (`id_citas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `extra_procedimientos_ibfk_2` FOREIGN KEY (`id_procedimientos`) REFERENCES `procedimientos` (`id_procedimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `extra_procedimientos_ibfk_3` FOREIGN KEY (`id_especificacion_procedimientos`) REFERENCES `especificaciones_procedimientos` (`id_especificaciones_procedimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `procedimientos`
--
ALTER TABLE `procedimientos`
  ADD CONSTRAINT `procedimientos_ibfk_1` FOREIGN KEY (`id_tipo_procedimientos`) REFERENCES `tipo_procedimientos` (`id_tipo_procedimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `procedimientos_ibfk_2` FOREIGN KEY (`id_estado_procedimientos`) REFERENCES `estados` (`id_estados`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
