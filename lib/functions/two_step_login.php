<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once "function.php";
include_once "../config.php";

if (!(count($_POST))) {
    exit();
}

$code = $_POST['token'];
$flow_token = $_POST['flow_token'];
$package_id = $_POST['package_id'];


if (empty($code)) {
    echo json_encode(array('status' => 'error', 'message' => 'کد تایید  را وارد کنید.'));
    exit();
}
if (empty($flow_token)) {
    echo json_encode(array('status' => 'error', 'message' => 'کد تایید  را وارد کنید.'));
    exit();
}

if (empty($package_id)) {
    echo json_encode(array('status' => 'error', 'message' => 'بسته را انتخاب کنید.'));
    exit();
}

$package_input = [
    'package' => ['id' => $package_id]
];
$valid_package_ids = [
    "9c533ef6-dca5-4675-ab3e-15980e96023a",
    "9c533ef8-4782-4aa5-b971-ad1a096ac69b",
    "9c533ef9-1e6c-4783-bbc5-95421cb193bb",
    "9c533efb-bffa-49cd-90f1-b7f582e302af",
    "9c533efd-cad2-4eb7-8932-c6606c867e8a",
    "9c533eff-29b7-4abd-81ee-18f666e70ca4",
    "9c533f01-36f3-4b97-9623-ca82246d58f1"
];

if (!in_array($package_id, $valid_package_ids)) {
    echo json_encode(array('status' => 'error', 'message' => 'بسته انتخاب شده معتبر نیست.'));
    exit();
}
$package = api_function(API_CLOUD_HOST, 'admin/products/iaas/packages', API_CLOUD_TOKEN, $package_input, "GET");

if ($package['status'] == 'error') {
    if(isset($package['response']['validation'])) {
        foreach($package['response']['validation'] as $key => $validation) {
            echo json_encode(array('status' => 'error', 'message' => $validation));
            exit();
        }
    }
    echo json_encode(array('status' => 'error', 'message' => $package['message']));
    exit();
}
if(empty($package['response'])) {
    echo json_encode(array('status' => 'error', 'message' => 'بسته مورد نظر یافت نشد. لطفا با واحد پشتیبانی تماس حاصل فرمایید.'));
    exit();
}

$input = [
    'token' =>$code,
    'flow_token' => $flow_token
];

$result = api_function(API_CLOUD_HOST, 'login/two-step/verify', API_CLOUD_TOKEN, $input);

if ($result['status'] == 'error') {
    if(isset($result['response']['validation'])) {
        foreach($result['response']['validation'] as $key => $validation) {
            echo json_encode(array('status' => 'error', 'message' => $validation[0]));
            exit();
        }
    }
    echo json_encode(array('status' => 'error', 'message' => $result['message']));
    exit();
}
$client = api_function(
    API_CLOUD_HOST,
    'admin/clients',
    API_CLOUD_TOKEN,
    [
        'mobile' => $result['response']['mobile']
    ],
    "GET"
);

$price = $package['response'][0]['promotion_price']; 
$tax_price = ($price * 10) / 100; 
$price_with_tax = $price + $tax_price;
$price_with_tax = round((float) $price_with_tax);

$credit_data = [
    "client_id" => $client['response'][0]['id'],
    // "price" => $package['response'][0]['promotion_price']
    "price" => $price_with_tax
];

$insert_creidt = api_function(API_CLOUD_HOST, 'financials/credits', API_CLOUD_TOKEN, $credit_data);

if ($insert_creidt['status'] == 'error') {
    if(isset($insert_creidt['response']['validation'])) {
        foreach($insert_creidt['response']['validation'] as $key => $validation) {
            echo json_encode(array('status' => 'error', 'message' => $validation));
            exit();
        }
    }
    echo json_encode(array('status' => 'error', 'message' => $insert_creidt['message']));
    exit();
}

echo json_encode(
    array(
        'status' => 'success',
        'message' => $insert_creidt['message'],
        'response' => $insert_creidt['response']
    )
);
exit();



