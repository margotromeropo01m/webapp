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
        $tablas="procedimientos INNER JOIN tipo_procedimientos
                 ON procedimientos.id_tipo_procedimientos = tipo_procedimientos.id_tipo_procedimientos";
        $where="1=1";
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
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
        
        $columnas="precio_procedimientos";
        $tablas="procedimientos";
        $where="id_procedimientos = ".$id_procedimiento;
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo $resultSet[0]['precio_procedimientos'];
    }
}
?>