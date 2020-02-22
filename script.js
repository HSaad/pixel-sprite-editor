var color = "black";
var keyFrameNum = 1;
var gridNum = 8;

const containers = document.querySelector('#containers');
var container = document.querySelector('#container');
const keys = document.querySelector('#keys');
var key = document.querySelector('#key');

createGrid(gridNum, container); //initial grid
draw();

const clearButton = document.querySelector('#clear');
const penButton = document.querySelector('#pen');
const rainbowButton = document.querySelector('#rainbow');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const fillButton = document.querySelector('#fill');
const generateButton = document.querySelector('#newGrid');
const colorButton = document.querySelector('#colorpicker');

const addKeyButton = document.querySelector('#addKey');

const playButton = document.querySelector('#play');

generateButton.addEventListener('click', (e)=>{
	deleteGrid();
	let num = +document.querySelector('#gridNum').value;
	if(isNaN(num) || num > 64){
		alert("Please Enter a Number Less Than 64");
		document.querySelector('input').value = "8";
		createGrid(gridNum, container);
		draw("black");
	}else{
		createGrid(num, container);
		gridNum = num;
		draw("black");
	}
});

colorButton.addEventListener('change', (e)=>{
	color = document.querySelector('#colorpicker').value;
	draw(color);
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

penButton.addEventListener('click', (e) =>{
	draw(color);
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

addKeyButton.addEventListener('click', (e) =>{
	keyFrameNum++; //TO DO: add limit 10 key frames

	//create container
	const con = document.createElement('div');
	con.id = `container${keyFrameNum}`;
	con.classList.add('container');
	containers.appendChild(con);	
	
	//create grid
	createGrid(gridNum, con);
	draw();

	//create keyframe
	const keyframe = document.createElement('div');
	keyframe.classList.add('key');
	keys.appendChild(keyframe);	

	displayKeyFrame(con, keyframe, keyFrameNum);
});

playButton.addEventListener('click', (e) => {
	var preview = document.getElementById("preview");
	var canvas = document.getElementById("key1");
  var preview = document.getElementById("preview");
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
	$(preview).html(image);

  var i = 1;
  var id = setInterval(frame, 100);
  function frame() {
    if (i == keyFrameNum) {
      clearInterval(id);
    } else {
      i++;

    	var canvas = document.getElementById(`key${i}`);
  		image.src = canvas.toDataURL("image/png");
			$(preview).html(image);
    }
  }

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
				square.style.backgroundColor = 'black'
			}else{
				square.style.backgroundColor = colorName;
			}
		})
	});
	displayKeyFrames();
}

function createGrid(num, contain){
	if (num == undefined) return;
	for(let i = 0; i < num; i++){
		createRow(num, contain);
	}
}

function createRow(num, contain){
	let width = 450 / num;
	for(let i = 0; i < num; i++){
		const content = document.createElement('div');
		content.classList.add('content');
		content.style.cssText = `width: ${width}px; height: ${width}px`;
		contain.appendChild(content);
	}
}

function deleteGrid(){
	while (container.firstChild) {
    	container.removeChild(container.firstChild);
	}
}

function displayKeyFrames(){
	var element = container;//$("#container"); // global variable
	var getCanvas; // global variable

	  $(container).on('click', function () {
         html2canvas(element, {
         onrendered: function (canvas) {
         				canvas.id = "key1";
                $("#key").html(canvas);
                getCanvas = canvas;
             }
         });
    });
}

function displayKeyFrame(con, key, num){
	var element = con;//$("#container"); // global variable
	var getCanvas; // global variable

	  $(con).on('click', function () {
         html2canvas(element, {
         onrendered: function (canvas) {
         				canvas.id = `key${num}`;
                $(key).html(canvas);
                getCanvas = canvas;
             }
         });
    });
}

