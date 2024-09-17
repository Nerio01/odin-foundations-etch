const gridContainer = document.querySelector('.grid-container');

const makeSquare = (sideLength, gridSize) => {
  const square = document.createElement('div');
  const getGridSideToNum = Number.parseInt(sideLength.toString().slice(0, -2));
  square.style.height = `${getGridSideToNum / gridSize}px`;
  square.style.width = `${getGridSideToNum / gridSize}px`;
  square.style.border = '1px solid white';
  square.style.backgroundColor = 'black';
  return square;
};

const gridWidth = getComputedStyle(gridContainer).width;

//const square = makeSquare(gridWidth, 16);

const makeRow = (rowLength) => {
  const row = document.createElement('div');
  row.style.display = 'flex';
  for (let i = 0; i < rowLength; i+=1) {
    const square = makeSquare(gridWidth, rowLength);
    row.append(square);
  }
  return row;
}

const makeGrid = (gridSize) => {
  if (gridSize > 100) return Error;
  for (let i = 0; i < gridSize; i+=1) {
    const row = makeRow(gridSize);
    gridContainer.append(row);
  }
}

makeGrid(64);

// yay it works !!!
//gridContainer.append(makeRow(16));

