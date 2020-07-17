<?php 
class ReportsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Reports";
        $this->view("Reports",array("pageName"=>$pageName));
        
    }
    
    
}
?>