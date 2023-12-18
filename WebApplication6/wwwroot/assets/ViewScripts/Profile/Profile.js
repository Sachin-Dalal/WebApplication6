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

    ResetProfile();

    GetUserProfile(LoginServiceURL);

    $("#btnHideProfileAlert").on("click", function () {
        $("#DivProfileAlert").hide();
    });

    $("#txtPName").on("keyup", function () {

        $("#DivProfileAlert").hide();
        $("#DivProfileAlert").removeClass("alert alert-danger");
        $("#ProfileAlertMsg").text("");

    });

    $("#txtPMobile").on("keyup", function () {

        $("#DivProfileAlert").hide();
        $("#DivProfileAlert").removeClass("alert alert-danger");
        $("#ProfileAlertMsg").text("");

    });

    $("#txtPEmail").on("keyup", function () {

        $("#DivProfileAlert").hide();
        $("#DivProfileAlert").removeClass("alert alert-danger");
        $("#ProfileAlertMsg").text("");

    });

    $("#btnUpdateProfile").on("click", function () {

        var Name = $('#txtPName').val();
        var MobileNo = $('#txtPMobile').val();
        var EmailId = $('#txtPEmail').val();

        if (Name == "") {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text("Please Enter Name !");
            return false;
        }

        if (MobileNo == "") {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text("Please Enter Mobile No !");
            return false;
        } else if (MobileNo.length < 10 || MobileNo.length > 10) {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text("Please Enter Vaild Mobile No !");
            return false;
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (EmailId == "") {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text("Please Enter Email Id !");
            return false;
        } else if (!EmailId.match(validRegex)) {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text("Please Enter Vaild Email Id !");
            return false;
        }

        var ProfileInfo = {
            "Name": Name,
            "MobileNo": MobileNo,
            "EmailId": EmailId
        }

        UpdateUserProfile(LoginServiceURL, ProfileInfo);
    });

});

function ResetProfile() {
    $("#DivProfileAlert").hide();
}

function GetUserProfile(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Hospital/GetProfile",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.code == 200) {
                if (response.dataObject != "") {

                    var Json = JSON.parse(response.dataObject);

                    $('#txtPName').val(Json[0].Name);
                    $('#txtPMobile').val(Json[0].MobileNo);
                    $('#txtPEmail').val(Json[0].EmailId);

                    $('#txtPAddAction').text(Json[0].AddAction);
                    $('#txtPUpdateAction').text(Json[0].UpdateAction);
                    $('#txtPDeleteAction').text(Json[0].DeleteAction);

                    $('#txtPRole').text(Json[0].UserTypeName);
                    $('#txtPPwd').text(Json[0].Password);

                } else {
                    $("#DivProfileAlert").show();
                    $("#DivProfileAlert").removeClass("alert alert-success");
                    $("#DivProfileAlert").addClass("alert alert-danger");
                    $("#ProfileAlertMsg").text(response.message);
                    return false;
                }
            }
            else {
                $("#DivProfileAlert").show();
                $("#DivProfileAlert").removeClass("alert alert-success");
                $("#DivProfileAlert").addClass("alert alert-danger");
                $("#ProfileAlertMsg").text(response.message);
                return false;
            }
        },
        complete: function (response) {
        },
        error: function (response) {
            $("#DivProfileAlert").show();
            $("#DivProfileAlert").removeClass("alert alert-success");
            $("#DivProfileAlert").addClass("alert alert-danger");
            $("#ProfileAlertMsg").text(response.message);
            return false;
        }
    });
}

function UpdateUserProfile(LoginServiceURL, ProfileInfo) {
    bootbox.confirm("Do you want to update profile ?", function (result_User_Profile) {
        if (result_User_Profile == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/UpdateProfile",
                dataType: "json",
                data: JSON.stringify(ProfileInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivProfileAlert").show();
                        $("#DivProfileAlert").removeClass("alert alert-danger");
                        $("#DivProfileAlert").addClass("alert alert-success");
                        $("#ProfileAlertMsg").text(response.message);
                    }
                    else {
                        $("#DivProfileAlert").show();
                        $("#DivProfileAlert").removeClass("alert alert-success");
                        $("#DivProfileAlert").addClass("alert alert-danger");
                        $("#ProfileAlertMsg").text(response.message);
                        return false;
                    }

                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivProfileAlert").show();
                    $("#DivProfileAlert").removeClass("alert alert-success");
                    $("#DivProfileAlert").addClass("alert alert-danger");
                    $("#ProfileAlertMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}
