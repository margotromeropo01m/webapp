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
						  title: 'Недостаточная информация о пациенте',
						  text: 'Пожалуйста запольните все данные'
						})
					}
				}
			else
				{
				Swal.fire({
					  icon: 'info',
					  title: 'Нет данных о пациенте',
					  text: 'Пожалуйста выберите или регистрируете нового пациента'
					})
				}
			
			break;
		case "procedure_field":
			
			var rows = CountRows()
			
			if (rows == 0)
			{
			 Swal.fire({
					  icon: 'info',
					  title: 'Внимание',
					  text: 'Выберите хотя бы одну процедуру'
					})
			}
			else
			{
				answer = true
			}
			console.log("procedure")
			break;
		case "date_field":
			console.log("date")
	}
	
	return answer	
}

function newPatient()
{
	    var patient_input = '<input type="text" class="form-control" id="patient_surname" placeholder="Фамилия" />'+
					        '<input type="text" class="form-control" id="patient_name" placeholder="Имя" />'+
					        '<input type="text" class="form-control" id="patient_patronimic" placeholder="Очество" />'+
					        '<input type="text" class="form-control" id="patient_phone" placeholder="Телефон" />'+
					        '<label class="control-label">Дата рождения:</label>'+
					        '<input type="date" class="form-control" id="patient_birthday" placeholder="Дата рождения" />'+
					        '<div id = "patient_buttons"class="col text-center">'+
		            		'<button type="button" class="btn btn-primary" onclick="savePatient()">Сохранить</button>'+
		            		'<button type="button" class="btn btn-danger" onclick="cancelPatient()">Отменить</button>'+
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
 
 if(name=="" || surname=="" || patronimic=="" ||
		 birthday=="" || phone=="")
	 {
	 Swal.fire({
		  icon: 'info',
		  title: 'Недостаточная информация о пациенте',
		  text: 'Пожалуйста запольните все данные'
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
		    	patient_phone:phone
		    },
		})
		.done(function(x) {
			x=x.trim()
			if(x=="2")
				{
				Swal.fire({
					  icon: 'warning',
					  title: 'Внимание',
					  text: 'Пациент уже зарегистрирован!'
					})
				}
			else if (x=="1")
				{
				Swal.fire({
					  icon: 'success',
					  title: 'Готово',
					  text: 'Пациент успешно зарегистрирован!'
					})
					document.getElementById('patient_name').setAttribute('readonly', true);
					document.getElementById('patient_surname').setAttribute('readonly', true);
					document.getElementById('patient_patronimic').setAttribute('readonly', true);
					document.getElementById('patient_phone').setAttribute('readonly', true);
					document.getElementById('patient_birthday').setAttribute('readonly', true);
					
					var patient_button = '<button type="button" class="btn btn-danger" onclick="cancelPatient()">Отменить</button>'
					$("#patient_buttons").html(patient_button)
					
				}
			else
				{
				Swal.fire({
					  icon: 'error',
					  title: 'Ощибка',
					  text: 'Произошла ошибка :'+x
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
	Swal.fire({
		  icon: 'error',
		  title: 'Oops...',
		  text: 'Something went wrong!'
		})
}

function cancelPatient()
{
	var patient_input = '<button type="button" class="btn btn-info" onclick="newPatient()">Новый Пациент</button>'+
						'<button type="button" class="btn btn-info" onclick="searchPatient()">Выбрать Пациента</button>'
		
	$('#client_info_block').html(patient_input)
}

function searchPatient()
{
	var patient_input = '<label class="control-label">Введите номер телефона зарегистрированого пациента:</label>'+
						'<input type="text" class="form-control" id="patient_name" placeholder="Имя" style="display: none"/>'+
						'<input type="text" id="patient_phone" placeholder="Телефон" />'+
						'<div id = "patient_buttons"class="col text-center">'+
	            		'<button type="button" class="btn btn-primary" onclick="findPatient()">Искать</button>'+
	            		'<button type="button" class="btn btn-danger" onclick="cancelPatient()">Отменить</button>'+
	            		'</div>'
	
	$('#client_info_block').html(patient_input)
					        
	$('#patient_phone').mask('+7-(000)-000-00-00')
	$("#patient_phone").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        findPatient()
    }
})
}

function findPatient()
{
	var phone = $("#patient_phone").val()
	
	if (phone.length < 18)
	{
	Swal.fire({
					  icon: 'warning',
					  title: 'Внимание',
					  text: 'Неверный формат телефона!'
					})
	}
	else
	{
	$.ajax({
		    url: 'index.php?controller=Appointments&action=FindPatient',
		    type: 'POST',
		    data: {
		    	
		    	patient_phone:phone
		    },
		})
		.done(function(x) {
			x=x.trim()
			 if (x=="0")
				{
					Swal.fire({
					  icon: 'warning',
					  title: 'Внимание',
					  text: 'Нет пациента по данному номеру телефона'
					})
				}
			else if (x.includes("<b>Warning</b>"))
				{
				Swal.fire({
					  icon: 'error',
					  title: 'Ощибка',
					  text: 'Произошла ошибка :'+x
					})
				}
				else
				{
				 x=JSON.parse(x)
				 
				 var patient_input = '<input type="text" class="form-control" id="patient_surname" value="'+x[0]['familia_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_name" value="'+x[0]['imya_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_patronimic" value="'+x[0]['ochestvo_pacientes']+'" readonly/>'+
					        '<input type="text" class="form-control" id="patient_phone" value="'+phone+'" readonly/>'+
					        '<label class="control-label">Дата рождения:</label>'+
					        '<input type="date" class="form-control" id="patient_birthday" value="'+x[0]['fecha_n_pacientes']+'" readonly/>'+
					        '<div id = "patient_buttons"class="col text-center">'+
		            		'<button type="button" class="btn btn-danger" onclick="cancelPatient()">Отменить</button>'+
		            		'</div>'
		            		
		            		$('#client_info_block').html(patient_input)
				 
				}
			
			
		})
		.fail(function() {
		    console.log("error");
		});
	}
	
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
					  title: 'Внимание',
					  text: 'Выберите процедуру'
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
			case "ПО ЗОНАМ":
			break;
			case "ПО ПРЕПАРАТАМ":
			break;
			case "ПО КОЛ-ВУ ЗОН":
			settingPocedureZoneq()
			break;
			case "ПО ЭДИНИЦАМ":
			break;
			case "БЕЗ ДОП.":
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
 	var settings_input = '<label class="control-label">Скидка (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="Скидка"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureBD()">Сохранить</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">Отменить</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	$("#procedure_settings").modal('show')
}

function settingProcedureZoneq()
{
 	var settings_input ='<label class="control-label">Кол-во Зон:</label>'+
 						'<input type="number" class="form-control" id="procedure_zone_count" placeholder="Скидка"/>'+ 
 						'<label class="control-label">Скидка (%):</label>'+
 						'<input type="number" class="form-control" id="procedure_discount" placeholder="Скидка"/>'
				        
 	var buttons_settings = '<button type="button" class="btn btn-primary" onclick="addProcedureBD()">Сохранить</button>'+
            				'<button type="button" class="btn btn-danger" onclick="cancelModal()">Отменить</button>'
            				
	$("#settings_modal").html(settings_input)
	$("#settings_footer").html(buttons_settings)
	
	$("#procedure_settings").modal('show')
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
			
			//var i =  rowCount+1
			// Add some text to the new cells:
			cell1.innerHTML = i;
			cell2.innerHTML = procedure_name;
			cell3.innerHTML = "";
			cell4.innerHTML = x;
			cell5.innerHTML = procedure_discount;
			cell6.innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+i+')"><i class="fa fa-close"></i></button>'
			
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
	 x[0].innerHTML = j
	 x[5].innerHTML = '<button type="button" class="btn btn-danger" onclick="DeleteRow('+j+')"><i class="fa fa-close"></i></button>'
	}
}

function cancelModal()
{
	 $("#procedure_settings").modal('hide')
	 $("#procedure_id").val("")
}