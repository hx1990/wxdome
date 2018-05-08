/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : yizhengyilong

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2018-05-03 20:40:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(16) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'huangxing', 'f827fd2dab552ec59231e124d7637505');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(16) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('1', '下单时间', '中午订单请在上午11点之前完成，晚上订单请在下午6点之前完成');
INSERT INTO `notice` VALUES ('2', '配送范围', '目前只配送春天花园及周边小区');
INSERT INTO `notice` VALUES ('3', '配送时间', '每天中午和晚上提供配送，中午11点半配送，晚上9点配送');

-- ----------------------------
-- Table structure for orderinfo
-- ----------------------------
DROP TABLE IF EXISTS `orderinfo`;
CREATE TABLE `orderinfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ptitle` varchar(30) NOT NULL,
  `psrc` varchar(60) NOT NULL,
  `stepper` int(10) NOT NULL,
  `user` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(30) NOT NULL,
  `posttime` datetime NOT NULL,
  `sendtime` datetime NOT NULL,
  `price` int(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderinfo
-- ----------------------------
INSERT INTO `orderinfo` VALUES ('1', '一蒸一笼', '/pic/4.jpg', '3', 'hx', '13567889', '502', '2018-05-04 10:10:00', '2018-05-04 13:10:00', '16');

-- ----------------------------
-- Table structure for productlist
-- ----------------------------
DROP TABLE IF EXISTS `productlist`;
CREATE TABLE `productlist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `price` int(3) NOT NULL,
  `src` varchar(64) NOT NULL,
  `sales` int(11) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `evaluate` varchar(255) DEFAULT NULL COMMENT '评价',
  `specification` varchar(255) DEFAULT NULL COMMENT '规格',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of productlist
-- ----------------------------
INSERT INTO `productlist` VALUES ('1', '笋丁鲜肉烧麦', '店铺招牌', '9', '/pic/1.jpg', '0', '笋丁和新鲜猪肉馅搭配，皮薄馅多，口感十足', '', null);
INSERT INTO `productlist` VALUES ('2', '笋丁鲜肉烧麦+小混沌', '店铺招牌', '15', '/pic/2.jpg', '0', '一份笋丁鲜肉烧麦和一份手工古早小混沌', null, null);
INSERT INTO `productlist` VALUES ('3', '酱香牛肉荷叶蒸饭 ', '店铺招牌', '25', '/pic/3.jpg', '0', '糯米饭+白米饭+肉末秘制。荷叶饭主要用公司统一标准200克。嫌少勿点谢谢。', null, null);
INSERT INTO `productlist` VALUES ('4', '虾仁鲜肉烧麦', '店铺招牌', '14', '/pic/4.jpg', '0', '笋丁鲜虾仁和新鲜猪肉馅搭配，皮薄馅多，口感十足', null, null);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `wxname` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`,`wxname`),
  KEY `wxname` (`wxname`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', '痛定思痛', '黄星', '春天花园2幢2单元402', '18626897626');

-- ----------------------------
-- Table structure for xiaoqulist
-- ----------------------------
DROP TABLE IF EXISTS `xiaoqulist`;
CREATE TABLE `xiaoqulist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xiaoqulist
-- ----------------------------
INSERT INTO `xiaoqulist` VALUES ('1', '春天花园');
INSERT INTO `xiaoqulist` VALUES ('2', '南都花园');
INSERT INTO `xiaoqulist` VALUES ('3', '湖畔花园');
INSERT INTO `xiaoqulist` VALUES ('4', '政新花园');
