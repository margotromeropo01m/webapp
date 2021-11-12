function LoginUsuario()
{
  var login =$('#login_usuario').val();
  var password =$('#password_usuario').val();

  if (login == "" || password =="")
  {
    alertMessages("warning", "Введите логин и пароль", "Внимание!")
  }
  else
  {
    $.ajax({
      url: 'index.php?controller=UserLogin&action=GetLoginInfo',
      type: 'POST',
      data: {
        
        login_user:login,
        password_user:password
      },
  })
  .done(function(x) {
    x=x.trim()
     if (x=="0")
      {
        alertMessages("warning", "Данный пользователь не существует!", "Внимание!")
      }
    else if (x.includes("<b>Warning</b>"))
      {
        alertMessages("error", "Произошла ошибка: "+x, "Ошибка!")
      }
      else if (x=="2")
      {
        alertMessages("warning", "Неправильный логин или пароль!", "Внимание!")
      }
      else if (x=="1")
      {
       RedirectToFeed()
      }
      else
      {
        alertMessages("warning", x, "Внимание!")
      }
    
    
  })
  .fail(function() {
      console.log("error");
  });
  }

}

function RedirectToFeed()
{
      window.location.href = "index.php?controller=MainPage&action=DueToday"
}

function alertMessages(tipo, mensaje, titulo)
{
	Swal.fire({
		  icon: tipo,
		  title: titulo,
		  text: mensaje
		})
}