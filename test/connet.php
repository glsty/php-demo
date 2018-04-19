<?php
@header('Content-type: text/html;charset=UTF-8');

$servername = "127.0.0.1";
$username = "cont";
$password = "fbb50a1222";
 
// 创建连接
$conn = mysql_connect($servername, $username, $password);
 
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
//echo "连接成功";

mysql_select_db("cont",$conn);
/*mysql_query("set names utf8");*/
/*$sql ="CREATE TABLE Persons(
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id),
	userName varchar(20),
	tel char(11),
	age varchar(3)
)";*/
/*mysql_query("insert into Persons(userName,tel,age) VALUES   ('捧名扬','13813813838','20')");
mysql_query("insert into Persons(userName,tel,age) VALUES  ('田小童','12312312323','20')");*/
$res = mysql_query("select * from Persons where age='20'");
while ($r = mysql_fetch_array($res)){
	echo $r['age'].$r['userName'].'<br/>';
}
?>