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
            <a class="nav-link active"><h3>Новая Запись</h3></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><h3>Записи</h3></a>
          </li>
        </ul>
	</div>
	<!-- Tabla de citas -->
	
	<div class="container-fluid" id="grad1">
    <div class="row justify-content-center mt-0">
        <div class="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
            <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2><strong>Новая Запись</strong></h2>
                <div class="row">
                    <div class="col-md-12 mx-0">
                        <form id="msform">
                            <!-- progressbar -->
                            <ul id="progressbar">
                                <li class="active" id="patient"><strong>Пациент</strong></li>
                                <li id="procedures"><strong>Процедуры</strong></li>
                                <li id="dates"><strong>Дата</strong></li>
                                <li id="confirm"><strong>Записать</strong></li>
                            </ul> <!-- fieldsets -->
                            <fieldset name="patient_field">
                                <div class="form-card">
                                    <h2 class="fs-title">Иформация Пациента</h2> 
                                    <div id="client_info_block">
                                        <button type="button" class="btn btn-info" onclick="newPatient()">Новый Пациент</button>
                                    	<button type="button" class="btn btn-info" onclick="searchPatient()">Выбрать Пациента</button>
                                    </div>
                                </div> 
                                <button type="button" class="next btn btn-primary" name="next">Далее</button>
                            </fieldset>
                            <fieldset name="procedure_field">
                                <div class="form-card">
                                    <h2 class="fs-title">Выбор Процедур</h2>
                                    <div class="input-group mb-3">
                                        <select id="procedure_id"  class="form-control" >
                                 			<option value="" selected="selected">--Выбрать процедуру--</option>		
        					  			</select>
        					  			<button type="button" class="btn btn-dark" onclick="addProcedure()"><i class="fa fa-plus"></i></button>
        					  		</div>
    					  			<br>
    					  			<table id='procedures_table' class='table table-bordered'>
                                        <thead>
                                            <tr>
                                           	<th></th>
                                            <th>Процедура</th>
                                            <th>Доп. информация</th>
                                            <th>Цена (руб.)</th>
                                            <th>Скидка (%)</th>
                                            <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                   </table>
                                </div> 
                                <button type="button" class="previous btn btn-secondary" name="next">Назад</button>
                                <button type="button" class="next btn btn-primary" name="next">Далее</button>
                            </fieldset>
                            <fieldset name="date_field">
                                <div class="form-card">
                                    <h2 class="fs-title">Payment Information</h2>                                    
                                </div>
                                <button type="button" class="previous btn btn-secondary" name="next">Назад</button>
                                <button type="button" class="next btn btn-primary" name="next">Далее</button>
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <h2 class="fs-title text-center">Success !</h2> <br><br>
                                    <div class="row justify-content-center">
                                        <div class="col-3"> <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image"> </div>
                                    </div> <br><br>
                                    <div class="row justify-content-center">
                                        <div class="col-7 text-center">
                                            <h5>You Have Successfully Signed Up</h5>
                                        </div>                                        
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary" onclick="saveAppointment()">Создать Запись</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="procedure_settings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Допольнительная информация процедуры</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="settings_modal">
        ...
      </div>
      <div class="modal-footer" id="settings_footer">
        
      </div>
    </div>
  </div>
</div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="bootstrap/jquery-3.5.1.min.js"></script>
    <script src="bootstrap/jquery.mask.min.js"></script>
    <script src="bootstrap/popper.min.js" ></script>
    <script src="bootstrap/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script type="text/javascript" src="bootstrap/swal.js"></script>
    <script src="view/js/Appointments.js?0.5"></script>
  </body>
</html>