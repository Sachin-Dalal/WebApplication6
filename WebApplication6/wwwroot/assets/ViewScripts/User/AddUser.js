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

    ResetUserControl();

    GetUserList(LoginServiceURL);

    $("#txtUserName").on("keyup", function () {
        $("#DivUserAlert").hide();
    });

    $("#txtUserMobile").on("keyup", function () {
        $("#DivUserAlert").hide();
    });

    $("#txtUserEmail").on("keyup", function () {
        $("#DivUserAlert").hide();
    });

    $("#txtUserPassword").on("keyup", function () {
        $("#DivUserAlert").hide();
    });

    $("#btnSaveUser").on("click", function () {
        var UserId = $("#txtUserId").val();
        var Name = $('#txtUserName').val();
        var Mobile = $('#txtUserMobile').val();
        var Email = $('#txtUserEmail').val();

        var AddAction = $('#ddlAdd').val();
        var UpdateAction = $('#ddlUpdate').val();
        var DeleteAction = $('#ddlDelete').val();

        var UserRole = parseInt($('#ddlUserRole').val());
        var Password = $('#txtUserPassword').val();
        var SendMail = $('#ddlSendMail').val();

        if (Name == "") {
            $('#txtUserName').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter User Name !");
            return false;
        }

        if (Mobile == "") {
            $('#txtUserMobile').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter Mobile No !");
            return false;
        } else if (Mobile.length < 10 || Mobile.length > 10) {
            $('#txtUserMobile').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter Vaild Mobile No !");
            return false;
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (Email == "") {
            $('#txtUserEmail').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter Email Id !");
            return false;
        } else if (!Email.match(validRegex)) {
            $('#txtUserEmail').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter Vaild Email Id !");
            return false;
        }

        if (Password == "") {
            $('#txtUserPassword').focus();
            $("#DivUserAlert").show();
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text("Please Enter Password !");
            return false;
        }

        var Action = "";
        if (UserId == "") {
            UserId = 0;
            Action = "save";
        } else {
            UserId = parseInt(UserId);
            Action = "update";
        }

        var UserInfo = {
            "UserId": UserId,
            "Name": Name,
            "Mobile": Mobile,
            "Email": Email,
            "AddAction": AddAction,
            "UpdateAction": UpdateAction,
            "DeleteAction": DeleteAction,
            "UserRole": UserRole,
            "Password": Password,
            "SendMail": SendMail
        }

        SaveUpdateUser(LoginServiceURL, UserInfo, Action);
    });

    $("#btnHideUserAlert").on("click", function () {
        $("#DivUserAlert").hide();
    });

    $("#btnResetUser").on("click", function () {
        ResetUser();
    });

});

function ResetUserControl() {
    $("#tblUserList tbody").remove();
    $("#DivUserAlert").hide();

    $("#txtUserId").val("");
    $("#txtUserName").val("");
    $("#txtUserMobile").val("");
    $("#txtUserEmail").val("");
    $('#ddlAdd').val("Y");
    $('#ddlUpdate').val("Y");
    $('#ddlDelete').val("N");
    $('#ddlUserRole').val("102");
    $("#txtUserPassword").val("");
    $('#ddlSendMail').val("N");
}

function ResetUser() {
    $("#tblUserList tr").removeClass("row_selected");
    $("#txtUserId").val("");
    $("#txtUserName").val("");
    $("#txtUserMobile").val("");
    $("#txtUserEmail").val("");
    $('#ddlAdd').val("Y");
    $('#ddlUpdate').val("Y");
    $('#ddlDelete').val("N");
    $('#ddlUserRole').val("102");
    $("#txtUserPassword").val("");
    $('#ddlSendMail').val("N");
}

function SaveUpdateUser(LoginServiceURL, UserInfo, Action) {
    bootbox.confirm("Do you want to " + Action + " user ?", function (result_User) {
        if (result_User == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/SaveUpdateUser",
                dataType: "json",
                data: JSON.stringify(UserInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-danger");
                        $("#DivUserAlert").addClass("alert alert-success");
                        $("#AlertUserMsg").text(response.message);
                        if (Action === "update") {
                            Logout(LoginServiceURL);
                        }
                    }
                    else {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-success");
                        $("#DivUserAlert").addClass("alert alert-danger");
                        $("#AlertUserMsg").text(response.message);
                        return false;
                    }
                    ResetUser();

                    GetUserList(LoginServiceURL); 
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivUserAlert").show();
                    $("#DivUserAlert").removeClass("alert alert-success");
                    $("#DivUserAlert").addClass("alert alert-danger");
                    $("#AlertUserMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function ChangeUserStatus(LoginServiceURL, UserInfo) {
    bootbox.confirm("Do you want to change user status ?", function (result_User_status) {
        if (result_User_status == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/ChangeUserStatus",
                dataType: "json",
                data: JSON.stringify(UserInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-danger");
                        $("#DivUserAlert").addClass("alert alert-success");
                        $("#AlertUserMsg").text(response.message);
                        Logout(LoginServiceURL);
                    }
                    else {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-success");
                        $("#DivUserAlert").addClass("alert alert-danger");
                        $("#AlertUserMsg").text(response.message);
                        return false;
                    }
                    ResetUser();

                    GetUserList(LoginServiceURL);
                    
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivUserAlert").show();
                    $("#DivUserAlert").removeClass("alert alert-success");
                    $("#DivUserAlert").addClass("alert alert-danger");
                    $("#AlertUserMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function DeleteUser(LoginServiceURL, UserInfo) {
    bootbox.confirm("Do you want to delete user ?", function (result_User_status) {
        if (result_User_status == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/DeleteUser",
                dataType: "json",
                data: JSON.stringify(UserInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-danger");
                        $("#DivUserAlert").addClass("alert alert-success");
                        $("#AlertUserMsg").text(response.message);
                        Logout(LoginServiceURL);
                    }
                    else {
                        $("#DivUserAlert").show();
                        $("#DivUserAlert").removeClass("alert alert-success");
                        $("#DivUserAlert").addClass("alert alert-danger");
                        $("#AlertUserMsg").text(response.message);
                        return false;
                    }
                    ResetUser();

                    GetUserList(LoginServiceURL);
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivUserAlert").show();
                    $("#DivUserAlert").removeClass("alert alert-success");
                    $("#DivUserAlert").addClass("alert alert-danger");
                    $("#AlertUserMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function GetUserList(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Hospital/GetUser",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#divLoding").removeClass("hide");
            $("#divLoding").addClass("show");
        },
        success: function (response) {
            $("#tblUserList tbody").remove();
            if (response[0].code == 200) {
                if (response[0].dataObject != "") {
                    var Json = JSON.parse(response[0].dataObject);
                    $.each(Json, function (i, d) {

                        var UserRole = "";
                        if (d.UserRole == 100) {
                            UserRole = "Super Admin"
                        }
                        if (d.UserRole == 101) {
                            UserRole = "Admin";
                        }
                        if (d.UserRole == 102) {
                            UserRole = "User"
                        }

                        var Status = "";
                        if (d.Status == 1) {
                            Status = "Active"
                        }
                        if (d.Status == 0) {
                            Status = "De-Active"
                        }

                        var Edit = '<div class="pull-right action-buttons"><button id="btnUserEdit' + d.UserId + '" title="Edit" class="btn btn-xs btn-info"><i class="ace-icon fa fa-pencil bigger-120"></i></button>&nbsp;'

                        var ChangeStatus = '<button id="btnUserChangeStatus' + d.UserId + '" title="Change Status" class="btn btn-xs btn-warning"><i class="ace-icon fa fa-flag bigger-120"></i></button>&nbsp;'

                        var Delete = '<button id="btnUserDelete' + d.UserId + '" title="Delete" class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></div>'

                        $("#tblUserList").append($("<tr  id='TR_" + d.UserId + "' data-uid=" + d.UserId + " ><td>" + d.Name + "</td><td>" + d.Mobile + "</td><td>" + d.Email + "</td><td>" + d.Password + "</td><td>" + UserRole + "</td><td>" + d.AddAction + "</td><td>" + d.UpdateAction + "</td><td>" + d.DeleteAction + "</td><td>" + Status + "</td><td>" + Edit + ChangeStatus + "</td></tr>"));

                        $("#btnUserEdit" + d.UserId).on("click", function () {
                            $("#tblUserList tr").removeClass("row_selected");
                            $("#TR_" + d.UserId).addClass("row_selected");
                            $("#txtUserId").val(d.UserId);
                            $("#txtUserName").val(d.Name);
                            $("#txtUserMobile").val(d.Mobile);
                            $("#txtUserEmail").val(d.Email);
                            $("#ddlAdd").val(d.AddAction);
                            $("#ddlUpdate").val(d.UpdateAction);
                            $("#ddlDelete").val(d.DeleteAction);
                            $("#ddlUserRole").val(d.UserRole);
                            $("#txtUserPassword").val(d.Password);
                        });

                        $("#btnUserDelete" + d.UserId).on("click", function () {
                         
                            var UserInfo = {
                                "UserId": parseInt(d.UserId),
                            }

                            DeleteUser(LoginServiceURL, UserInfo);
                        });

                        $("#btnUserChangeStatus" + d.UserId).on("click", function () {
                           
                            var UserInfo = {
                                "UserId": parseInt(d.UserId),
                            }

                            ChangeUserStatus(LoginServiceURL, UserInfo);
                        });
                    });

                    var columnSet = [{ "title": "Name" }, { "title": "Mobile No." }, { "title": "Email Id" }, { "title": "Password" }, { "title": "User Role" }, { "title": "Add Action" }, { "title": "Update Action" }, { "title": "Delete Action" }, { "title": "User Status" }, { "title": "Action" }];

                    var tblSearch = "";

                    tblSearch = $("#tblUserList").DataTable({
                        destroy: true,
                        order: [],
                        lengthMenu: [5, 10, 25, 50, 100],
                        pageLength: 5,
                        columns: columnSet,
                        //dom: 'lBfrtip',
                        dom: 'Bfrtip',
                        colReorder: true,
                        stateSave: false,
                        scrollY: 300,
                        scrollX: true,
                        scrollCollapse: true,
                        fixedHeader: {
                            header: true
                        },
                        select: false,
                        buttons : [],
                        //buttons: [
                        //    {
                        //        extend: 'excel',
                        //        text: '<i class="fa fa-file-excel-o"></i>',
                        //        title: 'Patient Detail',
                        //        titleAttr: 'All Rows Export In Excel',
                        //        autoFilter: true,
                        //        sheetName: 'Patient Detail',
                        //        exportOptions: {
                        //            modifier: {
                        //                selected: null,
                        //                page: 'all',
                        //                search: 'none'
                        //            }
                        //        },
                        //        customize: function (xlsx) {
                        //            var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        //            console.log(sheet);
                        //        }
                        //    }, {
                        //        extend: 'pdf',
                        //        text: '<i class="fa fa-file-pdf-o"></i>',
                        //        title: 'Patient Detail',
                        //        orientation: 'landscape',
                        //        titleAttr: 'All Rows Export In Pdf',
                        //        exportOptions: {
                        //            modifier: {
                        //                selected: null,
                        //                page: 'all',
                        //                search: 'none'
                        //            }
                        //        }
                        //    }, {
                        //        extend: 'print',
                        //        text: '<i class="fa fa-print"></i>',
                        //        title: 'Patient Detail',
                        //        customize: function (win) {
                        //            $(win.document.body).find('h1')
                        //                .css('font-size', '21px');

                        //            $(win.document.body).find('h1')
                        //                .css('text-align', 'center');
                        //        },
                        //        orientation: 'landscape',
                        //        titleAttr: 'Print All',
                        //        exportOptions: {
                        //            modifier: {
                        //                selected: null,
                        //                page: 'all',
                        //                search: 'none'
                        //            }
                        //        }
                        //    }
                        //],
                        searching: false,
                        pagging: false,

                    });

                } else {
                    $("#DivUserAlert").show();
                    $("#DivUserAlert").removeClass("alert alert-success");
                    $("#DivUserAlert").addClass("alert alert-danger");
                    $("#AlertUserMsg").text(response[0].message);
                    return false;
                }
            }
            else {
                $("#DivUserAlert").show();
                $("#DivUserAlert").removeClass("alert alert-success");
                $("#DivUserAlert").addClass("alert alert-danger");
                $("#AlertUserMsg").text(response[0].message);
                return false;
            }
        },
        complete: function (response) {
            $("#divLoding").removeClass("show");
            $("#divLoding").addClass("hide");
        },
        error: function (response) {
            $("#divLoding").removeClass("show");
            $("#divLoding").addClass("hide");
            $("#DivUserAlert").show();
            $("#DivUserAlert").removeClass("alert alert-success");
            $("#DivUserAlert").addClass("alert alert-danger");
            $("#AlertUserMsg").text(response[0].message);
            return false;
        }
    });
}

function CurrentDateTime() {

    var date = new Date();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var sec = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + '-' + minutes + '-' + sec + '-' + ampm;


    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var dd = date.getDate().toString();
    var dd = dd[1] ? dd : "0" + dd[0];


    var mm = monthNames[date.getMonth()]; //January is 0!
    var yyyy = date.getFullYear();
    var strDate = dd + '-' + mm + '-' + yyyy;


    var CurrentDateTime = strDate + " " + strTime;


    return CurrentDateTime;
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