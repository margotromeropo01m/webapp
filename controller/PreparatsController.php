<?php 
class PreparatsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        

        session_start();
        if(isset($_SESSION['id_usuario']))
        { 
          
        $pageName="Procedures";
        $tabName="Preparats";
        
        $this->view("Preparats",array("pageName"=>$pageName, "tabName"=>$tabName));
        }
        else
        {
            $pageName="UserLogin";
            $this->view("UserLogin",array("pageName"=>$pageName));
        }
        
    }
    
    public function Notfound()
    {
        echo '<script type="text/javascript">',
        'window.location.href = "index.php?controller=NotFound&action=index"',
        '</script>';
    }
    
}
?>