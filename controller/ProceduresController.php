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
    
    public function getProcedureType()
    {
        $procedures = new ProceduresModel();
        
        $columnas="id_tipo_procedimientos, nombre_tipo_procedimientos";
        $tablas="tipo_procedimientos";
        $where="1=1";
        $id="id_tipo_procedimientos";
        $resultSet=$procedures->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function InsertProcedure()
    {
        $procedures = new ProceduresModel();
        
        $name = $_POST['procedure_name'];
        $cost  = $_POST['procedure_cost'];
        $type_id  = $_POST['procedure_type_id'];
        
        $columnas="id_procedimientos";
        $tablas="procedimientos";
        $where="nombre_procedimientos='".$name."' AND precio_procedimientos=".$cost." AND id_tipo_procedimientos=".$type_id;
        $id="id_procedimientos";
        $resultSet=$procedures->getCondiciones($columnas, $tablas, $where, $id);
        
        if (empty($resultSet))
        {
            
            $query = "INSERT INTO procedimientos (nombre_procedimientos, precio_procedimientos, id_tipo_procedimientos)
                     VALUES ('".$name."','".$cost."',".$type_id.")";
            
            $resultInsert=$procedures->executeNonQuery($query);
            
            echo $resultInsert;
        }
        else
        {
            echo "2";
        }
    }
    
    public function GetProceduresTable(){
                
        $procedures = new ProceduresModel();
        
        $where_to="";
        $columnas = "nombre_procedimientos,
                     precio_procedimientos,
                     id_procedimientos";
        
        $tablas = "procedimientos";
        
        
        $where    = "1=1";
        
        $id       = "id_procedimientos";
        
        
        $search =  (isset($_POST['search'])&& $_POST['search'] !=NULL)?$_POST['search']:'';
        
        
        
        if(!empty($search)){
            
            
            $where1=" AND (nombre_procedimientos LIKE '".$search."%')";
            
            $where_to=$where.$where1;
        }else{
            
            $where_to=$where;
            
        }
        
        $html="";
                      
        $resultSet=$procedures->getCondiciones($columnas, $tablas, $where_to, $id);
        $cantidadResult = count($resultSet);
        
        if($cantidadResult>0)
        {
            
            $html.='<div class="col-lg-12 col-md-12 col-xs-12">';
            $html.='<section>';
            $html.= "<table id='procedures_table_show' class='table table-bordered'>";
            $html.= "<thead>";
            $html.= "<tr>";
            $html.='<th></th>';
            $html.='<th>Процедура</th>';
            $html.='<th>Доп. информация</th>';
            $html.='<th>Цена (руб.)</th>';
            $html.='</tr>';
            $html.='</thead>';
            $html.='<tbody>';
            
            
            $i=0;
            
            foreach ($resultSet as $res)
            {
                $columnas="nombre_especificaciones_procedimientos, costo_especificaciones_procedimientos";
                $tablas="especificaciones_procedimientos";
                $where="id_procedimientos=".$res['id_procedimientos'];
                $id="id_especificaciones_procedimientos";
                $resultSetExtras=$procedures->getCondiciones($columnas, $tablas, $where, $id);
                $extras_count=count($resultSetExtras);
                $i++;
                
                if ($extras_count>0)
                {
                    $html.='<tr>';
                    $html.='<td rowspan="'.$extras_count.'">'.$i.'</td>';
                    $html.='<td rowspan="'.$extras_count.'">'.$res['nombre_procedimientos'].'</td>';
                    $html.='<td>'.$resultSetExtras[0]['nombre_especificaciones_procedimientos'].'</td>';
                    $html.='<td>'.$resultSetExtras[0]['costo_especificaciones_procedimientos'].'</td>';
                    $html.='</tr>';
                    foreach(array_slice($resultSetExtras,1) as $resExtra)
                    {
                        $html.='<tr>';
                        $html.='<td>'.$resExtra['nombre_especificaciones_procedimientos'].'</td>';
                        $html.='<td>'.$resExtra['costo_especificaciones_procedimientos'].'</td>';
                        $html.='</tr>';
                    }
                    
                }
                else
                {
                    $html.='<tr>';
                    $html.='<td>'.$i.'</td>';
                    $html.='<td>'.$res['nombre_procedimientos'].'</td>';
                    $html.='<td></td>';
                    $html.='<td>'.$res['precio_procedimientos'].'</td>';
                    $html.='</tr>';
                }
                
            }
            
            
            
            $html.='</tbody>';
            $html.='</table>';
            $html.='</section></div>';
            
            
            
            
        }else{
            $html.='<div class="col-lg-12 col-md-12 col-xs-12">';
            $html.='<div class="alert alert-warning alert-dismissable" style="margin-top:40px;">';
            $html.='<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            $html.='<h4>Внимание!</h4> <b>Нет результатов по вашему запросу</b>';
            $html.='</div>';
            $html.='</div>';
        }
        
        
        echo $html;
        die();
        
        
        
    }
    
    
}
?>