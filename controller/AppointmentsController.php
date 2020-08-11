<?php 
class AppointmentsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Appointments";
        $this->view("Appointments",array("pageName"=>$pageName));
        
    }
    
    public function FindPatient()
    {
        $patients = new PatientsModel();
        
        $phone = $_POST['patient_phone'];
        
        $columnas="id_pacientes, imya_pacientes, familia_pacientes, ochestvo_pacientes, fecha_n_pacientes";
        $tablas="pacientes";
        $where="telefon_pacientes='".$phone."'";
        $id="id_pacientes";
        $resultSet=$patients->getCondiciones($columnas, $tablas, $where, $id);
        
        if (empty($resultSet))
        {echo 0;}
        else
        {
            echo json_encode($resultSet);
        }
               
    }
    
    public function getProcedures()
    {
        $extras = new ExtrasModel();
        
        $columnas="procedimientos.id_procedimientos, procedimientos.nombre_procedimientos";
        $tablas="procedimientos INNER JOIN estados
                 ON estados.id_estados = procedimientos.id_estado_procedimientos";
        $where="nombre_estados ='ACTIVO' AND tabla_estados='procedimientos'";
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getProcedureZones()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['id_procedure'];
        
        $columnas="especificaciones_procedimientos.id_especificaciones_procedimientos, especificaciones_procedimientos.nombre_especificaciones_procedimientos";
        $tablas="procedimientos INNER JOIN especificaciones_procedimientos
                 ON procedimientos.id_procedimientos = especificaciones_procedimientos.id_procedimientos
                 INNER JOIN estados
                 ON estados.id_estados = especificaciones_procedimientos.id_estados";
        $where="especificaciones_procedimientos.id_procedimientos=".$id_procedimiento." AND nombre_estados ='ACTIVO' AND tabla_estados='especificaciones_procedimientos'";
        $id="especificaciones_procedimientos.id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getExtraCost()
    {
        $extras = new ExtrasModel();
        
        $id_especificacion_procedimiento = $_POST['id_especificacion_procedimiento'];
        
        $columnas="costo_especificaciones_procedimientos, duracion_especificaciones_procedimientos";
        $tablas="especificaciones_procedimientos";
        $where="id_especificaciones_procedimientos =".$id_especificacion_procedimiento;
        $id="id_especificaciones_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getAvailableHour() 
    {
        $free="#82E0AA";
        $warning  = "#F7DC6F";
        $busy = "#F1948A";
        $html = '<select id="appointment_time"  class="form-control" >
         			<option value="" selected="selected">--Выберите время--</option>';
        $starting_time = "8:00";
        $html.='<option value="'.$starting_time.'" selected="selected" style="background:'.$free.'">'.$starting_time.'</option>';
        
        while($starting_time != "19:30")
        {
            $endTime = strtotime("+30 minutes", strtotime($starting_time));
            $timeend=date('H:i', $endTime);
            $html.='<option value="'.$timeend.'" selected="selected" style="background:'.$free.'">'.$timeend.'</option>';
            $starting_time = $timeend;
        }
        
        $html.='</select>';
        echo $html;
        
    }
    
    public function getProcedureType()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['procedure_id'];
        
        $columnas="tipo_procedimientos.nombre_tipo_procedimientos";
        $tablas="tipo_procedimientos INNER JOIN procedimientos
                 ON tipo_procedimientos.id_tipo_procedimientos = procedimientos.id_tipo_procedimientos";
        $where="procedimientos.id_procedimientos = ".$id_procedimiento;
        $id="tipo_procedimientos.id_tipo_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo $resultSet[0]['nombre_tipo_procedimientos'];
    }
    
    public function getProcedureBDCost()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['procedure_id'];
        
        $columnas="precio_procedimientos, duracion_procedimientos";
        $tablas="procedimientos";
        $where="id_procedimientos = ".$id_procedimiento;
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
}
?>