<?php 
class HistoriesController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Patients";
        $tabName="Histories";
        
        $this->view("Patients",array("pageName"=>$pageName, "tabName"=>$tabName));
        
    }
    
    
}
?>