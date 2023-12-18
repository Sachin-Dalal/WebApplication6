$(document).ready(function () {

    var url = window.location.href
    var arr = url.split("/");
    var result = arr[0] + "//" + arr[2];
    var LoginServiceURL = "";
    if (result.includes("localhost") == true) {
        LoginServiceURL = result;
    } else {
        LoginServiceURL = result;
    }

    ResetControl();

    $("#btnLogin").on("click", function () {

        var user = $("#txtUser").val();
        var pwd = $("#txtPwd").val();

        if (user == "") {
            $("#DivAlert").show();
            $("#DivAlert").addClass("alert alert-danger");
            $("#AlertMsg").text("Please Enter Username !");
        } else if (pwd == "") {
            $("#DivAlert").show();
            $("#DivAlert").addClass("alert alert-danger");
            $("#AlertMsg").text("Please Enter Password !");
        } else {

            var LoginInfo = {
                "Username": user,
                "Password": pwd
            }

            Uservalidate(LoginServiceURL, LoginInfo);

        }
    });

    $("#txtUser").on("keyup", function () {
        $("#DivAlert").hide();
    });

    $("#txtPwd").on("keyup", function () {
        $("#DivAlert").hide();
    });

});

function ResetControl() {

    $("#txtUser").val("7206747901");
    $("#txtPwd").val("1234");
    $("#DivAlert").hide();

}

function Uservalidate(LoginServiceURL, LoginInfo) {

    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Login/Uservalidate",
        dataType: "json",
        data: JSON.stringify(LoginInfo),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#LoginLoader").removeClass("fa-key");
            $("#LoginLoader").addClass("fa-spinner fa-spin");
        },
        success: function (response) {
            if (response.code == 200) {
                window.location.href = response.url;
                ResetControl();
            }
            else {
                $("#DivAlert").show();
                $("#DivAlert").addClass("alert alert-danger");
                $("#AlertMsg").text(response.message);
                return false;
            }
        },
        complete: function (response) {
            $("#LoginLoader").removeClass("fa-spinner fa-spin");
            $("#LoginLoader").addClass("fa-key");
        },
        error: function (response) {
            $("#DivAlert").show();
            $("#DivAlert").addClass("alert alert-danger");
            $("#AlertMsg").text(response.message);
            return false;
        }
    });
}