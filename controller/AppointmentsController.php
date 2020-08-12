<?php 
class AppointmentsController extends ControladorBase{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index(){
        
        $pageName="Appointments";
        $this->view("Appointments",array("pageName"=>$pageName));
        
    }

    public function GetPatients(){
        
        
        
        $patients = new PatientsModel();
       
        $where_to="";
        $columnas = "imya_pacientes,
                     familia_pacientes,
                     ochestvo_pacientes,
                     telefon_pacientes,
                     fecha_n_pacientes,
                     id_pacientes";
        
        $tablas = "pacientes";
        
        
        $where    = "1=1";
        
        $id       = "id_pacientes";
        
        
        $search =  (isset($_POST['search'])&& $_POST['search'] !=NULL)?$_POST['search']:'';
       
            
            
            if(!empty($search)){
                
                
                $where1=" AND (imya_pacientes LIKE '".$search."%' OR familia_pacientes LIKE '".$search."%' OR ochestvo_pacientes LIKE '".$search."%' OR telefon_pacientes LIKE '".$search."%' )";
                
                $where_to=$where.$where1;
            }else{
                
                $where_to=$where;
                
            }
            
            $html="";
            $resultSet=$patients->getCantidad("*", $tablas, $where_to);
            $cantidadResult=(int)$resultSet[0]['total'];
            
            
            $page = (isset($_POST['page']) && !empty($_POST['page']))?$_POST['page']:1;
            
            $per_page = 10; //la cantidad de registros que desea mostrar
            $adjacents  = 9; //brecha entre páginas después de varios adyacentes
            $offset = ($page - 1) * $per_page;
            
            $limit = " LIMIT   ".$per_page." OFFSET ".$offset;
            
            $resultSet=$patients->getCondicionesPag($columnas, $tablas, $where_to, $id, $limit);
            $count_query   = $cantidadResult;
            $total_pages = ceil($cantidadResult/$per_page);
            
            
            if($cantidadResult>0)
            {
                
                $html.='<div class="card float-right w-20">';
                $html.='<div class="card body">';
                //$html.='<div class="col-xs-6 col-md-3 col-lg-3 ">';
                $html.='<span class="form-control"><strong>Найдено: </strong>'.$cantidadResult.'</span>';
                $html.='</div>';
                $html.='</div>';
                $html.='<div class="col-lg-12 col-md-12 col-xs-12">';
                $html.='<section>';
                $html.= "<table id='patients_table_show' class='table table-striped'>";
                $html.= "<thead>";
                $html.= "<tr>";
                $html.='<th></th>';
                $html.='<th>ФИО</th>';
                $html.='<th>Телефон</th>';
                $html.='<th>Дата Рождения</th>';
                $html.='<th></th>';
                $html.='</tr>';
                $html.='</thead>';
                $html.='<tbody>';
                
                
                $i=0;
                
                foreach ($resultSet as $res)
                {
                    $i++;
                    $html.='<tr>';
                    $html.='<td>'.$i.'</td>';
                    $html.='<td>'.$res['familia_pacientes'].' '.$res['imya_pacientes'].' '.$res['ochestvo_pacientes'].'</td>';
                    $html.='<td>'.$res['telefon_pacientes'].'</td>';
                    $html.='<td>'.$res['fecha_n_pacientes'].'</td>';
                    $html.='<td><button type="button" class="btn btn-success" onclick="findPatient('.$res['id_pacientes'].')"><i class="fa fa-share"></i></button></td>';
                    $html.='</tr>';
                }
                
                $html.='<tr>';
                $html.='<td colspan="5">';
                $html.='<div class="table-pagination pull-right">';
                $html.=''. $this->paginate_patients("index.php", $page, $total_pages, $adjacents,"loadPatients").'';
                $html.='</div>';
                $html.='</td>';
                $html.='</tr>';
                $html.='</tbody>';
                $html.='</table>';
                $html.='</section>';
                $html.='</div>';
                
                
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
    
    public function paginate_patients($reload, $page, $tpages, $adjacents,$funcion='') {
        
        $prevlabel = "&lsaquo; Prev";
        $nextlabel = "Next &rsaquo;";
        $out = '<ul class="pagination">';
        
        // previous label
        
        if($page==1) {
            $out.= "<li class='page-item disabled'><span><a class='page-link'>$prevlabel</a></span></li>";
        } else if($page==2) {
            $out.= "<li class='page-item'><span><a class='page-link' href='javascript:void(0);' onclick='$funcion(1)'>$prevlabel</a></span></li>";
        }else {
            $out.= "<li class='page-item'><span><a class='page-link' href='javascript:void(0);' onclick='$funcion(".($page-1).")'>$prevlabel</a></span></li>";
            
        }
        
        // first label
        if($page>($adjacents+1)) {
            $out.= "<li class='page-item'><a class='page-link' href='javascript:void(0);' onclick='$funcion(1)'>1</a></li>";
        }
        // interval
        if($page>($adjacents+2)) {
            $out.= "<li class='page-item'><a class='page-link'>...</a></li>";
        }
        
        // pages
        
        $pmin = ($page>$adjacents) ? ($page-$adjacents) : 1;
        $pmax = ($page<($tpages-$adjacents)) ? ($page+$adjacents) : $tpages;
        for($i=$pmin; $i<=$pmax; $i++) {
            if($i==$page) {
                $out.= "<li class='page-item active'><a class='page-link'>$i</a></li>";
            }else if($i==1) {
                $out.= "<li class='page-item'><a class='page-link' href='javascript:void(0);' onclick='$funcion(1)'>$i</a></li>";
            }else {
                $out.= "<li class='page-item'><a class='page-link' href='javascript:void(0);' onclick='$funcion(".$i.")'>$i</a></li>";
            }
        }
        
        // interval
        
        if($page<($tpages-$adjacents-1)) {
            $out.= "<li class='page-item'><a class='page-link'>...</a></li>";
        }
        
        // last
        
        if($page<($tpages-$adjacents)) {
            $out.= "<li class='page-item'><a class='page-link' href='javascript:void(0);' onclick='$funcion($tpages)'>$tpages</a></li>";
        }
        
        // next
        
        if($page<$tpages) {
            $out.= "<li class='page-item'><span><a class='page-link' href='javascript:void(0);' onclick='$funcion(".($page+1).")'>$nextlabel</a></span></li>";
        }else {
            $out.= "<li class='page-item disabled'><span><a class='page-link'>$nextlabel</a></span></li>";
        }
        
        $out.= "</ul>";
        return $out;
    }


    public function FindPatient()
    {
        $patients = new PatientsModel();
        
        $id_paciente = $_POST['patient_id'];
        
        $columnas="id_pacientes, imya_pacientes, familia_pacientes, ochestvo_pacientes, fecha_n_pacientes, telefon_pacientes";
        $tablas="pacientes";
        $where="id_pacientes=".$id_paciente;
        $id="id_pacientes";
        $resultSet=$patients->getCondiciones($columnas, $tablas, $where, $id);
        
        if (empty($resultSet))
        {echo 0;}
        else
        {
            echo json_encode($resultSet);
        }
               
    }
    
    public function getProcedures()
    {
        $extras = new ExtrasModel();
        
        $columnas="procedimientos.id_procedimientos, procedimientos.nombre_procedimientos";
        $tablas="procedimientos INNER JOIN estados
                 ON estados.id_estados = procedimientos.id_estado_procedimientos";
        $where="nombre_estados ='ACTIVO' AND tabla_estados='procedimientos'";
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getProcedureZones()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['id_procedure'];
        
        $columnas="especificaciones_procedimientos.id_especificaciones_procedimientos, especificaciones_procedimientos.nombre_especificaciones_procedimientos";
        $tablas="procedimientos INNER JOIN especificaciones_procedimientos
                 ON procedimientos.id_procedimientos = especificaciones_procedimientos.id_procedimientos
                 INNER JOIN estados
                 ON estados.id_estados = especificaciones_procedimientos.id_estados";
        $where="especificaciones_procedimientos.id_procedimientos=".$id_procedimiento." AND nombre_estados ='ACTIVO' AND tabla_estados='especificaciones_procedimientos'";
        $id="especificaciones_procedimientos.id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getExtraCost()
    {
        $extras = new ExtrasModel();
        
        $id_especificacion_procedimiento = $_POST['id_especificacion_procedimiento'];
        
        $columnas="costo_especificaciones_procedimientos, duracion_especificaciones_procedimientos";
        $tablas="especificaciones_procedimientos";
        $where="id_especificaciones_procedimientos =".$id_especificacion_procedimiento;
        $id="id_especificaciones_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
    
    public function getAvailableHour() 
    {
        $free="#82E0AA";
        $warning  = "#F7DC6F";
        $busy = "#F1948A";
        $html = '<select id="appointment_time"  class="form-control" >
         			<option value="" selected="selected">--Выберите время--</option>';
        $starting_time = "8:00";
        $html.='<option value="'.$starting_time.'" selected="selected" style="background:'.$free.'">'.$starting_time.'</option>';
        
        while($starting_time != "19:30")
        {
            $endTime = strtotime("+30 minutes", strtotime($starting_time));
            $timeend=date('H:i', $endTime);
            $html.='<option value="'.$timeend.'" selected="selected" style="background:'.$free.'">'.$timeend.'</option>';
            $starting_time = $timeend;
        }
        
        $html.='</select>';
        echo $html;
        
    }
    
    public function getProcedureType()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['procedure_id'];
        
        $columnas="tipo_procedimientos.nombre_tipo_procedimientos";
        $tablas="tipo_procedimientos INNER JOIN procedimientos
                 ON tipo_procedimientos.id_tipo_procedimientos = procedimientos.id_tipo_procedimientos";
        $where="procedimientos.id_procedimientos = ".$id_procedimiento;
        $id="tipo_procedimientos.id_tipo_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo $resultSet[0]['nombre_tipo_procedimientos'];
    }
    
    public function getProcedureBDCost()
    {
        $extras = new ExtrasModel();
        
        $id_procedimiento = $_POST['procedure_id'];
        
        $columnas="precio_procedimientos, duracion_procedimientos";
        $tablas="procedimientos";
        $where="id_procedimientos = ".$id_procedimiento;
        $id="id_procedimientos";
        $resultSet=$extras->getCondiciones($columnas, $tablas, $where, $id);
        
        echo json_encode($resultSet);
    }
}
?>