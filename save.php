<?php

 $name = $_POST["name"];
 $begin = $_POST["begin"];
 $end = $_POST["end"];

 mkdir(data . "/". $name, 0700);
 
 $i = 0;
 while(file_exists(data . "/". $name . "/" . $i . ".txt")){
  $i++;
 }
 file_put_contents(data . "/". $name . "/" . $i . ".txt",$begin . "\r\n" . $end);
 

?>