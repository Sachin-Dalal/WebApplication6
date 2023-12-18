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

    ResetControl_PTload();

    ResetPatient();

    GetPatient(LoginServiceURL);

    $("#btnPtReset").on("click", function () {
        $("#tblPatient tr").removeClass("row_selected");
        $("#txtPtName").val("");
        $("#txtPtCare").val("");
        $("#txtPtAge").val("");
        $("#ddlPtGender").val("0");
        $("#txtPtContact").val("");
        $("#txtPtAddress").val("");
        $("#DivPMAlert").hide();
        $("#DivPatientEdit").hide();
    });

    $("#txtPtUHIDNo").on("keyup", function () {
        $("#DivPMAlert").hide();
    });

    $("#txtPtName").on("keyup", function () {
        $("#DivPMAlert").hide();
    });

    $("#ddlPtGender").on("change", function () {
        $("#DivPMAlert").hide();
    });

    $("#ddlPtIsUHIDNoChange").on("change", function () {
        $("#DivPMAlert").hide();
    });

    $("#txtPtContact").on("keyup", function () {
        $("#DivPMAlert").hide();
    });

    $("#btnPtUpdate").on("click", function () {
        var PatientId = $("#txtPatientId").val();
        var UHIDNo = $("#txtPtUHIDNo").val();
        var Name = $("#txtPtName").val();
        var Care = $("#txtPtCare").val();
        var Age = $("#txtPtAge").val();
        var Gender = $("#ddlPtGender").val();
        var IsUHIDNoChange = $("#ddlPtIsUHIDNoChange").val();
        var Contact = $("#txtPtContact").val();
        var Address = $("#txtPtAddress").val();

        if (PatientId == "") {
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Select Patient For Update !");
            return false;
        }

        if (UHIDNo == "") {
            $('#txtPtUHIDNo').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Enter UHID No. !");
            return false;
        }

        var containsAlphabet = /[a-zA-Z]/.test(UHIDNo);

        if (containsAlphabet) {
            $('#txtPtUHIDNo').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("UHID No. Contains alphabet characters. Please enter only non-alphabetic characters. !");
            return false;
        }


        if (Name == "") {
            $('#txtPtName').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Enter Patient Name !");
            return false;
        }

        if (Gender == "0") {
            $('#ddlPtGender').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Select Gender !");
            return false;
        }

        if (Contact == "") {
            $('#txtPtContact').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Enter Contact No !");
            return false;
        } else if (Contact.length < 10 || Contact.length > 10) {
            $('#txtPtContact').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Enter Vaild Contact No !");
            return false;
        }

        if (IsUHIDNoChange == "0") {
            $('#ddlPtIsUHIDNoChange').focus();
            $("#DivPMAlert").show();
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text("Please Select Do you want to change UHID No. ? !");
            return false;
        }

        if (IsUHIDNoChange == "N") {
            UHIDNo = 0;
        }

        var PatientInfo = {
            "PatientId": parseInt(PatientId),
            "UHID_No": parseInt(UHIDNo),
            "Patient_Name": Name,
            "Care_Of_Name": Care,
            "Age": Age,
            "Gender": Gender,
            "Contact": Contact,
            "Address": Address
        }

        UpdatePatientDetail(PatientInfo, LoginServiceURL);
    });

    $("#btnHidePMAlert").on("click", function () {
        $("#DivPMAlert").hide();
    });
});

function ResetControl_PTload() {
    $("#tblPatient tbody").remove();
    $("#DivPMAlert").hide();
    $("#DivPatientEdit").hide();
}

function ResetPatient() {
    $("#DivPatientEdit").hide();
    $("#txtPatientId").val("");
    $("#txtPtUHIDNo").val("");
    $("#txtPtName").val("");
    $("#txtPtCare").val("");
    $("#txtPtAge").val("");
    $("#ddlPtGender").val("0");
    $("#ddlPtIsUHIDNoChange").val("0");
    $("#txtPtContact").val("");
    $("#txtPtAddress").val("");
}

function GetPatient(LoginServiceURL) {
    $.ajax({
        type: "POST",
        url: LoginServiceURL + "/Hospital/GetPatient",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#divLoding").removeClass("hide");
            $("#divLoding").addClass("show");
        },
        success: function (response) {

            $("#tblPatient tbody").remove();

            if (response.code == 200) {
                if (response.dataObject != "") {

                    var Json = JSON.parse(response.dataObject);

                    $.each(Json, function (i, d) {

                        var Edit = '<div class="btn-group"><button id="btnEdit' + d.PatientId + '" class="btn btn-xs btn-info"><i class="ace-icon fa fa-pencil bigger-120"></i> EDIT</button>'

                        var Delete = '<button id="btnDelete' + d.PatientId + '" class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></div>'

                        $("#tblPatient").append($("<tr  id='TR_" + d.PatientId + "' data-pid=" + d.PatientId + " ><td>" + d.UHIDNo_View + "</td><td>" + d.Patient_Name + "</td><td>" + d.Care_Of_Name + "</td><td>" + d.Age + "</td><td>" + d.Gender + "</td><td>" + d.Contact + "</td><td>" + d.Address + "</td><td>" + Edit + "</td></tr>"));

                        $("#btnEdit" + d.PatientId).on("click", function () {     
                            $("#tblPatient tr").removeClass("row_selected");
                            $("#TR_" + d.PatientId).addClass("row_selected");
                            $("#txtPatientId").val(d.PatientId);
                            $("#txtPtUHIDNo").val(d.UHID_No);
                            $("#txtPtName").val(d.Patient_Name);
                            $("#txtPtCare").val(d.Care_Of_Name);
                            $("#txtPtAge").val(d.Age);
                            $("#ddlPtGender").val(d.Gender);
                            $("#txtPtContact").val(d.Contact);
                            $("#txtPtAddress").val(d.Address);
                            $("#DivPatientEdit").show();
                        });

                        $("#btnDelete" + d.PatientId).on("click", function () {
                            $("#tblPatient tr").removeClass("row_selected");
                            $("#TR_" + d.PatientId).addClass("row_selected");

                            var PatientInfo = {
                                "PatientId": parseInt(d.PatientId),
                            }

                            DeletePatient(LoginServiceURL, PatientInfo, d.UHID_No);
                        });
                    });

                    var columnSet = [{ "title": "UHID No." }, { "title": "Name" }, { "title": "Care's Name" }, { "title": "Age" }, { "title": "Gender" }, { "title": "Contact" }, { "title": "Address" }, { "title": "Action" }];

                    var tblSearch = "";

                    tblSearch = $("#tblPatient").DataTable({
                        destroy: true,
                        order: [],
                        lengthMenu: [5, 10, 25, 50, 100],
                        pageLength: 10,
                        columns: columnSet,
                        searchHighlight: true,
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
                        pagingType: "full_numbers",
                        buttons: [
                            {
                                extend: 'excel',
                                text: '<i class="fa fa-file-excel-o"></i>',
                                title: 'Patient Detail',
                                titleAttr: 'Export In Excel',
                                autoFilter: true,
                                sheetName: 'Patient Detail',
                                exportOptions: {
                                    modifier: {
                                        selected: null,
                                        page: 'all',
                                        search: 'none'
                                    },
                                    columns: [0, 1, 2, 3, 4, 5, 6]
                                },
                                customize: function (xlsx) {
                                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                    /* $('row:first c', sheet).attr('s', '7');*/
                                    console.log(sheet);
                                }
                            }, {
                                extend: 'pdf',
                                text: '<i class="fa fa-file-pdf-o"></i>',
                                title: 'Patient Detail',
                                orientation: 'portrait',
                                titleAttr: 'Export In Pdf',
                                exportOptions: {
                                    modifier: {
                                        selected: null,
                                        page: 'all',
                                        search: 'none'
                                    },
                                    columns: [0, 1, 2, 3, 4, 5, 6]
                                }
                            },

                            //{
                            //    extend: 'print',
                            //    text: '<i class="fa fa-print"></i>',
                            //    title: 'Patient Detail ' + DateTime,
                            //    customize: function (win) {
                            //        $(win.document.body).find('h1')
                            //            .css('font-size', '21px');

                            //        $(win.document.body).find('h1')
                            //            .css('text-align', 'center');
                            //    },
                            //    orientation: 'landscape',
                            //    titleAttr: 'Print All',
                            //    exportOptions: {
                            //        modifier: {
                            //            selected: null,
                            //            page: 'all',
                            //            search: 'none'
                            //        }
                            //    }
                            //},

                            //{
                            //    extend: 'colvis'
                            //}, {
                            //    extend: 'excel',
                            //    text: '<i class="fa fa-file-excel-o"></i>',
                            //    title: 'Patient Detail ' + DateTime,
                            //    autoFilter: true,
                            //    sheetName: 'Patient Detail',
                            //    titleAttr: 'Selected Rows and Column Export In Excel',
                            //    exportOptions: {
                            //        columns: ':visible'
                            //    }


                            //}, {
                            //    extend: 'pdf',
                            //    text: '<i class="fa fa-file-pdf-o"></i>',
                            //    title: 'Patient Detail ' + DateTime,
                            //    orientation: 'landscape',
                            //    titleAttr: 'Selected Rows and Column Export In Pdf',
                            //    exportOptions: {
                            //        columns: ':visible'
                            //    }
                            //}, {
                            //    extend: 'print',
                            //    text: '<i class="fa fa-print"></i>',
                            //    title: 'Patient Detail ' + DateTime,
                            //    customize: function (win) {
                            //        $(win.document.body).find('h1')
                            //            .css('font-size', '21px');

                            //        $(win.document.body).find('h1')
                            //            .css('text-align', 'center');
                            //    },
                            //    orientation: 'landscape',
                            //    titleAttr: 'Print Selected Rows and Column',
                            //    exportOptions: {
                            //        columns: ':visible'
                            //    }
                            //}

                        ],

                        customize: function (doc) {
                            $(doc.document.body).find('h1').css('font-size', '12px');
                            $(doc.document.body).find('h1').css('text-align', 'center');
                        }

                    });

                    tblSearch.on("draw", function () {
                        // get the search keyword
                        var keyword = $('#tblPatient_filter > label:eq(0) > input').val();

                        // clear all the previous highlighting
                        $('#tblPatient').unmark();

                        // highlight the searched word
                        $('#tblPatient').mark(keyword, {});
                    });
                } else {
                    $("#DivPMAlert").show();
                    $("#DivPMAlert").removeClass("alert alert-success");
                    $("#DivPMAlert").addClass("alert alert-danger");
                    $("#PMAlertMsg").text(response.message);
                    return false;
                }
            }
            else {
                $("#DivPMAlert").show();
                $("#DivPMAlert").removeClass("alert alert-success");
                $("#DivPMAlert").addClass("alert alert-danger");
                $("#PMAlertMsg").text(response.message);
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
            $("#DivPMAlert").show();
            $("#DivPMAlert").removeClass("alert alert-success");
            $("#DivPMAlert").addClass("alert alert-danger");
            $("#PMAlertMsg").text(response.message);
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

function UpdatePatientDetail(PatientInfo, LoginServiceURL) {
    bootbox.confirm("Do you want to update patient ?", function (result_Patient) {
        if (result_Patient == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/UpdatePatient",
                dataType: "json",
                data: JSON.stringify(PatientInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivPMAlert").show();
                        $("#DivPMAlert").removeClass("alert alert-danger");
                        $("#DivPMAlert").addClass("alert alert-success");
                        $("#PMAlertMsg").text(response.message);
                    }
                    else {
                        $("#DivPMAlert").show();
                        $("#DivPMAlert").removeClass("alert alert-success");
                        $("#DivPMAlert").addClass("alert alert-danger");
                        $("#PMAlertMsg").text(response.message);
                        return false;
                    }
                    ResetPatient();

                    GetPatient(LoginServiceURL);
                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivPMAlert").show();
                    $("#DivPMAlert").removeClass("alert alert-success");
                    $("#DivPMAlert").addClass("alert alert-danger");
                    $("#PMAlertMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}

function DeletePatient(LoginServiceURL, PatientInfo, UHID_No) {
    bootbox.confirm("Do you want to delete patient where UHID No is " + UHID_No+" ?", function (delete_Patient) {
        if (delete_Patient == true) {
            $.ajax({
                type: "POST",
                url: LoginServiceURL + "/Hospital/DeletePatient",
                dataType: "json",
                data: JSON.stringify(PatientInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.code == 200) {
                        $("#DivPMAlert").show();
                        $("#DivPMAlert").removeClass("alert alert-danger");
                        $("#DivPMAlert").addClass("alert alert-success");
                        $("#PMAlertMsg").text(response.message);
                    }
                    else {
                        $("#DivPMAlert").show();
                        $("#DivPMAlert").removeClass("alert alert-success");
                        $("#DivPMAlert").addClass("alert alert-danger");
                        $("#PMAlertMsg").text(response.message);
                        return false;
                    }
                   
                    GetPatient(LoginServiceURL);


                },
                complete: function (response) {

                },
                error: function (response) {
                    $("#DivPMAlert").show();
                    $("#DivPMAlert").removeClass("alert alert-success");
                    $("#DivPMAlert").addClass("alert alert-danger");
                    $("#PMAlertMsg").text(response.message);
                    return false;
                }
            });
        }
    });
}