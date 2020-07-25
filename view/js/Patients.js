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
        });

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
	 var alertMessage="Пожалуйста заполните все данные!"
		 $("#alert-message-patients").html(alertMessage)
		 $("#alert-patients").fadeTo(500,500)
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
			console.log(x);
			
			
		})
		.fail(function() {
		    console.log("error");
		});
	 }
 
 
 

}

function cancelPatient()
{
	$("#patient-name").val("")
	$("#patient-surname").val("")
	$("#patient-patronimic").val("")
	$("#patient-birthday").val("")
	$("#patient-phone").val("")
	closeAlertPatients()
}

function closeAlertPatients()
{
	$("#alert-patients").slideUp(500)	
}

function successAlert()
{
	$("#alert-patients")
	.find(".alert-danger")
    .removeClass("alert-danger")
    .addClass("alert-success");
	
	var alertMessage="Пациент довабился успешно!"
	 $("#alert-message-patients").html(alertMessage)
	
	 $("#alert-patients").fadeTo(500,500)
	
}

function failAlert()
{
	$("#alert-patients")
	.find(".alert-success")
    .removeClass("alert-success")
    .addClass("alert-danger");
	
	var alertMessage="Ошибка довабления!"
	 $("#alert-message-patients").html(alertMessage)
	
	 $("#alert-patients").fadeTo(500,500)
	
}