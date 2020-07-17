<?php 
class MainPageController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function DueToday(){
        $pageName="MainPage";
        $this->view("MainPage",array("pageName"=>$pageName));
        
    }
    
    
}
?>