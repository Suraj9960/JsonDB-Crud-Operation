var jpdbBaseURl = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdpIML = "/api/iml";
var jpdpIDl = "/api/idl";
var projectDBName = "ProjectDB";
var projectRelationName = "EMP-REL";
var connToken = "90934361|-31949227778710207|90957084";
var createdTime = true;
var updatedTime = true;

$("#projectId").focus();

function saveRecordNo(jsonObj) {

    var lvlData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvlData.rec_no);
}

function getProjectIdAsJsonObj() {
    var projectId = $("#projectId").val();
    //console.log("project id: ", projectId);

    var jsonStr = {
        id: projectId
    };

    return JSON.stringify(jsonStr);
}


function fillData(jsonObj) {
    saveRecordNo(jsonObj);
    var data = JSON.parse(jsonObj.data).record;

    $('#projectName').val(data.projectName);
    $('#projectAssign').val(data.projectAssign);
    $('#projectDate').val(data.projectDate);
    $('#projectDeadline').val(data.projectDeadline);

    //console.log('data coming : ', data);

}

function resetForm() {
    $("#projectId").val('');
    $("#projectName").val('');
    $("#projectAssign").val('');
    $("#projectDate").val('');
    $("#projectDeadline").val('');
    $("#projectId").prop("disabled", false);
    $("#saveData").prop("disabled", true);
    $("#changeData").prop("disabled", true);
    $("#reserData").prop("disabled", true);
    $("#projectId").focus();
}

function validateAndGetFormData() {
    var projectIdVar = $("#projectId").val();
    var projectNameVar = $("#projectName").val();
    var projectAssignVar = $("#projectAssign").val();
    var projectDateVar = $("#projectDate").val();
    var projectDeadlineVar = $("#projectDeadline").val();

    if (projectIdVar === "") {
        alert("Project ID Required Value");
        $("#projectId").focus();
        return "";
    }

    if (projectNameVar === "") {
        alert("Project Name is Required Value");
        $("#projectName").focus();
        return "";
    }

    if (projectAssignVar === "") {
        alert("Please Enter Valid Assignee Name");
        $("#projectAssign").focus();
        return "";
    }
    if (projectDateVar === "") {
        alert("Please Enter Valid Assignment Date");
        $("#projectDate").focus();
        return "";
    }
    if (projectDeadlineVar === "") {
        alert("Please Provide Deadline Date");
        $("#projectDeadline").focus();
        return "";
    }

    //console.log(projectIdVar,projectNameVar,projectAssignVar,projectDateVar,projectDeadlineVar);


    var jsonStrObj = {
        id: projectIdVar,
        projectName: projectNameVar,
        projectAssign: projectAssignVar,
        projectDate: projectDateVar,
        projectDeadline: projectDeadlineVar
    };
    return JSON.stringify(jsonStrObj);

}

function getProject() {

    var projectIdJson = getProjectIdAsJsonObj();

    //console.log('Id : ', projectIdJson);

    var getReq = createGET_BY_KEYRequest(connToken, projectDBName, projectRelationName, projectIdJson, createdTime, updatedTime);
    //console.log(getReq);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReq, jpdbBaseURl, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    //console.log(resultObj);

    if (resultObj.status === 400) {
        $('#saveData').prop('disabled', false);
        $('#resetData').prop('disabled', false);
        $('#projectName').focus();
        //console.log("error is occured in get emp ");
    } else if (resultObj.status === 200) {
        $('#projectId').prop('disabled', true);
        fillData(resultObj);

        $('#changeData').prop('disabled', false);
        $('#resetData').prop('disabled', false);
        $("#saveData").prop("disabled", true);
        $('#projectName').focus();
    }
}


function saveProject() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken,
            jsonStr, projectDBName, projectRelationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURl, jpdpIML);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        alert('Project data saved successfully!');
        resetForm();

        $("#projectId").focus();
    } else {
        alert('Error saving project data.');
    }
}

function updateProject() {
    $("#changeData").prop('disabled', true);

    var jsonChg = validateAndGetFormData();

    if (jsonChg === "") {
        return;
    }

    var updateReq = createUPDATERecordRequest(connToken, jsonChg, projectDBName, projectRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateReq, jpdbBaseURl, jpdpIML);

    jQuery.ajaxSetup({async: true});
    // console.log(resultObj);

    if (resultObj.status === 200) {
        alert('Project data update successfully!');
        resetForm();
        $("#projectId").focus();
    } else {
        alert('Error saving project data.');
    }

}




