<?php 
class NotFoundController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        

        session_start();
        if(isset($_SESSION['id_usuario']))
        { 
            $this->view("NotFound",array());
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