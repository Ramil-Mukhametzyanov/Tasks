<?php

 $name = $_POST["name"];

 file_put_contents(data . "/". "list.txt", $name . "\r\n", FILE_APPEND);
 

?>