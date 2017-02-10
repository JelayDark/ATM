function Secret() {
	
	var elements = $('.textclass');
	console.log('elements: ', elements);
	var text = '';
	var arr;
	for (var i=0; i<elements.length;i++) {
		console.log('element[',i,']: ', elements[i]);
		text = elements[i].textContent;
		console.log('text: ', text);
		arr = text.split('');
		console.log('arr: ', arr);
		elements[i].textContent = '';
		console.log('new text:', elements[i].textContent);
		arr.forEach(function(t) {
			var span = document.createElement('span');
			elements[i].append(span);
			span.textContent = t;
			span.style.position = "relative";
			span.style.display = "inline-block";
			span.style.minWidth = "10px";
			///////COLOR
			var colors = [
				'#f44336','#e91e63','#9c27b0',
				'#673ab7','#3f51b5','#2196f3',
				'#03a9f4','#00bcd4','#009688',
				'#4caf50','#8bc34a','#cddc39',
				'#ffeb3b','#ffc107','#ff9800',
				'#ff5722','#795548','#9e9e9e',
				'#607d8b'
			];

			function randomColor(colors){
				var randNum = Math.floor(Math.random() * colors.length);
				return colors[randNum];
			}
		/////////////COLOR
			span.style.color = randomColor(colors);
		})
		
	}
	
	function SpanGo() {
		$('span').each(function(){
			$(this).jqFloat({
				width: $(document).width(),
				height: $(document).height(),
				speed: 10000,
			})
		})
//		
//		$('span').jqFloat({
//			width: $(document).width(),
//			height: $(document).height(),
//			speed: 10000,
//		});
	}
	
	setTimeout(SpanGo, 2000);
	
//	$('input').remove();
};