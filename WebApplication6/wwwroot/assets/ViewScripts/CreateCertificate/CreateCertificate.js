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

    ResetCertificate();

    $("#btnGenerateCertificate").on("click", function () {
        var Name = $('#txtCName').val();
        var Mobile = $('#txtCMobileNo').val();
        var EmailId = $('#txtCEmail').val();

        if (Name == "") {
            $('#txtUserName').focus();
            alert("Please Enter Name");
            return false;
        }

        if (Mobile == "") {
            $('#txtUserMobile').focus();
            alert("Please Enter Mobile No");
            return false;
        } else if (Mobile.length < 10 || Mobile.length > 10) {
            $('#txtUserMobile').focus();
            alert("Please Enter Vaild Mobile No");
            return false;
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (EmailId == "") {
            $('#txtUserEmail').focus();
            alert("Please Enter Email Id");
            return false;
        } else if (!EmailId.match(validRegex)) {
            $('#txtUserEmail').focus();
            alert("Please Enter Vaild Email Id");
            return false;
        }

        var CurrentDate = GetCurrentDate();

        var UserInfo = {
            "Name": Name,
            "Mobile": Mobile,
            "EmailId": EmailId,
            "CurrentDate": CurrentDate
        }

        GenerateCertificate(LoginServiceURL, UserInfo);
    });

    $("#btnCertificateReset").on("click", function () {
        ResetCertificate();
    });

});

function ResetCertificate() {
    $("#txtCName").val("");
    $("#txtCMobileNo").val("");
    $("#txtCEmail").val("");
}

function GenerateCertificate(LoginServiceURL, UserInfo) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Home/GenerateCertificate",
        dataType: "json",
        data: JSON.stringify(UserInfo),
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            response = response[0];

            if (response.code == 200) {

                var url = "" + LoginServiceURL + "/Home/Download_Certificate?Name=" + UserInfo.Name + "&Date=" + UserInfo.CurrentDate + "";
                window.open(url, 'Download_Certificate');

                alert("Your Certificate Download Successfully.")
            }
            ResetCertificate();
        },
        complete: function (response) {

        },
        error: function (response) {

            return false;
        }
    });

}

function GetCurrentDate() {
    var CurrentDate = new Date();
    var year = CurrentDate.getFullYear();
    var month = String(CurrentDate.getMonth() + 1).padStart(2, '0');
    var day = String(CurrentDate.getDate()).padStart(2, '0');
    /*CurrentDate = year + '-' + month + '-' + day;*/
    CurrentDate = day + '/' + month + '/' + year;

    return CurrentDate;
}