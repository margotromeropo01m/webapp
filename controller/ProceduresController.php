<?php 
class ProceduresController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Procedures";
        $tabName="Procedures";
        
        $this->view("Procedures",array("pageName"=>$pageName, "tabName"=>$tabName));
        
    }
    
    
}
?>