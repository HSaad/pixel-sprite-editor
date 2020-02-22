const container = document.querySelector('#container');
const key = document.querySelector('#keys');

createGrid(8); //initial grid

draw();

const clearButton = document.querySelector('#clear');
const randomButton = document.querySelector('#random');
const rainbowButton = document.querySelector('#rainbow');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const fillButton = document.querySelector('#fill');
const generateButton = document.querySelector('#newGrid');
var color = "black";

generateButton.addEventListener('click', (e)=>{
	deleteGrid();
	let num = +document.querySelector('input').value;
	if(isNaN(num) || num > 64){
		alert("Please Enter a Number Less Than 64");
		document.querySelector('input').value = "8";
		createGrid(8);
		draw("black");
	}else{
		createGrid(num);
		draw("black");
	}
});

clearButton.addEventListener('click', (e) => {
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		square.style.backgroundColor = ' #f8f9f9';
	})
	draw("black"); 
});

fillButton.addEventListener('click', (e) => {
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		square.style.backgroundColor = color;
	})
	draw("black"); 
});

eraserButton.addEventListener('click', (e) =>{
	draw("#f8f9f9");
});

randomButton.addEventListener('click', (e)=>{
	let randomColor = getRandomColor();
	draw(randomColor);
	color = JSON.parse(JSON.stringify(randomColor));
});

rainbowButton.addEventListener('click', (e) =>{
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		square.addEventListener('click', (e)=>{
			square.style.backgroundColor = getRandomColor();
		})
	})
});

pencilButton.addEventListener('click', (e)=>{
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) =>{
		let opacity = 0;
		square.addEventListener('click', (e)=>{
			if(opacity != 0){
				square.style.backgroundColor = `rgba(30, 30, 30, ${opacity/10})`;
				opacity ++;
			}
			else{ //first time mouse passes over
				square.style.backgroundColor = 'rgba(30, 30, 30, 0.05)';
				opacity++;
			}
		})
	})
});

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function draw(colorName){
	let gridSquares = document.querySelectorAll('.content');
	gridSquares.forEach((square) => {

		square.addEventListener('click', (e) =>{
			if(colorName == undefined){
				square.style.backgroundColor = 'black';
			}else{
				square.style.backgroundColor = colorName;
			}
		})
	});
	displayKeyFrames();
}

function createGrid(num){
	if (num == undefined) return;
	for(let i = 0; i < num; i++){
		createRow(num);
	}
}

function createRow(num){
	let width = 450 / num;
	for(let i = 0; i < num; i++){
		const content = document.createElement('div');
		content.classList.add('content');
		content.style.cssText = `width: ${width}px; height: ${width}px`;
		container.appendChild(content);
	}
}

function deleteGrid(){
	while (container.firstChild) {
    	container.removeChild(container.firstChild);
	}
}

function displayKeyFrames(){
	var element = $("#container"); // global variable

	var getCanvas; // global variable
	  $("#container").on('click', function () {
         html2canvas(element, {
         onrendered: function (canvas) {
                $("#keys").html(canvas);
                getCanvas = canvas;
             }
         });
    });
}


