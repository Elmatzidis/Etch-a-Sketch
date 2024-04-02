let EtchASketch = document.querySelector(".Etch-a-Sketch");
let input = document.querySelector("#grid-size");
let colorChoice = document.querySelector("#color-choice"); // Corrected the ID
const Clear = document.querySelector("#clear");
const gridSize = document.querySelector("#createGridBtn");
const random = document.querySelector("#change-Random");

let currentColor = colorChoice.value;
let isRandomMode = false; 

// Creates the size of the Etch-a-Sketch
function createGrid(size) {
  EtchASketch.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  EtchASketch.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  EtchASketch.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    EtchASketch.appendChild(square);
  }

  hoverPixel();
}

// When hovering on squares you paint them
function hoverPixel() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseup", paintSquare);
  });
}

function paintSquare() {
  if (isRandomMode) { 
    const [red, green, blue] = randomColor();
    this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  } else {
    this.style.backgroundColor = currentColor;
  }
}

// Creates random colors
function randomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return [red, green, blue];
}

// Clears everything and resets it to default
function clearGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => (square.style.backgroundColor = "white"));
  createGrid(16);
}

Clear.addEventListener("click", () => {
  clearGrid();
});

gridSize.addEventListener("click", () => {
  const newSize = parseInt(input.value);
  if (!isNaN(newSize) && newSize >= 8 && newSize <= 128) {
    createGrid(newSize);
  } else {
    alert("Please enter a valid grid size between 8 and 128.");
  }
});

colorChoice.addEventListener("change", () => {
  currentColor = colorChoice.value;
});

random.addEventListener("click", () => {
  isRandomMode = !isRandomMode; 
  window.alert("You will need to press it again if you want to  disable Random-Color")
});

createGrid(16);
