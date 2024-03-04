<?php

$response = ["status" => "error"];

if (isset($_POST["counter"]) && file_put_contents("counter.txt", $_POST["counter"])) {
    $response = ["status" => "success", "counter" => $_POST["counter"]];
}

echo json_encode($response);

exit;