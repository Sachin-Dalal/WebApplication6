var IsUpdate = 0;
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

    ResetPassword();

    $("#txtNewPassword").on("keyup", function () {
        $("#DivChangePasswordAlert").hide();
        $("#DivChangePasswordAlert").removeClass("alert alert-danger");
        $("#ChangePasswordAlertMsg").text("");
    });

    $("#txtReNewPassword").on("keyup", function () {
        $("#DivChangePasswordAlert").hide();
        $("#DivChangePasswordAlert").removeClass("alert alert-danger");
        $("#ChangePasswordAlertMsg").text("");
    });

    $("#btnUpdatePassword").on("click", function () {

        var NewPassword = $('#txtNewPassword').val();
        var ReNewPassword = $('#txtReNewPassword').val();


        if (NewPassword == "") {
            $("#DivChangePasswordAlert").show();
            $("#DivChangePasswordAlert").addClass("alert alert-danger");
            $("#ChangePasswordAlertMsg").text("Please Enter New Password !");
            return false;
        }

        if (ReNewPassword == "") {
            $("#DivChangePasswordAlert").show();
            $("#DivChangePasswordAlert").addClass("alert alert-danger");
            $("#ChangePasswordAlertMsg").text("Please Re-Enter New Password !");
            return false;
        }


        if (NewPassword === ReNewPassword) {
            var PasswordInfo = {
                "Password": NewPassword,
            }

            UpdatePassword(LoginServiceURL, PasswordInfo);
        } else {
            $("#DivChangePasswordAlert").show();
            $("#DivChangePasswordAlert").addClass("alert alert-danger");
            $("#ChangePasswordAlertMsg").text("New Password and Confirm Password Not Match !");
            return false;
        }


    });

    $("#btnHideChangePassword").on("click", function () {
        $("#DivChangePasswordAlert").hide();
        $("#DivChangePasswordAlert").removeClass("alert alert-danger");
        $("#ChangePasswordAlertMsg").text("");
    });
});

function ResetPassword() {
    $('#txtNewPassword').val("");
    $('#txtReNewPassword').val("");
    $("#DivChangePasswordAlert").hide();
    $("#DivChangePasswordAlert").removeClass("alert alert-danger");
    $("#ChangePasswordAlertMsg").text("");
}

function UpdatePassword(LoginServiceURL, PasswordInfo) {
    bootbox.confirm("Do you want to change password ?", function (result_Pass) {
        if (result_Pass == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/UpdatePassword",
                dataType: "json",
                data: JSON.stringify(PasswordInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivChangePasswordAlert").show();
                        $("#DivChangePasswordAlert").removeClass("alert alert-danger");
                        $("#DivChangePasswordAlert").addClass("alert alert-success");
                        $("#ChangePasswordAlertMsg").text(response.message);
                    }
                    else {
                        $("#DivChangePasswordAlert").show();
                        $("#DivChangePasswordAlert").removeClass("alert alert-success");
                        $("#DivChangePasswordAlert").addClass("alert alert-danger");
                        $("#ChangePasswordAlertMsg").text(response.message);
                        return false;
                    }

                    $('#txtNewPassword').val("");
                    $('#txtReNewPassword').val("");

                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivChangePasswordAlert").show();
                    $("#DivChangePasswordAlert").removeClass("alert alert-success");
                    $("#DivChangePasswordAlert").addClass("alert alert-danger");
                    $("#ChangePasswordAlertMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}