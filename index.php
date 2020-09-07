<body>

<input type="text" id="task">
<div onclick="run();">Run</div>
<div onclick="stop();">Stop</div>
<hr>
<div id=task_table>
</div>
<script src=js.js>
</script>
<script>



</script>
<?php
$handle = @fopen("data/current.txt", "r");
if ($handle) {
 $task = fgets($handle, 4096);
 $time = fgets($handle, 4096);
 fclose($handle);
}
echo $time;
echo $task;

?>
</body>