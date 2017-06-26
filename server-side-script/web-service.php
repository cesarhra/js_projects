<?php

$json = json_encode($_POST, JSON_PRETTY_PRINT);
printf("<pre>%s</pre>", $json);

?>