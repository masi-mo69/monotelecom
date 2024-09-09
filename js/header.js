window.onscroll = function () { myFunction() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}



console.log('yes i see');
function showMenuRes() {
  console.log('yes i see');
  document.getElementById('res-menu-show').style.display = "block"
  document.getElementById('page').style.height = "100vh"
}
function showProduct() {
  document.getElementById('menu-main-show').style.display = "none"
  document.getElementById('product-show').style.display = "flex"
  document.getElementById('res-menu-box').style.height = "100vh"
}
function backMainMenu() {
  document.getElementById('menu-main-show').style.display = "flex"
  document.getElementById('product-show').style.display = "none"
  document.getElementById('res-menu-box').style.height = "unset"
}
function iaasShow() {
  if (document.getElementById('iaas_menu').style.display == "flex") {
    document.getElementById('iaas_menu').style.display = "none"
    document.getElementById('arrowChangeIaas').style.transform = "rotate(-90deg)"
  } else {
    document.getElementById('iaas_menu').style.display = "flex"
    document.getElementById('arrowChangeIaas').style.transform = "rotate(90deg)"
  }
}
function cdnShow() {
  if (document.getElementById('cdn_menu').style.display == "flex") {
    document.getElementById('cdn_menu').style.display = "none"
    document.getElementById('arrowChangeCdn').style.transform = "rotate(-90deg)"
  } else {
    document.getElementById('cdn_menu').style.display = "flex"
    document.getElementById('arrowChangeCdn').style.transform = "rotate(90deg)"
  }
}
function hostShow() {
  if (document.getElementById('host_menu').style.display == "flex") {
    document.getElementById('host_menu').style.display = "none"
    document.getElementById('arrowChangeHost').style.transform = "rotate(-90deg)"
  } else {
    document.getElementById('host_menu').style.display = "flex"
    document.getElementById('arrowChangeHost').style.transform = "rotate(90deg)"
  }
}
function hiddenMenu(event) {
  if (event.target == document.getElementById('res-menu-show')) {
    document.getElementById('res-menu-show').style.display = "none"
    document.getElementById('page').style.height = "unset"
  }
}

function showLogin() {
  document.getElementById('login').classList.add("grid")
  document.getElementById('login').classList.remove("hidden")
  document.getElementById('register').classList.add("hidden")
  document.getElementById('register').classList.remove("grid")
}

function showPopup(package_id) {
  document.getElementById('popup').classList.add("flex")
  document.getElementById('popup').classList.remove("hidden")
  document.getElementById('login').classList.add("hidden")
  document.getElementById('login').classList.remove("grid")
  document.getElementById('verify_2steps').classList.add("hidden")
  document.getElementById('verify_2steps').classList.remove("grid")
  document.getElementById('register').classList.add("grid")
  document.getElementById('register').classList.remove("hidden")

  document.getElementById('package_id_login').value = package_id;
  document.getElementById('package_id_two_step').value = package_id;
  document.getElementById('package_id_register').value = package_id;

  console.log(package_id);
}

function closePopup() {
  document.getElementById('popup').classList.add("hidden")
  document.getElementById('popup').classList.remove("flex")
  document.getElementById('login').classList.add("hidden")
  document.getElementById('login').classList.remove("grid")
  document.getElementById('verify_2steps').classList.add("hidden")
  document.getElementById('verify_2steps').classList.remove("grid")
  document.getElementById('register').classList.add("grid")
  document.getElementById('register').classList.remove("hidden")
}
function hiddenPopup(event) {
  if (event.target == document.getElementById('popup')) {
    document.getElementById('popup').classList.add("hidden")
    document.getElementById('popup').classList.remove("flex")
  }
}
function showLogin() {
  document.getElementById('login').classList.add("grid")
  document.getElementById('login').classList.remove("hidden")
  document.getElementById('register').classList.add("hidden")
  document.getElementById('register').classList.remove("grid")
}

function showRegister() {
  document.getElementById('login').classList.add("hidden")
  document.getElementById('login').classList.remove("grid")
  document.getElementById('register').classList.add("grid")
  document.getElementById('register').classList.remove("hidden")
}

function sendCode() {
  document.getElementById("againSend").classList.add("hidden")
  document.getElementById("againSend").classList.remove("grid")
  document.getElementById("send").classList.add("hidden")
  document.getElementById("send").classList.remove("grid")
  let remainingSeconds = 120;

  const timer = setInterval(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    document.getElementById("timeLeft").innerHTML = `0${minutes}:${formattedSeconds}`;

    remainingSeconds--;

    if (remainingSeconds < 0) {
      clearInterval(timer);
      document.getElementById("timeLeft").innerHTML = ""
      document.getElementById("againSend").classList.add("grid")
      document.getElementById("againSend").classList.remove("hidden")
    }
  }, 1000);
}

function senCodeVerify() {
  document.getElementById("timer").classList.add("grid")
  document.getElementById("timer").classList.remove("hidden")
  document.getElementById("againSendVerify").classList.add("hidden")
  document.getElementById("againSendVerify").classList.remove("grid")
  let remainingSeconds = 120;

  const timer = setInterval(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    document.getElementById("timer").innerHTML = `0${minutes}:${formattedSeconds}`;

    remainingSeconds--;

    if (remainingSeconds < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = ""
      document.getElementById("againSendVerify").classList.add("grid")
      document.getElementById("againSendVerify").classList.remove("hidden")
      document.getElementById("timer").classList.add("hidden")
      document.getElementById("timer").classList.remove("grid")
    }
  }, 1000);
}

function callTwoStepLogin(flow_token) {
  document.getElementById('login').classList.add("hidden")
  document.getElementById('login').classList.remove("grid")
  document.getElementById('verify_2steps').classList.add("grid")
  document.getElementById('verify_2steps').classList.remove("hidden")
  document.getElementById('flow_token').value = flow_token;
  senCodeVerify()
}

function loginFunction() {
  var username = $("#username").val();
  var password = $("#login_password").val();
  var package_id = $("#package_id_login").val();

  $("#login_button").prop("disabled", true);

  $.ajax({
    target: "#message_form_login",
    url: "lib/functions/login.php",
    type: "POST",
    data: {
      username: username,
      password: password,
      package_id: package_id
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.status == "success") {
        $("#message_form_login").html(startAlertSuccess + data.message + endAlert);
        if (data.response.client_two_step_login == true) {
          var flow_token = data.response.flow_token;
          console.log('flowtoken has');

          callTwoStepLogin(flow_token)
        } else {
          var redirect_url = data.response.redirect_url;
          window.location.replace(redirect_url);
          setTimeout(function () {
            // $("#username").val("");
            // $("#login_password").val("");
            // $("#message_form_login").html("");
            // window.location.reload();
          }, 3000);
        }
      }
      if (data.status == "error") {
        $("#login_button").prop("disabled", false);
        $("#message_form_login").html(startAlertDanger + data.message + endAlert);
      }
    },
    error: function (xhr) {
      console.log(xhr);
      if (xhr.status == 419) {
        $("#message_form_login").html("error");
        return false;
      }
      $("#login_button").prop("disabled", false);
      console.log(xhr.statusCode + " " + xhr.responseText);
    },
  });
}

function twoStepLoginFunction() {
  var token = $("#token").val();
  var flow_token = $("#flow_token").val();
  var package_id = $("#package_id_two_step").val();


  $("#two_step_verify_button").prop("disabled", true);

  $.ajax({
    target: "#message_form_login_verify",
    url: "lib/functions/two_step_login.php",
    type: "POST",
    data: {
      token: token,
      flow_token: flow_token,
      package_id: package_id
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.status == "success") {
        $("#message_form_login_verify").html(startAlertSuccess + data.message + endAlert);
        var redirect_url = data.response.redirect_url;
        window.location.replace(redirect_url);
        setTimeout(function () {
          // $("#token").val("");
          $("#message_form_login_verify").html("");
          // window.location.reload();
        }, 3000);
      }
      if (data.status == "error") {
        $("#two_step_verify_button").prop("disabled", false);
        $("#message_form_login_verify").html(startAlertDanger + data.message + endAlert);
      }
    },
    error: function (xhr) {
      console.log(xhr);
      if (xhr.status == 419) {
        $("#message_form_login_verify").html("error");
        return false;
      }
      $("#two_step_verify_button").prop("disabled", false);
      console.log(xhr.statusCode + " " + xhr.responseText);
    },
  });
}

function postRefId(price) {
  var form = document.createElement("insert_creidt");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "../lib/functions/insert_creidt.php");
  form.setAttribute("target", "_self");
  var price = document.createElement("input");
  price.setAttribute("name", "price");
  price.setAttribute("value", price);
  form.appendChild(price);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}


function registerCodeFunction() {
  var mobile = $("#phone").val();
  var name = $("#name").val()
  console.log(mobile, name)

  $("#verify_button").prop("disabled", true);

  $.ajax({
    target: "#message_form_verify",
    url: "lib/functions/verify_register_code.php",
    type: "POST",
    data: {
      mobile: mobile,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.status == "success") {
        sendCode();
        // $("#message_form_verify").html(startAlertSuccess + data.message + endAlert);
      }
      if (data.status == "error") {
        $("#verify_button").prop("disabled", false);
        $("#message_form_verify").html(startAlertDanger + data.message + endAlert);

        setTimeout(function () {
          // $("#token").val("");
          $("#message_form_verify").html("");
          // window.location.reload();
        }, 3000);
      }
    },
    error: function (xhr) {
      console.log(xhr);
      if (xhr.status == 419) {
        $("#message_form_verify").html("error");
        return false;
      }
      $("#verify_button").prop("disabled", false);
      console.log(xhr.statusCode + " " + xhr.responseText);
    },
  });
}

  function registerFunction() {
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var mobile = $("#phone").val();
    var email = $("#email").val();
    var password = $("#password").val(); 
    var verify_token = $("#verify_token").val();
    var package_id = $("#package_id_register").val();
    var identification_number = $("#identification_number").val(); 
   console.log(mobile)
    $("#register_button").prop("disabled", true);

    $.ajax({
      target: "#message_form_verify",
      url: "lib/functions/register.php",
      type: "POST",
      data: {
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        email: email,
        password: password,
        verify_token: verify_token,
        package_id: package_id,
        identification_number: identification_number
      },
      dataType: "json",
      success: function (data) {
        // alert('success');
        console.log(data);
        if (data.status == "success") {
          $("#message_form_verify").html(startAlertSuccess + data.message + endAlert);
          var redirect_url = data.response.redirect_url;
          window.location.replace(redirect_url);
          setTimeout(function () {
            $("#message_form_verify").html("");
            // window.location.reload();
          }, 3000);
        }
        if (data.status == "error") {
          $("#register_button").prop("disabled", false);
          $("#message_form_verify").html(startAlertDanger + data.message + endAlert);
        }
      },
      error: function (xhr) {
        console.log(xhr);
        if (xhr.status == 419) {
          $("#message_form_verify").html("error");
          return false;
        }
        $("#register_button").prop("disabled", false);
        console.log(xhr.statusCode + " " + xhr.responseText);
      },
    });
  }

  var AlertProccessWait =
    '<span class="col-md-12 mb-3 text-center process-wait" ><i class="fa fa-spinner fa-pulse fa-1x ml-1"></i>لطفا صبر کنید...</span>';
  var AlertTokenMismatch =
    '<div class="alert alert-danger message_alert" role="alert"><i class="fas fa-exclamation-triangle ml-2"></i>زمان اعتبار فرم به پایان رسیده لطفا صفحه را مجددا صفحه را باز کنید.</div>';
  var startAlertDanger =
    '<div class="alert alert-danger message_alert" role="alert"><i class="fas fa-exclamation-triangle ml-2"></i>';
  var startAlertSuccess =
    '<div class="alert alert-success message_alert" role="alert"><i class="fas fa-check ml-2"></i>';
  var endAlert = "</div>";



// -----------package-tab----------------
function showPeriodPackage(){
  document.getElementById('period').classList.remove("hidden")
  document.getElementById('period').classList.add("flex")
  document.getElementById('infinit').classList.remove("flex")
  document.getElementById('infinit').classList.add("hidden")
  document.getElementById('traffic').classList.remove("flex")
  document.getElementById('traffic').classList.add("hidden")
  document.getElementById('periodPackage').classList.add("grid")
  document.getElementById('periodPackage').classList.remove("hidden")
  document.getElementById('res_periodPackage').classList.add("grid")
  document.getElementById('res_periodPackage').classList.remove("hidden")
  document.getElementById('infinitPackage').classList.add("hidden")
  document.getElementById('infinitPackage').classList.remove("grid")
  document.getElementById('res_infinitPackage').classList.add("hidden")
  document.getElementById('res_infinitPackage').classList.remove("grid")
  document.getElementById('trafficPackage').classList.add("hidden")
  document.getElementById('trafficPackage').classList.remove("grid")
  document.getElementById('res_trafficPackage').classList.add("hidden")
  document.getElementById('res_trafficPackage').classList.remove("grid")
}

function showInfinitPackage(){
  document.getElementById('period').classList.remove("flex")
  document.getElementById('period').classList.add("hidden")
  document.getElementById('traffic').classList.remove("flex")
  document.getElementById('traffic').classList.add("hidden")
  document.getElementById('infinit').classList.remove("hidden")
  document.getElementById('infinit').classList.add("flex")
  document.getElementById('infinitPackage').classList.add("grid")
  document.getElementById('infinitPackage').classList.remove("hidden")
  document.getElementById('res_infinitPackage').classList.add("grid")
  document.getElementById('res_infinitPackage').classList.remove("hidden")
  document.getElementById('periodPackage').classList.remove("grid")
  document.getElementById('periodPackage').classList.add("hidden")
  document.getElementById('res_periodPackage').classList.add("hidden")
  document.getElementById('res_periodPackage').classList.remove("grid")
  document.getElementById('trafficPackage').classList.add("hidden")
  document.getElementById('trafficPackage').classList.remove("grid")
  document.getElementById('res_trafficPackage').classList.add("hidden")
  document.getElementById('res_trafficPackage').classList.remove("grid")
}

function showTrafficPackage(){
  document.getElementById('period').classList.remove("flex")
  document.getElementById('period').classList.add("hidden")
  document.getElementById('infinit').classList.remove("flex")
  document.getElementById('infinit').classList.add("hidden")
  document.getElementById('traffic').classList.remove("hidden")
  document.getElementById('traffic').classList.add("flex")
  document.getElementById('trafficPackage').classList.add("grid")
  document.getElementById('trafficPackage').classList.remove("hidden")
  document.getElementById('res_trafficPackage').classList.add("grid")
  document.getElementById('res_trafficPackage').classList.remove("hidden")
  document.getElementById('periodPackage').classList.remove("grid")
  document.getElementById('periodPackage').classList.add("hidden")
  document.getElementById('res_periodPackage').classList.add("hidden")
  document.getElementById('res_periodPackage').classList.remove("grid")
  document.getElementById('infinitPackage').classList.add("hidden")
  document.getElementById('infinitPackage').classList.remove("grid")
  document.getElementById('res_infinitPackage').classList.add("hidden")
  document.getElementById('res_infinitPackage').classList.remove("grid")
}

function submitForm() {
  var name_family = $("#name_family").val();
  var mobile = $("#mobile").val();
  var description = $("#description").val();
  var selectedVal = "";
  var selected = $("input[type='radio'][name='service_time']:checked");
  if (selected.length > 0) {
      service_time = selected.val();
  }
  $("#iinsert_button").prop("disabled", true);

  $.ajax({
      target: "#message_form_ticket",
      url: "lib/functions/insert_ticket.php",
      type: "POST",
      data: {
          name_family: name_family,
          mobile: mobile,
          description: description,
          service_time: service_time,
      },
      dataType: "json",
      success: function (data) {
          // alert('success');
          console.log(data);
          if (data.status == "success") {
              $("#message_form_ticket").html(startAlertSuccess + data.message + endAlert);
              setTimeout(function () {
                  $("#name_family").val("");
                  $("#mobile").val("");
                  $("#description").val("");
                  $("#message_form_ticket").html("");
                  // window.location.reload();
              }, 3000);
          }
          if (data.status == "error") {
              $("#iinsert_button").prop("disabled", false);
              $("#message_form_ticket").html(startAlertDanger + data.message + endAlert);
          }
      },
      error: function (xhr) {
          console.log(xhr);
          if (xhr.status == 419) {
              $("#message_form_ticket").html("error");
              return false;
          }
          $("#iinsert_button").prop("disabled", false);
          console.log(xhr.statusCode + " " + xhr.responseText);
      },
  });
}
