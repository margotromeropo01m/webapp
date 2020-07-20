<?php 
class PreparatsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Procedures";
        $tabName="Preparats";
        
        $this->view("Preparats",array("pageName"=>$pageName, "tabName"=>$tabName));
        
    }
    
    
}
?>