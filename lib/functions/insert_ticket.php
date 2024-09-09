<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include_once "function.php";
include_once "../config.php";

if (!(count($_POST))) {
    exit();
}

$mobile = $_POST['mobile'];
$name_family = $_POST['name_family'];
$description = $_POST['description'];
$service_time = $_POST['service_time'];

if (empty($mobile)) {
    echo json_encode(array('status' => 'error', 'message' => 'شماره همراه را وارد کنید.'));
    exit();
}

if (empty($service_time)) {
    echo json_encode(array('status' => 'error', 'message' => 'نام و نام خانوادگی  را وارد کنید.'));
    exit();
}
if (empty($description)) {
    echo json_encode(array('status' => 'error', 'message' => ' موضوع درخواست را وارد کنید.'));
    exit();
}
if (empty($name_family)) {
    echo json_encode(array('status' => 'error', 'message' => ' بازه زمانی را انتخاب کنید.'));
    exit();
}
$content = '<p>با سلام </p>
<p>درخواست مشاوره</p>
<br>
<pre>
<b style="color:red">  name : </b> <b style="color:blue">' . $name_family . '</b> <br>
<b style="color:red"> mobile  : </b> <b style="color:blue">' . $mobile . ' </b> <br>
<b style="color:red"> call time: </b> <b style="color:blue">' . $service_time . ' </b> <br>
</pre>
<br>
<br>
<pre><b style="color:red;">موضوع درخواست : </b><br>' . $description . '</pre>
<p>لطفا بعد از اتمام فرآیند تیکت را آپدیت نمائید.</p>
<p>با تشکر</p>';

$input = [
    'subject' => ' فرم مشاوره شمترک ' . date("Y-m-d H:i:s"),
    'content' => $content,
    'queue' => 'consultation.form',
    "priority" => "3",
    "content_type" => "text/html",
    "custom_fields" => [
        "client_id" => "2"
    ]
];

$result = api_function(API_TICKET_HOST, 'v1/tickets', '', $input);

if ($result['data']['status'] == 'success') {
    $result['data']['message'] = 'درخواست با موفقت انجام شد.';
}
echo json_encode(array('status' => $result['data']['status'], 'message' => $result['data']['message']));
exit();

