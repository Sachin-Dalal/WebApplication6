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

    ResetSession();

    GetSession(LoginServiceURL);

    $("#ddlSession").on("change", function () {
        $("#DivChangeSessionAlert").hide();
        $("#DivChangeSessionAlert").removeClass("alert alert-danger");
        $("#ChangeSessionAlertMsg").text("");
    });

    $("#btnUpdateSession").on("click", function () {

        var SessionId = parseInt($('#ddlSession').val());

        if (SessionId === 0) {
            $("#DivChangeSessionAlert").show();
            $("#DivChangeSessionAlert").addClass("alert alert-danger");
            $("#ChangeSessionAlertMsg").text("Please Select Session !");
            return false;
        }

        var SessionInfo = {
            "SessionId": SessionId,
        }

        UpdateSession(LoginServiceURL, SessionInfo);
    });

    $("#btnHideChangeSession").on("click", function () {
        $("#DivChangeSessionAlert").hide();
        $("#DivChangeSessionAlert").removeClass("alert alert-danger");
        $("#ChangeSessionAlertMsg").text("");
    });
});

function ResetSession() {
    $('#ddlSession').empty();
    $("#ddlSession").append("<option value='0'>Select Session</option>");

    $("#DivChangeSessionAlert").hide();
    $("#DivChangeSessionAlert").removeClass("alert alert-danger");
    $("#ChangeSessionAlertMsg").text("");
}

function GetSession(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Hospital/GetSession",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.code == 200) {
                if (response.dataObject != "") {
                    var Json = JSON.parse(response.dataObject);
                    ResetSession();
                    $.each(Json, function (i, d) {
                        $("#ddlSession").append("<option value='" + d.SessionId + "'>" + d.SessionName + "</option>");
                    });
                    $('#ddlSession').trigger('chosen:updated');
                } else {
                    $("#DivChangeSessionAlert").show();
                    $("#DivChangeSessionAlert").removeClass("alert alert-success");
                    $("#DivChangeSessionAlert").addClass("alert alert-danger");
                    $("#ChangeSessionAlertMsg").text(response.message);
                    return false;
                }
            }
            else {
                $("#DivChangeSessionAlert").show();
                $("#DivChangeSessionAlert").removeClass("alert alert-success");
                $("#DivChangeSessionAlert").addClass("alert alert-danger");
                $("#ChangeSessionAlertMsg").text(response.message);
                return false;
            }
        },
        complete: function (response) {
        },
        error: function (response) {
            $("#DivChangeSessionAlert").show();
            $("#DivChangeSessionAlert").removeClass("alert alert-success");
            $("#DivChangeSessionAlert").addClass("alert alert-danger");
            $("#ChangeSessionAlertMsg").text(response.message);
            return false;
        }
    });
}

function UpdateSession(LoginServiceURL, SessionInfo) {
    bootbox.confirm("Do you want to change session ?", function (result_Session) {
        if (result_Session == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/UpdateSession",
                dataType: "json",
                data: JSON.stringify(SessionInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivChangeSessionAlert").show();
                        $("#DivChangeSessionAlert").removeClass("alert alert-danger");
                        $("#DivChangeSessionAlert").addClass("alert alert-success");
                        $("#ChangeSessionAlertMsg").text(response.message);

                        Logout(LoginServiceURL);
                    }
                    else {
                        $("#DivChangeSessionAlert").show();
                        $("#DivChangeSessionAlert").removeClass("alert alert-success");
                        $("#DivChangeSessionAlert").addClass("alert alert-danger");
                        $("#ChangeSessionAlertMsg").text(response.message);
                        return false;
                    }
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivChangeSessionAlert").show();
                    $("#DivChangeSessionAlert").removeClass("alert alert-success");
                    $("#DivChangeSessionAlert").addClass("alert alert-danger");
                    $("#ChangeSessionAlertMsg").text(response.message);
                    return false;
                }
            });
        }
    });


}

function Logout(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Login/AccountLogout",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            window.location.href = response.url;
        },
        complete: function (response) {

        },
        error: function (response) {

        }
    });
}