$(document).ready(function(){

    loadDueToday()
    
    })

function loadDueToday()
{
	$.ajax({
		    url: 'index.php?controller=TomorrowPage&action=LoadToday',
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
