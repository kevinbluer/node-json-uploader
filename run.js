var $ = require('jquery');
var sys = require('sys');
var fs = require('fs');

var content= fs.readFileSync("JSON_EXPORT.json", "utf8");
var users = JSON.parse(content);
var urlPath = "INSERT_URL";
var authToken = "INSERT_TOKEN";

var pauseDuration = 0;

$(users).each(function(key, value) {

	console.log("Checking " + value.FirstName + " " + value.LastName + " (" + value.EmpID + ")");

	var url = urlPath + "?auth_token=" + authToken + "&emp_id=" + value.EmpID;

	setTimeout(function() {

		$.ajax({
		     dataType: 'json',
		     type: "GET",
		     async: true,                     
		     url: url,             
		     success: function(data) {

		       	if ((data.array.resources.length > 0) && (!data.array.resources["@trash"])) {

		       		console.log("Updating " + value.FirstName + " " + value.LastName + " (" + value.EmpID + ")");

		       		var zipCode = "";
		       		if (value.ZipCode != null) { zipCode = value.ZipCode.toString() }

					$.ajax({
					     dataType: 'json',
					     type: "PUT",  
					     async: true,     
					     data: {  
					        "entry": {
					            "first_name": value.FirstName.toString(),
					            "last_name": value.LastName.toString(),
					            "full_name": value.FirstName.toString() + " " + value.LastName.toString(),
					            "emp_id": value.EmpID.toString(),
					            "email": value.UPN.toString(),
					            "telephone": value.Telephone.toString(),
					            "address": value.Addr1.toString(),
					            "city": value.City.toString(),
					            "state": value.State.toString(),
					            "zip_code": zipCode,
					            "job_title": value.Title.toString()
					        }
					      },                
					     url: data.array.resources[0]["@url"] + ".json?&auth_token=" + authToken,             
					     success: function(result) {

					       	console.log(result)            
					     },
					     error: function(error) {

					     	console.log(error)
					     }
					});		

		       	} else {

		       		// add the resource with a post

		       		console.log("Adding " + value.FirstName + " " + value.LastName + " (" + value.EmpID + ")");

		       		var zipCode = "";
		       		if (value.ZipCode != null) { zipCode = value.ZipCode.toString() }

					$.ajax({
					     dataType: 'json',
					     type: "POST",   
					     async: true,       
					     data: {  
					        "entry": {
					            "first_name": value.FirstName.toString(),
					            "last_name": value.LastName.toString(),
					            "full_name": value.FirstName.toString() + " " + value.LastName.toString(),
					            "emp_id": value.EmpID.toString(),
					            "email": value.UPN.toString(),
					            "telephone": value.Telephone.toString(),
					            "address": value.Addr1.toString(),
					            "city": value.City.toString(),
					            "state": value.State.toString(),
					            "zip_code": zipCode,
					            "job_title": value.Title.toString()
					        }
					      },               
					     url: urlPath + "?auth_token=" + authToken,             
					     success: function(data) {

					       	console.log(data)
					     },
					     error: function(error) {

					     	console.log(error)
					     }
					});

		       	}
		                    
		     },
		     error: function(error) {

		     	console.log(error)

		     }
		}); 
	}, pauseDuration);

	pauseDuration += 200;

});