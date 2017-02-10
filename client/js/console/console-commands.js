//Все функции Консоли

var name = 'con_USER';//Nickname
var numbstr = 0;//Nubmer of string for up/down keys

//Автофокус на поле ввода
function AutoFocus() {
	$('input[type=text]').focus();
	$('body').on('click', AutoFocus);
}


//Функция анимированного появления текста на экране
function Animal(string, callback) {
	var a = ''; //Переменная куда будет заноситься посимвольно строка
	var i= 0;//Счетчик букв слова
	var p = document.createElement('p');
	$('body').scrollTop($('body').append(p).height());
	return new Promise(function(resolve) {
		Anima();
		
		function Anima() { //Function of Animation   
		  a += string[i];
		  i++;
//		  $('p').last().text(a);
		  p.textContent = a;
		  var timer = setTimeout(Anima, 15);
		  if (i == string.length) {
			clearTimeout(timer);
			resolve(p);
		  }
		}
	});
}

//Функция для вывода задержки, пишущая текст в строке, после чего удаляющая его
function AnimalPause(string) {
   return Animal(string).then(p => p.remove());
}

//Сама функция вывода задержки
function Pause(pause) {
  return pause.reduce((chain, txt) => chain.then(() => AnimalPause(txt)), Promise.resolve());
}

//Функция анимированного вывода массива на экран
function AnimalAll(arr) {
  return arr.reduce((chain, txt) => chain.then(() => Animal(txt)), Promise.resolve());
}
	
//Функция, добавляющая новую линию, содержащую имя и поле для ввода
function AddNewLine() {
	$('body').append('<p class="console-line"><span class="console-user">['+name+']</span><input type="text"></p>');
	numbstr = $('.console-line').length - 1; //Присвоить индексу значение количества -1 (номер последней введенной строки)
	AutoFocus();//Сразу помещаем на нее курсор
}

//Функция охраняет то, что ты ввел в строку на экране
function SaveCommand() {
	var val = $('input[type=text]').val();
	var $lastConsoleLine = $('.console-line').last();
	$lastConsoleLine.append('<span class="console-time">'+ConsTime()+'</span><span class="console-text">'+val+'</span>');
	$('input[type=text]').siblings('.console-user').addClass('console-user-saved');

	$('input[type=text]').remove();//Удаляем текущее поле для ввода
}

//Функция неанимированного вывода строки на экран
function NotAnimal(str) {
	var p = document.createElement('p');
	$('body').scrollTop($('body').append(p).height());
	return new Promise(function (resolve) {
		$('p').last().text(str);
		resolve();
	})
}

//Сама функция вывода команд на экран (Неанимированный вывод массива)
function Commands(str) {
	return str.reduce((chain, txt) => chain.then(() => NotAnimal(txt)), Promise.resolve());
}

//Функция вывода списка команд по запросу -help
function SeeComands() {
	SaveCommand();//Сохраняем на экране то, что введено
	var chain = Animal('Commands:')
	.then(() => Commands(commands))
	.then(() => AddNewLine())
}
	
//Функция вывода авторов по запросу -copyright
function SeeAuthors() {
	SaveCommand();//Сохраняем то, что введено
	function Author (str){
		return new Promise(function (resolve) {
			var p = document.createElement('p');
			$('body').append(p);
			$('p').last().addClass('bigAuthor').text(str).show(2000);
			resolve();
			}) 
	}
	Animal('_-_-_-_-_-_-_-_-_-_-_-_AUTHORS:_-_-_-_-_-_-_-_-_-_-_-_')
		.then(() => Catty()) //Вызов котейки!!!! УИИИ!
		.then(() => Author('Eugeniy Bernik - BACKEND!'))
		.then(() => Author('Bogdan Nosovitskiy - FRONTEND!'))
		.then(() => Author('Eugeniy Tulyakov - CONSOLE!'))
		.then(() => AddNewLine());		
}

//Функция Вызова Котейки
function Catty() {
	var div = document.createElement('div');
	$('body').append(div);
	$('div').last().addClass('cattydiv');
	$('div').last().append('<img class="cat" src="../images/cat.gif">');
	function run() {//Лети, мой котейка
		$('.cattydiv').last().animate({
			left: 120
		}, 3000);
	}
	return run();
}

//Функция получения времени введения команды
function ConsTime() {
	var now = new Date();
	var hrs = now.getHours();
	if (hrs<10) hrs='0'+hrs;
	var min = now.getMinutes();
	if (min<10) min='0'+min;
	now = hrs+':'+min;
	return now;
}

//Функция копирования текста на одну строку вверх
function CommUp(e) {
	e.preventDefault();
	if(numbstr>0){
		numbstr--;
		$('input[type=text]').val($('.console-text:eq('+numbstr+')').text());
	}
}

//Функция копирования текста на одну строку вниз
function CommDown(e) {
	e.preventDefault();
	if(numbstr<($('.console-text').length)){
		numbstr++;
		$('input[type=text]').val($('.console-text:eq('+numbstr+')').text());
	}
}
	
//Функция очистки экрана 
function ClearScreen() {
	$('p').hide(1000).queue(function(){$(this).remove()});
	$('.cattydiv').remove();
	Animal('--- SCREEN WAS CLEANED ---')
	.then(() => AddNewLine());
}

//Функция выхода
function Ext() {
	location.href='http://mayst.paypress.pro/';
}


//БАНКОМАТСКИЕ ФУНКЦИИ:


//Функция проверки наличия купюр в банкомате и их количества -bills
function CheckBillsAv(){
//	SaveCommand();
	$.ajax({ 
		url: "/back/requests/check_banknotes_admin.php",
		//dataType: "json", 
		method: "post",
		success: function(result) {
			var r = JSON.parse(result);
			//var result1 = JSON.parse(result.1_hundred);
			var chain = Animal('Amount of bills in ATM:')
				.then(() => Animal('100val: ['+r.one_hundred+']bills'))
				.then(() => Animal('200val: ['+r.two_hundred+']bills'))
				.then(() => Animal('500val: ['+r.five_hundred+']bills'))
				.then(() => Animal('1000val: ['+r.one_thousand+']bills'))
				.then(() => Animal('5000val: ['+r.five_thousand+']bills'))
				.then(() => AddNewLine());
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		} 
	})
}

//Функция проверки суммы в банкомате -money
function CheckMoneyAvailable() {// После приема перемножить и сложить
//	SaveCommand();
	$.ajax({ 
		url: "/back/requests/check_banknotes_admin.php",
//		dataType: "json", 
		method: "post",
		success: function(result) {
			var r = JSON.parse(result);
			var money = (r.one_hundred * 100) + (r.two_hundred * 200) + (r.five_hundred * 500) + (r.one_thousand * 1000) + (r.five_thousand * 5000);
			var chain = Animal('Amount of money in ATM: ' + ' '+money+' rubles')
				.then(() => AddNewLine());
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	})
}
		   

//Функция проверки наличия свободного места для вноса купюр
function valFree(str) {
	var max = 1000; //Максимум купюр одного типа в банкомате
	$.ajax({ 
		url: "/back/requests/check_banknotes_admin.php",
//		dataType: "json", 
		method: "post",
		async: false,
		success: function(result) {
			var r = JSON.parse(result);
			addable100 = max - r.one_hundred;
			addable200 = max - r.two_hundred;
			addable500 = max - r.five_hundred;
			addable1000 = max - r.one_thousand;
			addable5000 = max - r.five_thousand;	
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	});
	
	switch(str) {
		case 100:
			return addable100;
			break;
		case 200:
			return addable200;
			break;
		case 500:
			return addable500;
			break;
		case 1000:
			return addable1000
			break;
		case 5000:
			return addable5000;
			break;
//		default:
//			Animal('Enter a valid value').then(() => AddNewLine());
//			break;
	}
}

// Функции ХРАНИЛИЩА:

//Функция Показать карты в хранилище -storage
function Storage() {
//	SaveCommand();
	$.ajax({ 
		url: "/back/requests/black_list.php",
//		dataType: "json", 
		method: "post",
		success: function(result) {
			var r = JSON.parse(result);
			var a;//
			if(r.length) {a=r.length} else {a=0}
			Pause(pause)
			.then(() => Animal(a+' cards are locked at now. To see list of all locked cards type -instorage'))
			.then(() => AddNewLine());	
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	});
	
}

//Функция вывода залоченных карт -instorage
function InStorage(){
	SaveCommand();
	$.ajax({ 
		url: "/back/requests/black_list.php",
		method: "post",
		success: function(result) {
			var r = JSON.parse(result);
			Animal('Locked cards:')
			.then(() => Commands(r))
			.then(() => AddNewLine());
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	});
}

//Функция забрать все карты из хранилища -cstorage
function ClearStorage () {
	SaveCommand();
	$.ajax({ 
		url: "/back/requests/poor_storage.php",
//		dataType: "json", 
		method: "post",
		success: function(result) {
			Pause(pause)
			.then(() => Animal('All cards was successfully unlocked!'))
			.then(() => AddNewLine());	
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	});
}

//ФУНКЦИИ ПРОВЕРКИ:
//Функция проверки связи -cc
function CheckConnection() {
//	SaveCommand();
	$.ajax({ 
		url: "/back/requests/connection.php",
//		dataType: "json", 
		method: "post",
		success: function(result) {
			if (result) {
				Pause(pause)
				.then(() => Animal('.....'))
				.then(() => Pause(pause))
				.then(() => Animal('..'))
				.then(() => Animal('Detected a problem with the database!'))
				.then(() => AddNewLine())
			} else {
				Pause(pause)
				.then(() => Animal('.....'))
				.then(() => Pause(pause))
				.then(() => Animal('Сommunication problems not detected'))
				.then(() => AddNewLine())
			}
		},
		error: function(jqXHR, textStatus, errorThrown){ 
			// Функция при ошибочном запросе 
			console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
		}
	});
}

//Функция самодиагностики
function SelfDiag() {
	SaveCommand();
	Animal('_-_-_-_-_-_-_-_-_-_-_-_-_------SELF-TEST WAS STARTED... ')
	.then(() => Pause(pause))
	.then(() => Animal('..........'))
	.then(() => Animal('......'))
	.then(() => Animal('........'))
	.then(() => Catty())
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => NotAnimal('[Catty is OK]...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => CattyCU(580))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('......'))
	.then(() => Pause(pause))
	.then(() => $('.cattydiv').last().css({
			transform: 'scaleX(-1)',
			filter: 'FlipH'
		}))
	.then(() => NotAnimal('CHecking notes in ATM...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('......'))
	.then(() => Pause(pause))
	.then(() => Animal('........'))
	.then(() => CheckBillsAv())
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => $('.console-line').last().remove())
	.then(() => Pause(pause))
	.then(() => Animal('......'))
	.then(() => Pause(pause))
	.then(() => Animal('........'))
	.then(() => Pause(pause))
	.then(() => CheckMoneyAvailable())
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => $('.console-line').last().remove())
	.then(() => Animal('....'))
	.then(() => Animal('........'))
	.then(() => NotAnimal('[Screen is OK]...'))
	.then(() => Pause(pause))
	.then(() => NotAnimal('[CardReader is OK]...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('......'))
	.then(() => NotAnimal('[Keyboard is OK]...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => NotAnimal('[MoneyHole is OK]...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('.......'))	
	.then(() => Animal('....'))	
	.then(() => NotAnimal('[Checking Storage]...'))	
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Storage())
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('...'))
	.then(() => Pause(pause))
	.then(() => $('.console-line').last().remove())
	.then(() => Pause(pause))
	.then(() => NotAnimal('[Checking connection with DB]...'))
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => Animal('............'))
	.then(() => Pause(pause))
	.then(() => CheckConnection())
	.then(() => CattyCU(1400))	
	.then(() => Pause(pause))
	.then(() => Pause(pause))
	.then(() => $('.cattydiv').last().css({
			transform: 'scaleX(1)',
			filter: 'FlipH'
		}))
	.then(() => Pause(pause))
	.then(() => Animal('_-_-_-_-_-_-_-_-_-_-_-_-_------TEST WAS SUCCESSFULLY FINISHED... '))
	.then(() => $('.console-line').last().remove())
	.then(() => $('.cattydiv').last().remove())
	.then(() => AddNewLine());
	
	function CattyCU(left) {
		$('.cattydiv').last().css({
			position: 'fixed',
		}).animate({
			left: left,
		}, 3000);
	}
}