

var jpdbBaseURl = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdpIML = "/api/iml";
var jpdpIDl = "/api/idl";
var projectDBName = "ProjectDB";
var projectRelationName = "EMP-REL";
var connToken = "90934361|-31949227778710207|90957084";
var createdTime = true;
var updatedTime = true;

$(document).ready(function () {

    display();
});

function display() {

    var req = createGETALLRecordRequest(connToken, projectDBName, projectRelationName, 1, 6, createdTime, updatedTime);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(req, jpdbBaseURl, jpdbIRL, );

    jQuery.ajaxSetup({async: true});
    //console.log(resultObj);

    $('#recordsTableBody').empty();

    // Check if the status is 200 (success)
    if (resultObj.status === 200) {
        // Parse the JSON string in the data property
        var data = JSON.parse(resultObj.data);

        // Check if json_records exists and is an array
        if (data.json_records && Array.isArray(data.json_records)) {
            // Iterate over each record and display the details
            data.json_records.forEach(function (record) {

                var rowHtml = `
                    <tr>
                        <td>${record.record.id}</td>
                        <td>${record.record.projectName}</td>
                        <td>${record.record.projectAssign}</td>
                        <td>${record.record.projectDate}</td>
                        <td>${record.record.projectDeadline}</td>
                    </tr>
                `;

                $('#recordsTableBody').append(rowHtml);
            });
        } else {
            $('#recordsTableBody').append("<p>No records found.</p>");
        }
    } else {
        $('#recordsTableBody').append("<p>Error retrieving data: " + resultObj.message + "</p>");
    }



}