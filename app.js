const colors = document.querySelectorAll('.jsColor');
const canvas = document.querySelector('#jsCanvas');
const range = document.querySelector('#jsRange');
const ctx = canvas.getContext('2d');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const SIZE_CONVAS = 700;

canvas.height = SIZE_CONVAS;
canvas.width = SIZE_CONVAS;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, SIZE_CONVAS, SIZE_CONVAS);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  x = event.offsetX;
  y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const rangeValue = event.target.value;
  ctx.lineWidth = rangeValue;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Заливка';
  } else {
    filling = true;
    mode.innerText = 'Рисование';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, SIZE_CONVAS, SIZE_CONVAS);
  }
}

function handleCM(event) {
  event.preventDefault();
  console.log(event);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJs [Export]';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) => color.addEventListener('click', handleColorClick));

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
