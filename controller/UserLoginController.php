<?php 
class UserLoginController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function Login(){
        session_start();
        if(isset($_SESSION['id_usuario']))
        {
            $pageName="MainPage";
            $tabName="Today";
            $this->view("MainPage",array("pageName"=>$pageName, "tabName"=>$tabName));
        }
        else
        {
            $pageName="UserLogin";
            $this->view("UserLogin",array("pageName"=>$pageName));
        }
        
        
    }
        
    public function GetLoginInfo()
    {
        $model = new ExtrasModel();
        
        $login_user = $_POST['login_user'];
        $password_user = $_POST['password_user'];
        
        $columnas="id_credenciales";
        $tablas="cred";
        $where="login_credenciales=\"".$login_user."\" 
        AND contrasena_credenciales = \"".$password_user."\"";
        $id="cred.id_credenciales";
        $resultSet=$model->getCondiciones($columnas, $tablas, $where, $id);

        if (empty($resultSet))
        {
            $where="login_credenciales=\"".$login_user."\"";
            $resultSet=$model->getCondiciones($columnas, $tablas, $where, $id);
            if(empty($resultSet)) echo 0;
            else echo 2;
        }
        else
        {
            
         session_start();
         $_SESSION['id_usuario']=$resultSet[0]['id_credenciales'];
         echo 1;
        }
               
    }

    public function SalirSesion()
    {
        session_start();
        session_unset();
        session_destroy();
    }

    
}
?>