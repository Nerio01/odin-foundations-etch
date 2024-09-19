const gridContainer = document.querySelector('.grid-container');

const gridWidth = getComputedStyle(gridContainer).width;

let lmbHoldState = 'released';

gridContainer.addEventListener('mousedown', () => { 
  lmbHoldState = 'hold';
})

gridContainer.addEventListener('mouseup', () => {
  lmbHoldState = 'released';
})

const makeSquare = (sideLength, gridSize, increment = 0.1) => {
  const square = document.createElement('div');
  const getGridSideToNum = Number.parseInt(sideLength.toString().slice(0, -2));
  square.style.height = `${getGridSideToNum / gridSize}px`;
  square.style.width = `${getGridSideToNum / gridSize}px`;
  square.style.border = '1px solid black';
  square.style.backgroundColor = 'rgb(0, 0, 0)';
  square.style.opacity = '1.0';
  square.style.userSelect = 'none'; 
  square.classList.add('color-square');
  square.addEventListener("mouseover", e => {
    if (lmbHoldState === 'hold') {
        e.target.style.opacity = e.target.style.opacity - increment;
        e.stopPropagation()
    }
  });
  square.addEventListener("click", e => {
        e.target.style.opacity = e.target.style.opacity - increment;
        e.stopPropagation()
  });

  return square;
};

const makeRow = (rowLength) => {
  const row = document.createElement('div');
  row.style.display = 'flex';
  for (let i = 0; i < rowLength; i+=1) {
    const square = makeSquare(gridWidth, rowLength,);
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

button.addEventListener('click', () => {
  const promptUser = prompt('Enter number from 1 to 100 to generate grid.');

  if (gridContainer.children.length > 0) {
    while (gridContainer.firstElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild)
    }
  }
   makeGrid(Number.parseInt(promptUser));
});

