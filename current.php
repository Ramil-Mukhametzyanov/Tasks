<?php

 $name = $_POST["name"];
 $begin = $_POST["begin"];

echo $name;
echo "<br>";
echo $begin;
echo "<br>";

 file_put_contents(data . "/". "current.txt", $name."\r\n".$begin);
echo "current.txt->". $name."\r\n".$begin;

?>