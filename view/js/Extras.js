$(document).ready(function () {
            $('.collapse')
                .on('shown.bs.collapse', function() {
                	console.log("collapse")
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
            
            getProcedures()
            getProceduresTable()
        });

function getProceduresTable()
{
		var search = $("#search_procedure").val()
				
		$.ajax({
		    url: 'index.php?controller=Procedures&action=GetProceduresTable',
		    type: 'POST',
		    data: {
		    	search:search
		    },
		})
		.done(function(x) {
			x=x.trim()
			$('#procedures_table').html(x)	
		})
		.fail(function() {
		    console.log("error");
		});
}

function saveProcedureExtra()
{
 var name = $("#extra_name").val()
 var cost = $("#extra_cost").val()
 var id_procedure = $("#procedure_id").val()
 
 if(name=="" || cost=="" || id_procedure=="")
	 {
	 var message="Пожалуйста заполните все данные!"
		 failAlert(message)
	 }
 else
	 {
	 $.ajax({
		    url: 'index.php?controller=Extras&action=InsertProcedureExtra',
		    type: 'POST',
		    data: {
		    	extra_name:name,
		    	extra_cost:cost,
		    	procedure_id:id_procedure
		    },
		})
		.done(function(x) {
			x=x.trim()
			console.log("respuesta del servidor -> " +x)
			if(x=="2")
				{
				var message="Дополнение уже зарегистрировано!"
				failAlert(message)
				}
			else if (x=="1")
				{
				successAlert()
				clearFields()
				getProceduresTable()
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

function getProcedures()
{
	 $.ajax({
		    url: 'index.php?controller=Extras&action=GetProcedures',
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

function getProcedureInfo()
{
	var id_tipo_procedimiento = $('#procedure_id').val()
	
	if(id_tipo_procedimiento!="")
		{
		$.ajax({
		    url: 'index.php?controller=Extras&action=GetProcedureType',
		    type: 'POST',
		    data: {
		    	id_tipo_procedimiento:id_tipo_procedimiento
		    },
		})
		.done(function(x) {
			x=JSON.parse(x)
			
			 var input_type='<label  class="control-label">Вид дополнения:</label>'+
	     		'<input type="text" class="form-control" id="extra_type" value="'+x[0]['nombre_tipo_procedimientos']+'"  readonly>'+
	 			'<div id="mensaje_cedula_usuarios" class="errores"></div>'
	     		
     		var input_name='<label  class="control-label">Название дополнения:</label>'+
     		'<input type="text" class="form-control" id="extra_name" value=""  placeholder="Название">'+
 			'<div id="mensaje_cedula_usuarios" class="errores"></div>'

     		var input_cost='<label  class="control-label">Стоитмость дополнения:</label>'+
     		'<input type="number" class="form-control" id="extra_cost" value=""  placeholder="Стоитмость">'+
 			'<div id="mensaje_cedula_usuarios" class="errores"></div>'
     		
     		$('#procedure_type_info').html(input_type)
     		$('#procedure_extra_name').html(input_name)
     		$('#procedure_extra_cost').html(input_cost)
		    
		
		})
		.fail(function() {
		    console.log("error");
		});
		}
	else
		{
			$('#procedure_type_info').html("")
		}
		
}

function clearFields()
{
	$('#procedure_type_info').html("")
	$('#procedure_extra_name').html("")
	$('#procedure_extra_cost').html("")
	$("#procedure_id").val("")
}

function cancelExtra()
{
	clearFields()
	closeAlertProcedures()
}

function closeAlertProcedures()
{
	$("#alert-extras").slideUp(500)	
}

function successAlert()
{
	$("#alert-extras").removeClass("alert-danger")
    $("#alert-extras").addClass("alert-success");
	
	var alertMessage="Дополнение довабилось успешно!"
	 $("#alert-message-extras").html(alertMessage)
	
	 $("#alert-extras").fadeTo(500,500)
	
}

function failAlert(message)
{
	
    $("#alert-extras").removeClass("alert-success")
    $("#alert-extras").addClass("alert-danger");
	
	 $("#alert-message-extras").html(message)
	
	 $("#alert-extras").fadeTo(500,500)
	
}