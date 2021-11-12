$(document).ready(function(){

    loadDueToday()
    loadNextAppointment()
    
    })

function loadDueToday()
{
	$.ajax({
		    url: 'index.php?controller=MainPage&action=LoadToday',
		    type: 'POST',
		    data: {},
		})
		.done(function(x) {
            
            $("#citas_hoy").html(x)

		})
		.fail(function() {
		    console.log("error");
		});
}

function showAppointment(id_cita)
{
    window.location.href = "index.php?controller=ShowAppointments&action=load_specific_appointment&cita="+id_cita
}

function loadNextAppointment()
{
	$.ajax({
		url: 'index.php?controller=MainPage&action=LoadNext',
		type: 'POST',
		data: {},
	})
	.done(function(x) {
		
		$("#next_appointment").html(x)

	})
	.fail(function() {
		console.log("error");
	});
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