const container = document.querySelector("#container");
const gridSizeText = document.querySelector("#gridsizelabel");
const gridSizeRange = document.querySelector("#gridsizerange");
const resetButton = document.querySelector("#resetbutton");
const blackButton = document.querySelector("#blackbutton");

// Create grid and add listeners
let gridSize = gridSizeRange.value;
drawGrid(gridSize);
gridSizeText.textContent = `Grid size ${gridSize}x${gridSize}`;
gridSizeRange.addEventListener("input", updateGridSize);
resetButton.addEventListener("click", resetGrid);

function updateGridSize(e) {
  gridSize = this.value;
  gridSizeText.textContent = `Grid size ${gridSize}x${gridSize}`;
  drawGrid(gridSize);
}

function drawGrid(gridSize) {
  let oldGridSize = container.style.getPropertyValue("--grid-size");
  let diff = gridSize ** 2 - oldGridSize ** 2;

  // Only add/remove as many cells as needed
  for (let i = 0; i < Math.abs(diff); i++) {

    if (diff < 0) {
      container.removeChild(container.lastChild);

    } else {
      let cell = document.createElement("div");
      cell.addEventListener("mousedown", colorCell)
      cell.addEventListener("mouseover", colorCell);
      container.appendChild(cell).className = "cell";
    }
  }
  container.style.setProperty("--grid-size", gridSize);
}

function colorCell(e) {
  e.preventDefault();
  if (e.buttons === 1) {
    this.classList.add("cellcolored");
  }
}

function resetGrid(e) {
  let cells = document.querySelectorAll(".cellcolored");
  cells.forEach(cell => {
    cell.classList.remove("cellcolored");
  });
}
