//Функция добавления денег в банкомат -addmoney
function addMoney(str){
	var result100 = str.match(/([0-9]+)(?=x100$|x100\s)/g);//Регулярка для поиска количества купюр номинала 100
	var result200 = str.match(/([0-9]+)(?=x200)/g);//Регулярка для поиска количества купюр номинала 200
	var result500 = str.match(/([0-9]+)(?=x500$|x500\s)/g);//Регулярка для поиска количества купюр номинала 500
	var result1000 = str.match(/([0-9]+)(?=x1000)/g);//Регулярка для поиска количества купюр номинала 1000
	var result5000 = str.match(/([0-9]+)(?=x5000)/g);//Регулярка для поиска количества купюр номинала 5000
	
	if((result100 == null) && (result200 == null) && (result500 == null) && (result1000 == null) && (result5000 == null)){
		Animal('Enter the amount u need to add. Check the errors')
		.then(() => AddNewLine());
	} else {
		if ((valFree(100)<result100) || (valFree(200)<result200) || (valFree(500)<result500) || (valFree(1000)<result1000) || (valFree(5000)<result5000)) {
			Animal('U r tryig to add too many banknotes. Check free place in ATM')
			.then(() => AddNewLine());
		} else {
			/////////
			$.ajax({ 
				url: "/back/requests/add_money.php",
				data:{
					one_hundred: result100,
					two_hundred: result200,
					five_hundred: result500,
					one_thousand: result1000,
					five_thousand: result5000,
				},
				method: "post",
				success: function(result) {
					console.log(result);
				},
				error: function(jqXHR, textStatus, errorThrown){ 
					// Функция при ошибочном запросе 
					console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
				} 
			});
			/////////
			Pause(pause)
			.then(() => Animal('success: '+str))
			.then(() => Animal('100:+['+result100+']bills 200:+['+result200+']bills 500:+['+result500+']bills 1000:+['+result1000+']bills 5000:+['+result5000+']bills'))
			.then(() => AddNewLine());
		};
	}}

//Функция изменения имени
function ChangeName(str) {
	if(str.indexOf('@')<(str.length-1)){
		name = str.match(/@(\w+)/)[1];//Регулярка поиска имени
		AddNewLine();
	} else {
		Animal('Enter Valid Name.')
		.then(() => AddNewLine());	
	};
}

//Функция проверки наличия и свободного места для купюры определенного веса
function FreeBill (str) {
	var res = str.match(/[125]{1}0{2,3}/);
	console.log(+res);
	Animal('Available for adding ['+res+']: ' + valFree(+res))
	.then(() => AddNewLine())
}

//Функция вывода информации о карте
function AboutCard(str) {
	var num = str.match(/[0-9]{16}/);
	$.ajax({ 
			url: "/back/requests/info_about.php",
			data:{
				number: num,
			},
			method: "post",
			success: function(result) {
				var r = JSON.parse(result);
				var st = 'UNNABLE FOR USING';
				if(r.status) {
					st='able for using';
				}
				if (result){
					Pause(pause)
					.then(() => Animal('Status: ['+st+']'))
					.then(() => NotAnimal('CardNumber: '+num))
					.then(() => NotAnimal('holder: '+r.name+' '+r.surname))
					.then(() => NotAnimal('address: '+r.adress))
					.then(() => AddNewLine())
				} else {
					Pause(pause)
					.then(() => Animal('This card is not supported'))
					.then(() => AddNewLine())
				}
			},
			error: function(jqXHR, textStatus, errorThrown){ 
				// Функция при ошибочном запросе 
				console.log('Ajax request failed', jqXHR, textStatus, errorThrown); 
			} 
	});
}

//Функция Стандартного Default case в switch
function defaultCase(str) {
	SaveCommand()
	if(str.match(/-addmoney/)) {
		addMoney(str);
	} else {
		if(str.match(/-name @/)){
			ChangeName(str);
		} else {
			if (str.match(/-freebill \[[125]{1}0{2,3}\]/)) {
				FreeBill(str);
			} else {	
				if (str.match(/-about \[[0-9]{16}\]/)) {
					AboutCard(str);
				} else {
					Animal('I see nothing here, try smthing else')
					.then(() => AddNewLine());
				}
			}
		}
	}
};