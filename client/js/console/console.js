$(() =>{//Описание работы консоли
	
	var access = false;//Переменная права доступа
	$.ajax({
		url: "/back/console/console.php",
		dataType: "json",
		method: "post",
		success: function(result) {
			console.log(result); //переменная ответа
			access = result;

			if(access == true) {
				HelloConsole();
			} else {
				location.href='../views/noaccess.php';
				//return;
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			// Функция при ошибочном запросе
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown);
		}
	});
	
function HelloConsole() {
  var chain = Pause(pause)
  	.then(() => Animal('...'))
    .then(() => Animal('---CONSOLE v 1.0.0 is working!---'))
  	.then(() => Animal(name+', you successfully logged in admin panel of ATM'))
    .then(() => Pause(pause))
    .then(() => Animal('To see all commands u can use type -help'))
  	.then(() => Pause(pause))
  	.then(() => AddNewLine())
}

	//Функция попытки определения введенного значения:
	$('body').on('keydown', 'input[type=text]', e => {
	     if(e.keyCode==13){ //При нажатии Enter
			 var val = $('input[type=text]').val();
			 switch(val) {
				case '-help': 
					SeeComands();	 
					break;
				case '-copyright':
					SeeAuthors();
					break;
				case '-clear':
					ClearScreen();
					break;
				case '-exit':
					Ext();
					break;
				case 'Hello':
				 	SaveCommand();
					Animal('I glad 2 c u 2!#@$#$#')
					.then(() => AddNewLine());
					break;
// Команды свзанные с работой банкомата:
				case '-bills':
					SaveCommand();
					CheckBillsAv();
					break;
				case '-d':
					SaveCommand();
					Secret();
					break
				case '-money':
					SaveCommand();
					CheckMoneyAvailable();
					break;
				case '-storage':
					SaveCommand();
					Storage();
					break;
				case '-instorage':
					InStorage();
					break;
				case '-cstorage':
					ClearStorage();
					break;
				case 'text':
					SaveCommand();
					$('span').addClass('textclass');
					AddNewLine();
					break
				case '-cc':
					SaveCommand();
					CheckConnection();
					break;
				case '-system':
					SelfDiag();
					break;
				default: 
				 	defaultCase(val);
					break;
			 }
			 
		 } else {// keycode 13
			 //при вызове аддньюлайн обнулять индекс строки up38 down 40
			 if(e.keyCode==38){//нажатие вверх
				CommUp(e);
			} else {
				if(e.keyCode==40) {//нажатие вниз
					CommDown(e);
			}
		 }
		 }
	});
	
	
	
	
	
	
});