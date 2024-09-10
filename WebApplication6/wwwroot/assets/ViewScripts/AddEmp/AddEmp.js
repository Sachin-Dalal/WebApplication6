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

    ResetEmpControl(LoginServiceURL);

    $("#txtEmpCode").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });

    $("#txtEmpName").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });

    $("#txtDOB").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });

    $("#ddlGender").on("change", function () {
        $("#DivEmpAlert").hide();
    });

    $("#txtDepartment").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });

    $("#txtDesignation").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });

    $("#txtBasicSalary").on("keyup", function () {
        $("#DivEmpAlert").hide();
    });


    $("#btnSaveEmp").on("click", function () {
        var EmpId = $("#txtEmpId").val();
        var EmpCode = $('#txtEmpCode').val();
        var EmpName = $('#txtEmpName').val();
        var DOB = $('#txtDOB').val();
        var Gender = $('#ddlGender').val();
        var Department = $('#txtDepartment').val();
        var Designation = $('#txtDesignation').val();
        var BasicSalary = $('#txtBasicSalary').val();

        if (EmpCode == "") {
            $('#txtEmpCode').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter Employee Code !");
            return false;
        }

        if (EmpName == "") {
            $('#txtEmpName').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter Employee Name !");
            return false;
        }

        if (DOB == "") {
            $('#txtDOB').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter D.O.B. !");
            return false;
        }

        if (Gender == "") {
            $('#ddlGender').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Select Gender !");
            return false;
        }

        if (Department == "") {
            $('#txtDepartment').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter Employee Department !");
            return false;
        }

        if (Designation == "") {
            $('#txtDesignation').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter Employee Designation !");
            return false;
        }

        if (BasicSalary == "") {
            $('#txtBasicSalary').focus();
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text("Please Enter Employee Basic Salary !");
            return false;
        }

      

        if (EmpId == "") {

            var EmpInfo = {
                "EmpId": 0,
                "EmpCode": parseInt(EmpCode),
                "EmpName": EmpName,
                "DOB": DOB,
                "Gender": parseInt(Gender),
                "Department": Department,
                "Designation": Designation,
                "BasicSalary": BasicSalary
            }

            SaveEmp(LoginServiceURL, EmpInfo);


        } else {

            var EmpInfo = {
                "EmpId": parseInt(EmpId),
                "EmpCode": parseInt(EmpCode),
                "EmpName": EmpName,
                "DOB": DOB,
                "Gender": parseInt(Gender),
                "Department": Department,
                "Designation": Designation,
                "BasicSalary": BasicSalary
            }

            UpdateEmp(LoginServiceURL, EmpInfo);
        }

       
    });

    $("#btnHideEmpAlert").on("click", function () {
        $("#DivEmpAlert").hide();
    });

    $("#btnResetEmp").on("click", function () {
        ResetEmpControl(LoginServiceURL);
    });

});

function ResetEmpControl(LoginServiceURL) {
    $("#tblEmpList tbody").remove();
    $("#DivEmpAlert").hide();

    $("#txtEmpId").val("");
    $("#txtEmpCode").val("");
    $("#txtEmpName").val("");
    $("#txtDOB").val("");
    $('#ddlGender').val("1");
    $('#txtDepartment').val("");
    $('#txtDesignation').val("");
    $('#txtBasicSalary').val("");

    GetEmpList(LoginServiceURL);
}

function GetEmpList(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Home/GetEmp",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#divLoding").removeClass("hide");
            $("#divLoding").addClass("show");
        },
        success: function (response) {
            $("#tblEmpList tbody").remove();
            if (response[0].code == 200) {
                if (response[0].dataObject != "") {
                    var Json = JSON.parse(response[0].dataObject);
                    $.each(Json, function (i, d) {

                        var Edit = '<div class="pull-right action-buttons"><button id="btnEdit' + d.EmpId + '" title="Edit" class="btn btn-xs btn-info"><i class="ace-icon fa fa-pencil bigger-120"></i></button>&nbsp;'

                        var Delete = '<button id="btnDelete' + d.EmpId + '" title="Delete" class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></div>'

                        var Gender = d.Gender;

                        if (Gender === 1) {
                            Gender = 'Male'
                        }

                        if (Gender === 0) {
                            Gender = 'Female'
                        }

                        $("#tblEmpList").append($("<tr  id='TR_" + d.EmpId + "' data-uid=" + d.EmpId + " ><td>" + d.EmpCode + "</td><td>" + d.EmpName + "</td><td>" + d.DOB + "</td><td>" + d.Gender + "</td><td>" + d.Department + "</td><td>" + d.Designation + "</td><td>" + parseFloat(d.BasicSalary).toFixed(2, 18) + "</td><td>" + Edit + Delete + "</td></tr>"));

                        //<td>" + d.UploadDate + "</td>

                        $("#btnEdit" + d.EmpId).on("click", function () {
                            $("#tblEmpList tr").removeClass("row_selected");
                            $("#TR_" + d.EmpId).addClass("row_selected");

                            $("#txtEmpId").val(d.EmpId);
                            $("#txtEmpCode").val(d.EmpCode);
                            $("#txtEmpName").val(d.EmpName);
                            $("#txtDOB").val(d.DOB);
                            $("#ddlGender").val(d.Gender);
                            $("#txtDepartment").val(d.Department);
                            $("#txtDesignation").val(d.Designation);
                            $("#txtBasicSalary").val(d.BasicSalary);
                        });

                        $("#btnDelete" + d.EmpId).on("click", function () {

                            var EmpInfo = {
                                "EmpId": parseInt(d.EmpId),
                            }

                            DeleteEmp(LoginServiceURL, EmpInfo);
                        });
                    });



                    var columnSet = [{ "title": "Employee Code" }, { "title": "Employee Name" }, { "title": "Date Of Birth" }, { "title": "Gender" }, { "title": "Department" }, { "title": "Designation" }, { "title": "BasicSalary" }, { "title": "Action" }];

                    var tblSearch = "";

                    tblSearch = $("#tblEmpList").DataTable({
                        destroy: true,
                        order: [],
                        lengthMenu: [5, 10, 25, 50, 100],
                        pageLength: 5,
                        columns: columnSet,
                        dom: 'lBfrtip',
                        colReorder: true,
                        stateSave: false,
                        scrollY: 300,
                        scrollX: true,
                        scrollCollapse: true,
                        fixedHeader: {
                            header: true
                        },
                        select: false,
                        buttons: [],
                        searching: true,
                        pagging: true,

                    });

                } else {
                    $("#DivEmpAlert").show();
                    $("#DivEmpAlert").removeClass("alert alert-success");
                    $("#DivEmpAlert").addClass("alert alert-danger");
                    $("#AlertEmpMsg").text(response[0].message);
                    return false;
                }
            }
            else {
                $("#DivEmpAlert").show();
                $("#DivEmpAlert").removeClass("alert alert-success");
                $("#DivEmpAlert").addClass("alert alert-danger");
                $("#AlertEmpMsg").text(response[0].message);
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
            $("#DivEmpAlert").show();
            $("#DivEmpAlert").removeClass("alert alert-success");
            $("#DivEmpAlert").addClass("alert alert-danger");
            $("#AlertEmpMsg").text(response[0].message);
            return false;
        }
    });
}

function SaveEmp(LoginServiceURL, EmpInfo) {
    bootbox.confirm("Do you want to save Employee ?", function (result_emp_save) {
        if (result_emp_save == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Home/SaveEmp",
                dataType: "json",
                data: JSON.stringify(EmpInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-danger");
                        $("#DivEmpAlert").addClass("alert alert-success");
                        $("#AlertEmpMsg").text(response.message);
                    }
                    else {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-success");
                        $("#DivEmpAlert").addClass("alert alert-danger");
                        $("#AlertEmpMsg").text(response.message);
                        return false;
                    }

                    ResetEmpControl(LoginServiceURL);

                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivEmpAlert").show();
                    $("#DivEmpAlert").removeClass("alert alert-success");
                    $("#DivEmpAlert").addClass("alert alert-danger");
                    $("#AlertEmpMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function UpdateEmp(LoginServiceURL, EmpInfo) {
    bootbox.confirm("Do you want to update Employee ?", function (result_emp_update) {
        if (result_emp_update == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Home/UpdateEmp",
                dataType: "json",
                data: JSON.stringify(EmpInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-danger");
                        $("#DivEmpAlert").addClass("alert alert-success");
                        $("#AlertEmpMsg").text(response.message);
                    }
                    else {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-success");
                        $("#DivEmpAlert").addClass("alert alert-danger");
                        $("#AlertEmpMsg").text(response.message);
                        return false;
                    }

                    ResetEmpControl(LoginServiceURL);

                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivEmpAlert").show();
                    $("#DivEmpAlert").removeClass("alert alert-success");
                    $("#DivEmpAlert").addClass("alert alert-danger");
                    $("#AlertEmpMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function DeleteEmp(LoginServiceURL, EmpInfo) {
    bootbox.confirm("Do you want to delete Employee ?", function (result_emp_delete) {
        if (result_emp_delete == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Home/DeleteEmp",
                dataType: "json",
                data: JSON.stringify(EmpInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-danger");
                        $("#DivEmpAlert").addClass("alert alert-success");
                        $("#AlertEmpMsg").text(response.message);
                    }
                    else {
                        $("#DivEmpAlert").show();
                        $("#DivEmpAlert").removeClass("alert alert-success");
                        $("#DivEmpAlert").addClass("alert alert-danger");
                        $("#AlertEmpMsg").text(response.message);
                        return false;
                    }

                    ResetEmpControl(LoginServiceURL);
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivEmpAlert").show();
                    $("#DivEmpAlert").removeClass("alert alert-success");
                    $("#DivEmpAlert").addClass("alert alert-danger");
                    $("#AlertEmpMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}


