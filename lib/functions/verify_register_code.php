<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
include_once "function.php";
include_once "../config.php";

if (!(count($_POST))) {
    exit();
}

$mobile = $_POST['mobile'];

if (empty($mobile)) {
    echo json_encode(array('status' => 'error', 'message' => 'شماره همراه را وارد کنید.'));
    exit();
}

$input = [
    'mobile' => $mobile,
];


$result = api_function(API_CLOUD_HOST, 'register/code', API_CLOUD_TOKEN, $input);

if ($result['status'] == 'error') {
    if(isset($result['response']['validation'])) {
        foreach($result['response']['validation'] as $key => $validation) {
            echo json_encode(array('status' => 'error', 'message' => $validation[0]));
            exit();
        };
    }
    echo json_encode(array('status' => 'error', 'message' => $result['message']));
    exit();
}

if ($result['status'] == 'success') {
    echo json_encode(array('status' => 'success', 'message' => $result['message']));
    exit();
}