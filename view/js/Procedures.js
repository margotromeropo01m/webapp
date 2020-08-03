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
            
            getProceduresType()
            getProceduresTable()
        });

function getProceduresType()
{
	 $.ajax({
		    url: 'index.php?controller=Procedures&action=GetProcedureType',
		    type: 'POST',
		    data: {},
		})
		.done(function(x) {
			
			x=JSON.parse(x)
						
			
		   var select = document.getElementById('procedure_type');
			var select_search = document.getElementById('procedure_type_search')

		for (var i = 0; i<x.length; i++){
		    var opt = document.createElement('option');
		    opt.value = x[i]['id_tipo_procedimientos'];
		    opt.innerHTML = x[i]['nombre_tipo_procedimientos'];
		    select.appendChild(opt);
		    select_search.appendChild(opt);
		}
		})
		.fail(function() {
		    console.log("error");
		});
}

function saveProcedure()
{
 var name = $("#procedure_name").val()
 var cost = $("#procedure_cost").val()
 var type = $("#procedure_type").val()
 
 if(name=="" || cost=="" || type=="")
	 {
	 var message="Пожалуйста заполните все данные!"
		 failAlert(message)
	 }
 else
	 {
	 $.ajax({
		    url: 'index.php?controller=Procedures&action=InsertProcedure',
		    type: 'POST',
		    data: {
		    	procedure_name:name,
		    	procedure_cost:cost,
		    	procedure_type_id:type
		    },
		})
		.done(function(x) {
			x=x.trim()
			console.log("respuesta del servidor -> " +x)
			if(x=="2")
				{
				var message="Процедура уже зарегистрирована!"
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

function clearFields()
{
	$("#procedure_name").val("")
	$("#procedure_cost").val("")
	$("#procedure_type").val("")
}

function cancelProcedure()
{
	clearFields()
	closeAlertProcedures()
}

function closeAlertProcedures()
{
	$("#alert-procedures").slideUp(500)	
}

function successAlert()
{
	$("#alert-procedures").removeClass("alert-danger")
    $("#alert-procedures").addClass("alert-success");
	
	var alertMessage="Процедура довабилась успешно!"
	 $("#alert-message-procedures").html(alertMessage)
	
	 $("#alert-procedures").fadeTo(500,500)
	
}

function failAlert(message)
{
	
    $("#alert-procedures").removeClass("alert-success")
    $("#alert-procedures").addClass("alert-danger");
	
	 $("#alert-message-procedures").html(message)
	
	 $("#alert-procedures").fadeTo(500,500)
	
}