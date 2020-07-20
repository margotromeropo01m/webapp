<?php 
class ZonesController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Procedures";
        $tabName="Zones";
        
        $this->view("Zones",array("pageName"=>$pageName, "tabName"=>$tabName));
        
    }
    
    
}
?>