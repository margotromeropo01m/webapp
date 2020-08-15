$(document).ready(function(){

//loadAppointmentsTable()
loadSearchTypes()

})

function loadAppointment(id_appointment)
{
    $.ajax({
        url: 'index.php?controller=ShowAppointments&action=getAppointmentById',
        type: 'POST',
        data: {
            id_cita:id_appointment
        },
    })
    .done(function(x) {

        $("#tabla_citas").html(x)
        
		})
		.fail(function() {
		    console.log("error");
		});
}

function loadSearchTypes()
{
	$.ajax({
		    url: 'index.php?controller=ShowAppointments&action=getAppointmentType',
		    type: 'POST',
		    data: {},
		})
		.done(function(x) {
			
			x=JSON.parse(x)
					
		    select = document.getElementById('type_search');

		for (var i = 0; i<x.length; i++){
            switch (x[i]['nombre_estados'])
            {
                case "ACTIVO":
                    x[i]['nombre_estados']="АКТИВНЫЕ"
                    break;
                case "CANCELADO":
                    x[i]['nombre_estados']="ОТМЕНЕНЫЕ"
                    break;
                case "PAGADO":
                    x[i]['nombre_estados']="ОПЛАЧЕНЫЕ"
                    break;

            }
		    var opt = document.createElement('option');
		    opt.value = x[i]['id_estados'];
		    opt.innerHTML = x[i]['nombre_estados'];
		    select.appendChild(opt);
		}
		})
		.fail(function() {
		    console.log("error");
		});
}

function loadAppointmentsTable()
{
    var search_date = $("#search_date").val()
    var search_type = $("#type_search").val()

    $.ajax({
        url: 'index.php?controller=ShowAppointments&action=loadAppointments',
        type: 'POST',
        data: {search_date:search_date,
              search_type:search_type
        },
    })
    .done(function(x) {
        $("#tabla_citas").html(x)
    })
    .fail(function() {
        console.log("error");
    });
}