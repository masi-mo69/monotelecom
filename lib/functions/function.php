<?php

function api_function($url, $method, $token, $input, $method_type = "POST")
{
    // $input['token'] = $token;

    $input = json_encode($input, true);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$url" . "$method");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    switch ($method_type) {
        case 'GET':
            curl_setopt($ch, CURLOPT_HTTPGET, 1);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            break;
        case 'POST':
            curl_setopt($ch, CURLOPT_POST, 1);
            break;
    }
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        "Authorization: Bearer " . $token,
        'Content-Length: ' . strlen($input))
    );
    $result = curl_exec($ch);

    if ($result === false) {
        $output['status'] = 'error';
        $output['message'] = "درخواست شما با خطا مواجه شد، لطفا مجددا تلاس کنید.";
        return $output;
    }
    if (empty($result)) {
        $output['status'] = 'error';
        $output['message'] = 'مشکل داخلی پیش آمده است.';
        return $output;
    }

    $output = json_decode($result, true);

    if($output['status'] != "success"){
        $output['status'] = 'error';
        $output['message'] = 'خطای '.$output['status'].' رخ داده است.';
        return $output;
    }
    curl_close($ch);
    return $output;
}

function rt_api_function($url, $method, $token, $input, $method_type = "POST")
{
    // $input['token'] = $token;

    $input = json_encode($input, true);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$url" . "$method");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    switch ($method_type) {
        case 'GET':
            curl_setopt($ch, CURLOPT_HTTPGET, 1);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            break;
        case 'POST':
            curl_setopt($ch, CURLOPT_POST, 1);
            break;
    }
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        "Authorization: Bearer " . $token,
        'Content-Length: ' . strlen($input))
    );
    $result = curl_exec($ch);

    if ($result === false) {
        $output['status'] = 'error';
        $output['message'] = "درخواست شما با خطا مواجه شد، لطفا مجددا تلاس کنید.";
        return $output;
    }
    if (empty($result)) {
        $output['status'] = 'error';
        $output['message'] = 'مشکل داخلی پیش آمده است.';
        return $output;
    }

    $output = json_decode($result, true);

    // if($output['status'] != "success"){
    //     $output['status'] = 'error';
    //     $output['message'] = 'خطای '.$output['status'].' رخ داده است.';
    //     return $output;
    // }
    curl_close($ch);
    return $output;
}
function redirect($url, $statusCode = 302)
{
   header('Location: ' . $url, true, $statusCode);
   die();
}