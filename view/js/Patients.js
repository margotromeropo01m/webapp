$(document).ready(function () {
            $('.collapse')
                .on('shown.bs.collapse', function() {
                    $(this)
                        .parent()
                        .find(".fa-caret-square-o-down")
                        .removeClass("fa-caret-square-o-down")
                        .addClass("fa-caret-square-o-up");
                })
                .on('hidden.bs.collapse', function() {
                    $(this)
                        .parent()
                        .find(".fa-caret-square-o-up")
                        .removeClass("fa-caret-square-o-up")
                        .addClass("fa-caret-square-o-down");
                });
            
            $('#patient-phone').mask('+7-(000)-000-00-00')
            
            loadPatients(1)
        });

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

function loadPatients(page)
{
	var search = $("#patientSearch").val()
	
	var firstChar = search.charAt(0)
	
	if( firstChar <='9' && firstChar >='0') {
      
		search = formatNumber(search)
	}
	
	$.ajax({
	    url: 'index.php?controller=Patients&action=GetPatients',
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

function savePatient()
{
 var name = $("#patient-name").val()
 var surname = $("#patient-surname").val()
 var patronimic = $("#patient-patronimic").val()
 var birthday = $("#patient-birthday").val()
 var phone = $("#patient-phone").val()
 
 console.log(phone)
 
 if(name=="" || surname=="" || patronimic=="" ||
		 birthday=="" || phone=="")
	 {
	 var message="Пожалуйста заполните все данные!"
		 failAlert(message)
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
		    	patient_phone:phone
		    },
		})
		.done(function(x) {
			x=x.trim()
			console.log("respuesta del servidor -> " +x)
			if(x=="2")
				{
				var message="Пациент уже зарегистрирован!"
				failAlert(message)
				}
			else if (x=="1")
				{
				successAlert()
				clearFields()
				loadPatients(1)
				}
			else
				{
				var message="Произошла ошибка!"
					failAlert(message)
				}
			
			
		})
		.fail(function() {
		    console.log("error");
		});
	 }
  
}

function clearFields()
{
	$("#patient-name").val("")
	$("#patient-surname").val("")
	$("#patient-patronimic").val("")
	$("#patient-birthday").val("")
	$("#patient-phone").val("")
}

function cancelPatient()
{
	clearFields()
	closeAlertPatients()
}

function closeAlertPatients()
{
	$("#alert-patients").slideUp(500)	
}

function successAlert()
{
	$("#alert-patients").removeClass("alert-danger")
    $("#alert-patients").addClass("alert-success");
	
	var alertMessage="Пациент довабился успешно!"
	 $("#alert-message-patients").html(alertMessage)
	
	 $("#alert-patients").fadeTo(500,500)
	
}

function failAlert(message)
{
	
    $("#alert-patients").removeClass("alert-success")
    $("#alert-patients").addClass("alert-danger");
	
	 $("#alert-message-patients").html(message)
	
	 $("#alert-patients").fadeTo(500,500)
	
}