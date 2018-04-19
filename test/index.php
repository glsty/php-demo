<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17/017
 * Time: 9:41
 */
@header('Content-type: text/html;charset=UTF-8');

class Car {
    var $color = 'red';
    var $num = -3;
    function Car($color="yellow"){
        $this->color = $color;
    }
    function what_color(){
        return $this->num = -$this->num;
       // return $this->color;
    }
    function child(){
    	echo $this->color;
    }
}
/*$a = new Car("red");

echo  $a->what_color();*/
 
 /**
 * 
 */
 class pp extends Car{
 	
 	function __construct(){
 		parent::child();
 		# code...
 	}
 }
 $ClassName = new pp();
 echo date("y/m/d H:i:s");
 if(!file_exists("welcome.txt"))
{
    die("文件不存在");
}
else
{
    $file=fopen("welcome.txt","r");
}