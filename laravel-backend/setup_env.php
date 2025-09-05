<?php
$envExample = file_get_contents(__DIR__ . '/.env.example');
$env = $envExample . "

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=appkemakom2
DB_USERNAME=root
DB_PASSWORD=

";

file_put_contents(__DIR__ . '/.env', $env);
echo ".env file has been created with default database settings.\n";
?>
