<?php 
class PatientsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Patients";
        $tabName="Patients";
        
        $this->view("Patients",array("pageName"=>$pageName, "tabName"=>$tabName));
        
    }
    
    public function InsertPatient()
    {
        $patients = new PatientsModel();
        
        $name = $_POST['patient_name'];
        $surname  = $_POST['patient_surname'];
        $patronimic  = $_POST['patient_patronimic'];
        $birthday = $_POST['patient_birthday'];
        $phone = $_POST['patient_phone'];
        
        echo "Name ".$name;
        
        $columnas="id_pacientes";
        $tablas="pacientes";
        $where="imya_pacientes='".$name."' AND familia_pacientes='".$surname."' AND ochestvo_pacientes='".$patronimic."'AND telefon_pacientes='".$phone."' AND fecha_n_pacientes='".$birthday."'";
        $id="id_pacientes";
        $resultSet=$patients->getCondiciones($columnas, $tablas, $where, $id);
        
        echo "elementos delvueltos ".count($resultSet);
        
        if (empty($resultSet))
        {
            
            $query = "INSERT INTO pacientes (imya_pacientes, familia_pacientes, ochestvo_pacientes, telefon_pacientes, fecha_n_pacientes)
                     VALUES ('".$name."','".$surname."','".$patronimic."','".$phone."','".$birthday."')";
            echo $query;
            $resultInsert=$patients->executeNonQuery($query);
            
            echo $resultInsert;
        }
        else
        {
            echo "Patient already exists";
        }
    }
    
    
}
?>