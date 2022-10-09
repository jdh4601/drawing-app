const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOption = Array.from(document.getElementsByClassName('color-option'));
const clearBtn = document.getElementById('clear');

context.lineWidth = lineWidth.value;
canvas.width = 500;
canvas.height = 500;

context.strokeStyle = 'black';
context.font = 'italic 80px Calicri';
context.lineWidth = 3;
context.strokeText("Let's draw!", 30, 80);
context.stroke();

// painting text
function paintText(event) {
  const colorValue = event.target.dataset['color'];
  context.strokeStyle = colorValue;
  context.font = 'italic 80px Calicri';
  context.lineWidth = 3;
  context.strokeText("Let's draw!", 30, 80);
  context.beginPath();
  context.stroke();
}

// drawing
context.strokeStyle = 'black';
context.lineWidth = lineWidth.value;
context.moveTo(0, 0);
context.stroke();

let isPainting = false;

function onMove(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  context.moveTo(event.offsetX, event.offsetY);
}

function startPaint() {
  isPainting = true;
}

function finishPaint() {
  isPainting = false;
  context.beginPath();
}

function onChangeLineWidth(event) {
  console.log(event.target.value);
  context.lineWidth = event.target.value;
  context.stroke();
}

function onChangeColor(event) {
  console.log(event.target.value);
  context.fillStyle = event.target.value;
  context.strokeStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset['color'];
  context.strokeStyle = colorValue;
  context.fillStyle = colorValue;
  color.value = colorValue;

  console.log(colorValue);
}
function clearPainting() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mouseup', finishPaint);
canvas.addEventListener('mousemove', onMove);

lineWidth.addEventListener('change', onChangeLineWidth);
color.addEventListener('change', onChangeColor);
colorOption.forEach(color => color.addEventListener('click', onColorClick));
colorOption.forEach(color => color.addEventListener('click', paintText));

clearBtn.addEventListener('click', clearPainting);
