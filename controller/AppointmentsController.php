<?php 
class AppointmentsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Appointments";
        $this->view("Appointments",array("pageName"=>$pageName));
        
    }
    
    
}
?>