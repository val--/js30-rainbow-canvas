let canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-150;
canvas.height = window.innerHeight-250;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 80;
/*ctx.globalCompositeOperation = 'overlay';*/

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let title = document.getElementById("rainbows");
let btnWipe = document.getElementById("wipe");
let btnImage = document.getElementById("addimage");

function wipeCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function displayAnImage(){
  canvas.style.backgroundImage('');
}

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  
  title.style.color = ctx.strokeStyle;
  btnWipe.style.backgroundColor = `hsl(${hue+40}, 100%, 50%)`;
  btnImage.style.backgroundColor = `hsl(${hue-40}, 100%, 50%)`;
  document.body.style.background = `hsl(${hue}, 100%, 95%)`;
  
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 80 || ctx.lineWidth <= 60) {
    direction = !direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
btnWipe.addEventListener('click', wipeCanvas );
btnImage.addEventListener('click', displayAnImage );