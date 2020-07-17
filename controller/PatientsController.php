<?php 
class PatientsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Patients";
        $this->view("Patients",array("pageName"=>$pageName));
        
    }
    
    
}
?>