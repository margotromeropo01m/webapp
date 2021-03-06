$(document).ready(function(){

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;

$(".next").click(function(){

current_fs = $(this).parent();
next_fs = $(this).parent().next();

if (fieldValidation(current_fs[0].name))
	{
	//Add Class Active
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;

	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	next_fs.css({'opacity': opacity});
	},
	duration: 600
	});
	}


});

$(".previous").click(function(){

current_fs = $(this).parent();
previous_fs = $(this).parent().prev();

//Remove class active
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//show the previous fieldset
previous_fs.show();

//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
previous_fs.css({'opacity': opacity});
},
duration: 600
});
});

$('.radio-group .radio').click(function(){
$(this).parent().find('.radio').removeClass('selected');
$(this).addClass('selected');
});

getProcedures()
});

function fieldValidation(fieldName)
{
	var answer = false
	switch (fieldName)
	{
		case "patient_field":
			
			var name = $("#patient_name")
						
			if (!(typeof name.val() === 'undefined'))
				{
				name = $("#patient_name").val()
				var surname = $("#patient_surname").val()
				var patronimic = $("#patient_patronimic").val()
				var phone = $("#patient_phone").val()
				var birthday = $("#patient_birthday").val()
				if (name != "" && surname != "" && patronimic != "" &&
					 phone != "" && birthday != "")
					{
					 answer = true
					}
				else
					{
					Swal.fire({
						  icon: 'info',
						  title: '?????????????????????????? ???????????????????? ?? ????????????????',
						  text: '???????????????????? ???????????????????? ?????? ????????????'
						})
					}
				}
			else
				{
				Swal.fire({
					  icon: 'info',
					  title: '?????? ???????????? ?? ????????????????',
					  text: '???????????????????? ???????????????? ?????? ?????????????????????????? ???????????? ????????????????'
					})
				}
			
			break;
		case "procedure_field":
			
			var rows = CountRows()
			
			if (rows == 0)
			{
			 Swal.fire({
					  icon: 'info',
					  title: '????????????????',
					  text: '???????????????? ???????? ???? ???????? ??????????????????'
					})
			}
			else
			{
				answer = true
				getAppointmentDuration()
				var date = $("#appointment_date").val()
				if  (date)
				{
					getAppointmentHours()
				}

			}
			console.log("procedure")
			break;
		case "date_field":
			var date = $("#appointment_date").val()
			var time = $("#appointment_time").val()
			console.log(time)
			var duration = $("#appointment_duration").val()
			if (date != "" && time != "" && duration != "" && !(typeof time === 'undefined'))
				{
				 answer = true
				 showAppointmentInfo()
				}
			else
				{
				Swal.fire({
					  icon: 'info',
					  title: '?????????????????????????? ???????????????????? ?? ????????????',
					  text: '???????????????????? ???????????????????? ?????? ????????????'
					})
				}
			console.log("date")
	}
	
	return answer	
}

function showAppointmentInfo()
{
	var name = $("#patient_name").val()
	var surname = $("#patient_surname").val()
	var patronimic = $("#patient_patronimic").val()
	var birthday = $("#patient_birthday").val()
	var phone = $("#patient_phone").val()
	var date = $('#appointment_date').val()
	var time = $('#appointment_time').val()
	var duration = $('#appointment_duration').val()
	var observation = $('#appointment_observation').val()

	var info_cita ='<div class="row">'+
		'<div class="card flex-md-row mb-4 box-shadow h-md-250 bg-light">'+
		'<div class="card-body d-flex flex-column align-items-start">'+
			'<h4 class="text-dark">?????????????? : '+surname+' '+name+' '+patronimic+'</h4>'+
			'<h4 class="text-dark">???????? : '+date+'</h4>'+
			'<h4 class="text-dark">?????????? : '+time+'</h4>'+
			'<h4 class="text-dark">???????????????????? : '+observation+'</h4>'+
			'<h4 class="text-dark">??????????????????:</h4>'+
			'<table id="procedures_table_info" class="table table-bordered">'+
			'<thead>'+
				'<tr>'+
				'<th></th>'+
				'<th>??????????????????</th>'+
				'<th>??????. ????????????????????</th>'+
				'<th>??????.</th>'+
				'<th>???????? (??????.)</th>'+
				'<th>???????????? (%)</th>'+                               
				'</tr>'+		
			'</thead>'+
			'<tbody>'+
			'</tbody>'+
		'</table>'+
		'</div>'+                       
		'</div>'+
	'</div>'

	$('#info_cita_final').html(info_cita)

	var table = document.getElementById("procedures_table")

	var table2 = document.getElementById("procedures_table_info")
	
	var rowCount = CountRows()
	var i = rowCount + 1
		
	for (var j=1; j<i; j++)
	{

		var row = table2.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
	 var x= table.rows[j].cells;
		cell1.innerHTML = x[1].innerHTML
		cell2.innerHTML = x[2].innerHTML
		cell3.innerHTML = x[3].innerHTML
		cell4.innerHTML = x[4].innerHTML
		cell5.innerHTML = x[5].innerHTML
		cell6.innerHTML = x[6].innerHTML
	}
}

function getAppointmentDuration()
{
	var table = document.getElementById("procedures_table")
	
	var rowCount = CountRows()
	var i = rowCount + 1
	var total_duration = 0;
	for (var j=1; j<i; j++)
	{
	 var x= table.rows[j].cells;

	 total_duration += parseInt(x[4].innerHTML)
	
	}

	console.log(total_duration)

	$('#appointment_duration').val(total_duration)
}

function newPatient()
{
	    var patient_input = '<input type="text" class="form-control" id="patient_surname" placeholder="??????????????" />'+
					        '<input type="text" class="form-control" id="patient_name" placeholder="??????" />'+
					        '<input type="text" class="form-control" id="patient_patronimic" placeholder="??????????????" />'+
					        '<input type="text" class="form-control" id="patient_phone" placeholder="??????????????" />'+
					        '<label class="control-label">???????? ????????????????:</label>'+
					        '<input type="date" class="form-control" id="patient_birthday" placeholder="???????? ????????????????" />'+
					        '<div id = "patient_buttons"class="col text-center">'+
		            		'<button type="button" class="btn btn-primary" onclick="savePatient()">??????????????????</button>'+
		            		'<button type="button" class="btn btn-warning" onclick="cancelPatient()">????????????????</button>'+
		            		'</div>'
		
        $('#client_info_block').html(patient_input)
					        
		$('#patient_phone').mask('+7-(000)-000-00-00')			        
}

function savePatient()
{
 var name = $("#patient_name").val()
 var surname = $("#patient_surname").val()
 var patronimic = $("#patient_patronimic").val()
 var birthday = $("#patient_birthday").val()
 var phone = $("#patient_phone").val()
 var observation="";

 if(name=="" || surname=="" || patronimic=="" ||
		 birthday=="" || phone=="")
	 {
	 Swal.fire({
		  icon: 'info',
		  title: '?????????????????????????? ???????????????????? ?? ????????????????',
		  text: '???????????????????? ???????????????????? ?????? ????????????'
		})
	 }
 else
	 {
	 $.ajax({
		    url: 'index.php?controller=Patients&action=InsertPatient',
		    type: 'POST',
		    data: {
		    	patient_name:name,
		    	patient_surname:surname,
		    	patient_patronimic:patronimic,
		    	patient_birthday:birthday,
				patient_phone:phone,
				patient_observation:observation
		    },
		})
		.done(function(x) {
			x=x.trim()
			if(x=="2")
				{
				Swal.fire({
					  icon: 'warning',
					  title: '????????????????',
					  text: '?????????????? ?????? ??????????????????????????????!'
					})
				}
			else if (x=="1")
				{
				Swal.fire({
					  icon: 'success',
					  title: '????????????',
					  text: '?????????????? ?????????????? ??????????????????????????????!'
					})
					document.getElementById('patient_name').setAttribute('readonly', true);
					document.getElementById('patient_surname').setAttribute('readonly', true);
					document.getElementById('patient_patronimic').setAttribute('readonly', true);
					document.getElementById('patient_phone').setAttribute('readonly', true);
					document.getElementById('patient_birthday').setAttribute('readonly', true);
					
					var patient_button = '<button type="button" class="btn btn-danger" onclick="cancelPatient()">????????????????</button>'
					$("#patient_buttons").html(patient_button)
					
				}
			else
				{
				Swal.fire({
					  icon: 'error',
					  title: '????????????',
					  text: '?????????????????? ???????????? :'+x
					})
				}
			
			
		})
		.fail(function() {
		    console.log("error");
		});
	 }
  
}

function saveAppointment()
{
	var name = $("#patient_name").val()
	var surname = $("#patient_surname").val()
	var patronimic = $("#patient_patronimic").val()
	var birthday = $("#patient_birthday").val()
	var phone = $("#patient_phone").val()
	var date = $('#appointment_date').val()
	var time = $('#appointment_time').val()
	var duration = $('#appointment_duration').val()
	var observation = $('#appointment_observation').val()

	if(date == "" || time == "")
	{
      alertMessages('warning', '???????????????????? ?????? ????????????!', '????????????????')
	}
	else
	{
		var procedures_table = []

			var table = document.getElementById("procedures_table")
	
			var rowCount = CountRows()
			var i = rowCount + 1
			
			for (var j=1; j<i; j++)
			{
				var x= table.rows[j].cells;
				var rowElements = []
				for(var k = 1; k<table.rows[j].cells.length-1; k++)
				{
					rowElements.push(x[k].innerHTML) 
				}
				procedures_table.push(rowElements)
			}

			var jsonString = JSON.stringify(procedures_table);

		$.ajax({
		    url: 'index.php?controller=Appointments&action=InsertAppointment',
		    type: 'POST',
		    data: {
		    	patient_name:name,
		    	patient_surname:surname,
		    	patient_patronimic:patronimic,
		    	patient_birthday:birthday,
				patient_phone:phone,
				appointment_date:date,
				appointment_time:time,
				appointment_duration:duration,
				appointment_observation:observation,
				procedure_table:jsonString

		    },
		})
		.done(function(x) {
			x=x.trim()
			if (x.includes("success"))
				{
					x=x.split("|")
					Swal.fire({
						title: '????????????',
						text: "???????????? ?????????????? ??????????????!",
						icon: 'success',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'OK'
					  }).then((result) => {
						if (result.value) {
							window.location.href = "index.php?controller=ShowAppointments&action=load_specific_appointment&cita="+x[1];
						}
										
				})	
			}
		})
		.fail(function() {
		    console.log("error");
		});
	}
}

function cancelPatient()
{
	var patient_input = '<button type="button" class="btn btn-info" onclick="newPatient()">?????????? ??????????????</button>'+
						'<button type="button" class="btn btn-info" onclick="searchPatient()">?????????????? ????????????????</button>'
		
	$('#client_info_block').html(patient_input)
}

function searchPatient()
{
	var patient_input = '<input type="text" class="form-control" id="patientSearch" name="cedula_usuarios" value="" onkeyup="loadPatients(1)"  placeholder="??????????">'+
						'<div id="patients_table"></div>'+
						'</div>'+
						'<div id = "patient_buttons"class="col text-center">'+
		            		'<button type="button" class="btn btn-warning" onclick="cancelPatient()">????????????????</button>'+
		            	'</div>'
	
	$('#client_info_block').html(patient_input)
					        
	$('#patient_phone').mask('+7-(000)-000-00-00')
	$("#patient_phone").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        findPatient()
    }
})
}

function loadPatients(page)
{
	var search = $("#patientSearch").val()
	
	var firstChar = search.charAt(0)
	
	if( firstChar <='9' && firstChar >='0') {
      
		search = formatNumber(search)
	}
	
	$.ajax({
	    url: 'index.php?controller=Appointments&action=GetPatients',
	    type: 'POST',
	    data: {
	    	search:search,
	    	page:page
	    },
	})
	.done(function(x) {
		x=x.trim()
		$('#patients_table').html(x)	
	})
	.fail(function() {
	    console.log("error");
	});
}

function formatNumber(number)
{
	var format = "+7-(XXX)-XXX-XX-XX"
	var res	
		for(var i = 0; i<number.length; i++)
			{
			 res=format.replace(/X/, number.charAt(i))
			 format = res
			}
	var x = format.indexOf("X")
	if (x==-1) x=format.length
	var newFormat = ""
	for (var i = 0; i<x; i++)
		{
		 newFormat += format.charAt(i)
		 
		}
	return newFormat
}

/*function searchPatient()
{
	var patient_input = '<label class="control-label">?????????????? ?????????? ???????????????? ???????????????????????????????????? ????????????????:</label>'+
						'<input type="text" class="form-control" id="patient_name" placeholder="??????" style="display: none"/>'+
						'<input type="text" id="patient_phone" placeholder="??????????????" />'+
						'<div id = "patient_buttons"class="col text-center">'+
	            		'<button type="button" class="btn btn-primary" onclick="findPatient()">????????????</button>'+
	            		'<button type="button" class="btn btn-warning" onclick="cancelPatient()">????????????????</button>'+
	            		'</div>'
	
	$('#client_info_block').html(patient_input)
					        
	$('#patient_phone').mask('+7-(000)-000-00-00')
	$("#patient_phone").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        findPatient()
    }
})
}*/

function findPatient(id_patient)
{
	
	$.ajax({
		    url: 'index.php?controller=Appointments&action=FindPatient',
		    type: 'POST',
		    data: {
		    	
		    	patient_id:id_patient
		    },
		})
		.done(function(x) {
			x=x.trim()
			 if (x=="0")
				{
					Swal.fire({
					  icon: 'warning',
					  title: '????????????????',
					  text: '?????? ???????????????? ???? ?????????????? ???????????? ????????????????'
					})
				}
			else if (x.includes("<b>Warning</b>"))
				{
				Swal.fire({
					  icon: 'error',
					  title: '????????????',
					  text: '?????????????????? ???????????? :'+x
					})
				}
				else
				{
				 x=JSON.parse(x)
				 
				 var patient_input = '<input type="text" class="form-control" id="patient_surname" value="'+x[0]['familia_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_name" value="'+x[0]['imya_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_patronimic" value="'+x[0]['ochestvo_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_phone" value="'+x[0]['telefon_pacientes']+'" readonly/>'+
					        '<label class="control-label">???????? ????????????????:</label>'+
							'<input type="date" class="form-control" id="patient_birthday" value="'+x[0]['fecha_n_pacientes']+'" readonly/>'+
							'<div id = "patient_buttons"class="col text-center">'+
		            		'<button type="button" class="btn btn-warning" onclick="cancelPatient()">????????????????</button>'+
		            		'</div>'
					        
		            		
		            		$('#client_info_block').html(patient_input)
				 
				}
			
			
		})
		.fail(function() {
		    console.log("error");
		});
	
}

function getProcedures()
{
	$.ajax({
		    url: 'index.php?controller=Appointments&action=GetProcedures',
		    type: 'POST',
		    data: {},
		})
		.done(function(x) {
			
			x=JSON.parse(x)
					
		    select = document.getElementById('procedure_id');

		for (var i = 0; i<x.length; i++){
		    var opt = document.createElement('option');
		    opt.value = x[i]['id_procedimientos'];
		    opt.innerHTML = x[i]['nombre_procedimientos'];
		    select.appendChild(opt);
		}
		})
		.fail(function() {
		    console.log("error");
		});
}

function getProcedureZones()
{
	var procedure_id = $("#procedure_id").val()
	$.ajax({
		    url: 'index.php?controller=Appointments&action=GetProcedureZones',
		    type: 'POST',
		    data: {id_procedure:procedure_id},
		})
		.done(function(x) {
			
			x=JSON.parse(x)
					
		    select = document.getElementById('procedure_zone');

		for (var i = 0; i<x.length; i++){
		    var opt = document.createElement('option');
		    opt.value = x[i]['id_especificaciones_procedimientos'];
		    opt.innerHTML = x[i]['nombre_especificaciones_procedimientos'];
		    select.appendChild(opt);
		}
		})
		.fail(function() {
		    console.log("error");
		});
}

function getAppointmentHours()
{
	
	var date = $("#appointment_date").val()
	var duration = $("#appointment_duration").val()
	
	if(date == "")
		{
		Swal.fire({
			  icon: 'warning',
			  title: '????????????????',
			  text: '???????????????????? ????????'
			})
		}
	else
		{
			var procedures_table = []

			var table = document.getElementById("procedures_table")
	
			var rowCount = CountRows()
			var i = rowCount + 1
			
			for (var j=1; j<i; j++)
			{
				var x= table.rows[j].cells;
				var rowElements = []
				
					
					if(x[2].innerHTML=="???????????????????????????? ??????????????") rowElements.push(1)
					else if(x[2].innerHTML=="??????????????????????????") rowElements.push(2)
					else rowElements.push(0)
					rowElements.push(x[4].innerHTML) 
				
				procedures_table.push(rowElements)
			}

			var jsonString = JSON.stringify(procedures_table);

		$.ajax({
		    url: 'index.php?controller=Appointments&action=getAvailableHour',
		    type: 'POST',
		    data: {
		    	selected_date:date,
				duration:duration,
				procedure_table:jsonString
		    },
		})
		.done(function(x) {
			
			//alertMessages('info', x, 'DEL CONTROLADOR')
			$("#appointmet_time_section").html(x)
			$("#appointment_time").val("")
		})
		.fail(function() {
		    console.log("error");
		});
		}
	
	
}

function CountRows() {

        var rowCount = 0;
        var table = document.getElementById("procedures_table");
        var rows = table.getElementsByTagName("tr")
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
        }
        return rowCount
    }
    
function addProcedure()
{
	var procedure_id = $("#procedure_id").val()
	
	if (procedure_id == "")
	{
		Swal.fire({
					  icon: 'info',
					  title: '????????????????',
					  text: '???????????????? ??????????????????'
					})
	}
	else
	{
		$.ajax({
		    url: 'index.php?controller=Appointments&action=GetProcedureType',
		    type: 'POST',
		    data: {
		    		procedure_id:procedure_id
		    },
		})
		.done(function(x) {
			
			x=x.trim()
			console.log(x)
			switch (x)
		
		{
			case "???? ??????????":
				settingProcedureZone()
			break;
			case "???? ????????????????????":
				settingProcedurePreparat()
			break;
			case "???? ??????-???? ??????":
				settingProcedureZoneq()
			break;
			case "???? ????????????????":
				settingProcedureUnits()
			break;
			case "?????? ??????.":
				settingProcedureBD()			
			break;
		}
			
		})
		.fail(function() {
		    console.log("error");
		});
		
		
	}
}

function settingProcedureBD()
{
 	var settings_input = '<label class="control-label">???????????? (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="????????????"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureBD()">??????????????????</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">????????????????</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	$("#procedure_settings").modal('show')
}

function settingProcedureZoneq()
{
 	var settings_input ='<label class="control-label">??????-???? ??????:</label>'+
 						'<input type="number" class="form-control" id="procedure_zone_count" placeholder="??????-???? ??????"/>'+ 
 						'<label class="control-label">???????????? (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="????????????"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureZoneq()">??????????????????</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">????????????????</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	$("#procedure_settings").modal('show')
}

function settingProcedureZone()
{
 	var settings_input ='<select id="procedure_zone"  class="form-control" >'+
						'<option value="" selected="selected">--?????????????? ????????--</option>'+		
  						'</select>'+ 
 						'<label class="control-label">???????????? (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="????????????"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureZone()">??????????????????</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">????????????????</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	getProcedureZones()
	
	$("#procedure_settings").modal('show')
}

function settingProcedurePreparat()
{
 	var settings_input ='<select id="procedure_zone"  class="form-control" >'+
						'<option value="" selected="selected">--?????????????? ????????????????--</option>'+		
  						'</select>'+ 
 						'<label class="control-label">???????????? (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="????????????"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureZone()">??????????????????</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">????????????????</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	getProcedureZones()
	
	$("#procedure_settings").modal('show')
}

function settingProcedureUnits()
{
 	var settings_input ='<select id="procedure_zone"  class="form-control" >'+
						'<option value="" selected="selected">--?????????????? ??????????????--</option>'+		
  						'</select>'+
  						'<label class="control-label">??????-???? ????????????:</label>'+
 						'<input type="number" class="form-control" id="procedure_units" placeholder="??????-???? ????????????"/>'+
 						'<label class="control-label">???????????? (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="????????????"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureUnits()">??????????????????</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">????????????????</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	getProcedureZones()
	
	$("#procedure_settings").modal('show')
}

function addProcedureZone()
{
 
 var procedure_id = $("#procedure_id").val()
 var procedure_name = $("#procedure_id")[0].selectedOptions[0].innerText
 var procedure_discount = $("#procedure_discount").val()
 if (typeof procedure_discount === 'undefined'|| procedure_discount=="") procedure_discount=0
 var procedure_zone = $("#procedure_zone").val()
 if (typeof procedure_zone === 'undefined'|| procedure_zone=="")
 {
 Swal.fire({
	  icon: 'warning',
	  title: '????????????????',
	  text: '???????????????? ???????? ?????? ????????????????'
	})
 }
else
 {
 $("#procedure_settings").modal('hide')
 
 console.log(procedure_discount)
$.ajax({
		    url: 'index.php?controller=Appointments&action=GetExtraCost',
		    type: 'POST',
		    data: {
		    	id_especificacion_procedimiento:procedure_zone
		    },
		})
		.done(function(x) {
			
			
			console.log(x)
			x=JSON.parse(x)
			procedure_zone = $("#procedure_zone")[0].selectedOptions[0].innerText
			var table = document.getElementById("procedures_table")
			
			
				var rowCount = CountRows()
				var i = rowCount + 1
				var row = table.insertRow();
				
				// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				
				//var i =  rowCount+1
				// Add some text to the new cells:
				cell2.innerHTML = i;
				cell3.innerHTML = procedure_name;
				cell4.innerHTML = procedure_zone;
				cell5.innerHTML = x[0]['duracion_especificaciones_procedimientos'];
				cell6.innerHTML = x[0]['costo_especificaciones_procedimientos'];
				cell7.innerHTML = procedure_discount;
				cell8.innerHTML = '<ul class="pagination">'+
								  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+i+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
								  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+i+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
								  '</ul>'
				cell1.innerHTML ='<button type="button" class="btn btn-danger" onclick="DeleteRow('+i+')"><i class="fa fa-close"></i></button>'
			
			
			$("#procedure_id").val("")
						
		})
		.fail(function() {
		    console.log("error");
		});
 }
}

function addProcedureZoneq()
{
 
 var procedure_id = $("#procedure_id").val()
 var procedure_name = $("#procedure_id")[0].selectedOptions[0].innerText
 var procedure_discount = $("#procedure_discount").val()
 if (typeof procedure_discount === 'undefined'|| procedure_discount=="") procedure_discount=0
 var procedure_zone_count = $("#procedure_zone_count").val()
 
 if (typeof procedure_zone_count === 'undefined'|| procedure_zone_count=="" || procedure_zone_count == "0")
	 {
	 Swal.fire({
		  icon: 'warning',
		  title: '????????????????',
		  text: '?????????????? ??????-???? ??????'
		})
	 }
 else
	 {
	 $("#procedure_settings").modal('hide')
	 
	 console.log(procedure_discount)
	$.ajax({
			    url: 'index.php?controller=Appointments&action=GetProcedureBDCost',
			    type: 'POST',
			    data: {
			    		procedure_id:procedure_id
			    },
			})
			.done(function(x) {
				
				x=x.trim()
				console.log(x)
				x=JSON.parse(x)
					
				var table = document.getElementById("procedures_table")
				
				
					var rowCount = CountRows()
					var i = rowCount + 1
					var row = table.insertRow();
					
					// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					var cell5 = row.insertCell(4);
					var cell6 = row.insertCell(5);
					var cell7 = row.insertCell(6);
					var cell8 = row.insertCell(7);
					
					var precio_total = x[0]['precio_procedimientos'] * procedure_zone_count
					//var i =  rowCount+1
					// Add some text to the new cells:
					cell2.innerHTML = i;
					cell3.innerHTML = procedure_name;
					cell4.innerHTML = '';
					cell5.innerHTML = x[0]['duracion_procedimientos'];
					cell6.innerHTML = precio_total;
					cell7.innerHTML = procedure_discount;
					cell8.innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+i+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+i+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					cell1.innerHTML ='<button type="button" class="btn btn-danger" onclick="DeleteRow('+i+')"><i class="fa fa-close"></i></button>'
					
				
				
				$("#procedure_id").val("")
							
			})
			.fail(function() {
			    console.log("error");
			});
	 }
 
}

function addProcedureUnits()
{
 
 var procedure_id = $("#procedure_id").val()
 var procedure_name = $("#procedure_id")[0].selectedOptions[0].innerText
 var procedure_discount = $("#procedure_discount").val()
 if (typeof procedure_discount === 'undefined'|| procedure_discount=="") procedure_discount=0
 var procedure_units = $("#procedure_units").val()
 var procedure_zone = $("#procedure_zone").val()
 
 
 if (typeof procedure_units === 'undefined'|| procedure_units==""|| procedure_units=="0")
	 {
	 Swal.fire({
		  icon: 'warning',
		  title: '????????????????',
		  text: '?????????????? ??????-???? ????????????'
		})
	 }
 else if (typeof procedure_zone === 'undefined'|| procedure_zone=="")
	 {
	 Swal.fire({
		  icon: 'warning',
		  title: '????????????????',
		  text: '???????????????? ??????????????'
		})
	 }
 else
	 {
	 $("#procedure_settings").modal('hide')
	 
	 console.log(procedure_discount)
	$.ajax({
			    url: 'index.php?controller=Appointments&action=GetExtraCost',
			    type: 'POST',
			    data: {
			    	id_especificacion_procedimiento:procedure_zone
			    },
			})
			.done(function(x) {
				
				x=x.trim()
				console.log(x)
				
				x=JSON.parse(x)
				procedure_zone = $("#procedure_zone")[0].selectedOptions[0].innerText
				var table = document.getElementById("procedures_table")
				
				
					var rowCount = CountRows()
					var i = rowCount + 1
					var row = table.insertRow();
					
					// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					var cell5 = row.insertCell(4);
					var cell6 = row.insertCell(5);
					var cell7 = row.insertCell(6);
					var cell8 = row.insertCell(7);
					
					var precio_total = procedure_units * x[0]['costo_especificaciones_procedimientos']
					//var i =  rowCount+1
					// Add some text to the new cells:
					cell2.innerHTML = i;
					cell3.innerHTML = procedure_name;
					cell4.innerHTML = procedure_zone;
					cell5.innerHTML = x[0]['duracion_especificaciones_procedimientos'];
					cell6.innerHTML = precio_total
					cell7.innerHTML = procedure_discount;
					cell8.innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+i+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+i+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					cell1.innerHTML ='<button type="button" class="btn btn-danger" onclick="DeleteRow('+i+')"><i class="fa fa-close"></i></button>'
					
				
				
				$("#procedure_id").val("")
							
			})
			.fail(function() {
			    console.log("error");
			});
	 }
 
}

function addProcedureBD()
{
 
 $("#procedure_settings").modal('hide')
 
 var procedure_id = $("#procedure_id").val()
 var procedure_name = $("#procedure_id")[0].selectedOptions[0].innerText
 var procedure_discount = $("#procedure_discount").val()
 if (typeof procedure_discount === 'undefined'|| procedure_discount=="") procedure_discount=0
 
 
 console.log(procedure_discount)
$.ajax({
		    url: 'index.php?controller=Appointments&action=GetProcedureBDCost',
		    type: 'POST',
		    data: {
		    		procedure_id:procedure_id
		    },
		})
		.done(function(x) {
			
			x=x.trim()
			console.log(x)
			
			x=JSON.parse(x)
			
			var table = document.getElementById("procedures_table")
			
			var rowCount = CountRows()
			var i = rowCount + 1
			var row = table.insertRow();
			
			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);
			var cell8 = row.insertCell(7);
			
			//var i =  rowCount+1
			// Add some text to the new cells:
			cell2.innerHTML = i;
					cell3.innerHTML = procedure_name;
					cell4.innerHTML = '';
					cell5.innerHTML = x[0]['duracion_procedimientos'];
					cell6.innerHTML = x[0]['precio_procedimientos'];
					cell7.innerHTML = procedure_discount;
					cell8.innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+i+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+i+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					cell1.innerHTML ='<button type="button" class="btn btn-danger" onclick="DeleteRow('+i+')"><i class="fa fa-close"></i></button>'
			
			$("#procedure_id").val("")
						
		})
		.fail(function() {
		    console.log("error");
		});
}

function DeleteRow(rowNum)
{
	var table = document.getElementById("procedures_table")
	
	var rowCount = CountRows()
	var i = rowCount + 1
	
	for (var j=0; j<i; j++)
	{
	 if (rowNum==j) table.deleteRow(j);
	}
	
	rowCount = CountRows()
	i = rowCount + 1
	
	for (var j=1; j<i; j++)
	{
	 var x= table.rows[j].cells;
	 x[1].innerHTML = j
	 x[0].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+j+')"><i class="fa fa-close"></i></button>'
	}
}

function MoveProcedureUp(rowNum)
{
	var table = document.getElementById("procedures_table")
	
	var rowCount = CountRows()
	var i = rowCount + 1
	
	if (rowNum!="1")
		{	
			for (var j=1; j<i; j++)
			{
				if (j==rowNum)
					{
					var prevIndex=j-1
					var x= table.rows[j].cells;
					var y= table.rows[j-1].cells;
					
					var y2 = y[2].innerHTML
					var y3 = y[3].innerHTML
					var y4 = y[4].innerHTML
					var y5 = y[5].innerHTML
					var y6 = y[6].innerHTML
					var y7 = y[7].innerHTML
					
					y[1].innerHTML = j-1
					y[0].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+prevIndex+')"><i class="fa fa-close"></i></button>'
					y[2].innerHTML = x[2].innerHTML
					y[3].innerHTML = x[3].innerHTML
					y[4].innerHTML = x[4].innerHTML
					y[5].innerHTML = x[5].innerHTML
					y[6].innerHTML = x[6].innerHTML
					y[7].innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+prevIndex+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+prevIndex+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					
					x[1].innerHTML = j
					x[0].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+j+')"><i class="fa fa-close"></i></button>'
					x[2].innerHTML = y2
					x[3].innerHTML = y3
					x[4].innerHTML = y4
					x[5].innerHTML = y5
					x[6].innerHTML = y6
					x[7].innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+j+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+j+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					
					}
			 
			}
			
			
		}
}

function MoveProcedureDown(rowNum)
{
	var table = document.getElementById("procedures_table")
	
	var rowCount = CountRows()
	var i = rowCount + 1
	
	if (rowNum!=i)
		{	
			for (var j=1; j<i; j++)
			{
				if (j==rowNum)
					{
					var nextIndex=j+1
					var x= table.rows[j].cells;
					var y= table.rows[j+1].cells;
					
					var y2 = y[2].innerHTML
					var y3 = y[3].innerHTML
					var y4 = y[4].innerHTML
					var y5 = y[5].innerHTML
					var y6 = y[6].innerHTML
					var y7 = y[7].innerHTML
					
					y[1].innerHTML = j+1
					y[0].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+nextIndex+')"><i class="fa fa-close"></i></button>'
					y[2].innerHTML = x[2].innerHTML
					y[3].innerHTML = x[3].innerHTML
					y[4].innerHTML = x[4].innerHTML
					y[5].innerHTML = x[5].innerHTML
					y[6].innerHTML = x[6].innerHTML
					y[7].innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+nextIndex+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+nextIndex+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					
					x[1].innerHTML = j
					x[0].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+j+')"><i class="fa fa-close"></i></button>'
					x[2].innerHTML = y2
					x[3].innerHTML = y3
					x[4].innerHTML = y4
					x[5].innerHTML = y5
					x[6].innerHTML = y6
					x[7].innerHTML = '<ul class="pagination">'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureUp('+j+')"><i class="fa fa-arrow-circle-up fa-2x"></i></a></span></li>'+
									  '<li class="page-item"><span><a class="page-link" onclick="MoveProcedureDown('+j+')"><i class="fa fa-arrow-circle-down fa-2x"></i></a></span></li>'+
									  '</ul>'
					
					}
			 
			}
			
			
		}
}

function cancelModal()
{
	 $("#procedure_settings").modal('hide')
	 $("#procedure_id").val("")
}

function cleanProceduresTable()
{
	var table = document.getElementById("procedures_table")
	var rowCount = CountRows()
	var i = rowCount + 1
	
	for (var j=1; j<i; j++)
	{
		table.deleteRow(1);
	}
}

function alertMessages(tipo, mensaje, titulo)
{
	Swal.fire({
		  icon: tipo,
		  title: titulo,
		  text: mensaje
		})
}

function salirSesion()
{
  $.ajax({
    url: 'index.php?controller=UserLogin&action=SalirSesion',
    type: 'POST',
    data: {
    },
})
.done(function(x) {

      window.location.href = "index.php?controller=UserLogin&action=index"
})
.fail(function() {
    console.log("error");
});

}