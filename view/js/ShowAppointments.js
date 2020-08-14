$(document).ready(function(){

loadAppointmentsTable()

})

function loadAppointment(id_appointment)
{
    console.log("CEEEEEEb"+id_appointment)
}

function loadAppointmentsTable()
{
    $.ajax({
        url: 'index.php?controller=ShowAppointments&action=loadAppointments',
        type: 'POST',
        data: {
        },
    })
    .done(function(x) {
        $("#tabla_citas").html(x)
    })
    .fail(function() {
        console.log("error");
    });
}