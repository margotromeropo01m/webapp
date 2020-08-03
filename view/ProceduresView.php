<!doctype html>
<html lang="en">
  <?php include("view/universal/head.php")?>
  <body>
  	<!--Navigation  -->
  	
    <?php include("view/universal/navbar.php")?>
    
    <!-- Page tittle -->
	<div class="container-fluid sticky-top sticky-offset bg-light">
    	<ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <a class="nav-link <?php if($tabName=="Procedures") echo "active"; else echo "text-muted"?>" href="index.php?controller=Procedures&action=index"><h3>Процедуры</h3></a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?php if($tabName=="Extras") echo "active"; else echo "text-muted"?>" href="index.php?controller=Extras&action=index"><h3>Дополнения</h3></a>
          </li>
        </ul>
	</div>
	<!-- Tabla de citas -->
	
     <div class="wrapper">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h3 class="mb-0">
          	Регистрация
            <button class="btn float-right" data-toggle="collapse" data-target="#collapseRegistration" aria-expanded="false" aria-controls="collapseRegistration">
              <i class="fa fa-caret-square-o-up fa-lg"></i>
            </button>
          </h3>
        </div>
    
        <div id="collapseRegistration" class="collapse show" aria-labelledby="headingRegistration">
        	<div id="alert-procedures" class="alert alert-danger alert-dismissible fade show" style="display: none" role="alert">
              <div id="alert-message-procedures"></div>
              <button type="button" class="close" aria-label="Close" onclick="closeAlertProcedures()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="card-body multi-collapse">
            <div class="row">
            	<div class="col-xs-6 col-md-3 col-lg-3 ">
                	<div class="form-group">
                    	<label for="procedure_name" class="control-label">Название продцедура:</label>
                        <input type="text" class="form-control" id="procedure_name" value=""  placeholder="Название">
                     </div>
                 </div>                 
                 <div class="col-xs-6 col-md-3 col-lg-3 ">
                	<div class="form-group">
                    	<label for="procedure_cost" class="control-label">Стоитмость процедура:</label>
                        <input type="number" class="form-control" id="procedure_cost" value=""  placeholder="Стоитмость">
                     </div>
                 </div>
                 <div class="col-xs-6 col-md-3 col-lg-3 ">
                	<div class="form-group">
                    	<label for="procedure_type" class="control-label">Вид продцедура:</label>
                         <select id="procedure_type"  class="form-control" >
                             <option value="" selected="selected">--Выбрать--</option>		
    					  </select>
                     </div>
                 </div>
            </div>
            <div class="row">
            	<div class="col text-center">
            		<button type="button" class="btn btn-primary" onclick="saveProcedure()">Сохранить</button>
            		<button type="button" class="btn btn-danger" onclick="cancelProcedure()">Отменить</button>
            	</div>	
           	</div>
          </div>
        </div>
      </div>
     </div>
      <div class="wrapper">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h3 class="mb-0">
          	Общая Таблица Процедур
            <button class="btn float-right" data-toggle="collapse" data-target="#collapseTable" aria-expanded="false" aria-controls="collapseTable">
              <i class="fa fa-caret-square-o-up fa-lg"></i>
            </button>
          </h3>
        </div>
    
        <div id="collapseTable" class="collapse show" aria-labelledby="headingRegistration">
          <div class="card-body multi-collapse">
            <div class="row">
            	<div class="col-xs-6 col-md-3 col-lg-3 ">
                	
                 </div>
                 <div class="col-xs-6 col-md-3 col-lg-3 ">
                	
                 </div>
                 <div class="col-xs-6 col-md-3 col-lg-3 ">
                	<div class="form-group">
                         <select id="procedure_type_search"  class="form-control" >
                             <option value="" selected="selected">--Выбрать вид продцедура:--</option>		
    					  </select> 
                     </div>
                 </div>
                 <div class="col-xs-6 col-md-3 col-lg-3 ">
                	<div class="form-group">
                        <input type="text" class="form-control" id="search_procedure" value=""  placeholder="Пойск">
                     </div>
                 </div>
            </div>
            <div class="row">
            	<div class="col-xs-12 col-md-12 col-lg-12 ">
                	<div id="procedures_table"></div>
                 </div>
            </div>
          </div>
        </div>
      </div>
     </div>
      

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="bootstrap/jquery-3.5.1.min.js"></script>
    <script src="bootstrap/popper.min.js" ></script>
    <script src="bootstrap/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script src="view/js/Procedures.js?0.4" ></script>
  </body>
</html>