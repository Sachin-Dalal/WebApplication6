
$(document).ready(function () {
    alert('running');

    //GetModuleName('DrpMenuName');

   


    //});
    //$('#DrpMainMenu').unbind('change');
    //$('#DrpMainMenu').change(function () {
    //    $('#DrpSubMenu').val(0);
    //    $('#DrpSubMenu').find('option').not(':first').remove();

    //    if ($('#DrpMainMenu').val() > 0) {
    //        GetSubName('DrpSubMenu');
    //    }
    //});


    $("#btn").unbind('click');
    $("#btn").click(function () {

        var Name = $("#InpName").val();
        var LastName = $("#InpLastName").val();
        //if (ObjectId == 0) {
        //    $('#DrpTableId').focus();
        //    alert("Please Select Table Name !")
        //    return false;
        //}
        SaveTableInBulk(Name, LastName);
    });



    //GetMenu();
});



function SaveTableInBulk(Name, LastName) {
    debugger


    var FormData = {
        "Name": Name,
        "LastName": LastName,
        "status":"save"
        


    };

    $.ajax({
        type: "POST",
        url: "http://localhost:22960/Home/SaveColumnsDetails",
        dataType: "json",
        data: JSON.stringify(FormData),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("body").addClass("loading");
        },
        success: function (response) {

            if (response.responseCode == "1") {

                alert(response.responseMessage);

                if ($("#ddlStaffBranch").val() > 0) {

                    //BindStaffList('get', 0, 0, $("#ddlStaffBranch").val());
                }

                //$('#DivCreateStaffLogin').slideUp();

            } else {
                //MessageBoxError(response.responseMessage);
                alert(response.responseMessage);
            }
            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        },
        error: function (data) {
            alert(JSON.stringify(data));
            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        }
    });
}