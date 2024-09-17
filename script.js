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
  if (gridSize > 100 || !Number.isInteger(gridSize)) return reportError('value is above 100 or not an integer');
  for (let i = 0; i < gridSize; i+=1) {
    const row = makeRow(gridSize);
    gridContainer.append(row);
  }
}

const button = document.querySelector('button');

const promptUser = prompt('Enter number from 1 to 100 to generate grid.');

button.addEventListener('click', () => {
  const promptUser = prompt('Enter number from 1 to 100 to generate grid.');

  if (gridContainer.children.length > 0) {
    while (gridContainer.firstElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild)
    }
  }
   makeGrid(Number.parseInt(promptUser));
});

// yay it works !!!

