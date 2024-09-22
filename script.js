const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('oncontextmenu', 'return false');

const gridWidth = getComputedStyle(gridContainer).width;

let lmbHoldState = 'released';
let rmbHoldState = 'released';
let gridGenerated = 'not-generated';
let lastGeneratedGridSize = '';

gridContainer.addEventListener('mousedown', e => {
  if (e.button === 0) lmbHoldState = 'hold';
  if (e.button === 2) rmbHoldState = 'hold';
})

gridContainer.addEventListener('mouseup', e => {
  if (e.button === 0) lmbHoldState = 'released';
  if (e.button === 2) rmbHoldState = 'released';
})

gridContainer.addEventListener('mouseenter', () => {
  if (gridGenerated === 'not-generated') gridContainer.style.cursor = 'auto';
  if (gridGenerated === 'generated') gridContainer.style.cursor = 'none';
})

const modifyBkgrColor = (bgValStr, plusOrMinus) => {
  const sliced = bgValStr.slice(4, -1).split(', ');
  const result = [];
  if (plusOrMinus === 'plus') sliced.forEach((element) => result.push(Number.parseFloat(element) + 25.5));
  if (plusOrMinus === 'minus') sliced.forEach((element) => result.push(Number.parseFloat(element) - 25.5));

  const [red, green , blue] = result;
  return `rgb(${red}, ${green}, ${blue})`;
}

const makeSquare = (sideLength, gridSize,) => {
  const square = document.createElement('div');
  const getGridSideToNum = Number.parseInt(sideLength.toString().slice(0, -2));
  square.style.height = `${getGridSideToNum / gridSize}px`;
  square.style.width = `${getGridSideToNum / gridSize}px`;
  square.style.border = 'none';
  square.style.backgroundColor = 'rgb(0, 0, 0)';
  square.style.userSelect = 'none'; 
  square.classList.add('color-square');
  square.setAttribute('oncontextmenu', 'return false');
   
  square.addEventListener("mouseover", e => {
    if (lmbHoldState === 'hold') {
      e.target.style.backgroundColor = modifyBkgrColor(e.target.style.backgroundColor, 'plus');
    }
    if (rmbHoldState === 'hold') {
      e.target.style.backgroundColor = modifyBkgrColor(e.target.style.backgroundColor, 'minus');
    }  
      e.stopPropagation()
    
  });
  
  square.addEventListener('click', e => {
    if (e.button === 0) e.target.style.backgroundColor = modifyBkgrColor(e.target.style.backgroundColor, 'plus');
    e.stopPropagation();
  })

  square.addEventListener('contextmenu', e => {
    e.target.style.backgroundColor = modifyBkgrColor(e.target.style.backgroundColor, 'minus');
    e.stopPropagation();
  });

  square.addEventListener('mouseenter', () => square.style.border = '2px solid red');

  square.addEventListener('mouseleave', () => square.style.border = 'none');

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
    gridGenerated = 'generated';
  }
}

const gridGeneratorButton = document.querySelector('.grid-generator');

gridGeneratorButton.addEventListener('click', () => {
  const promptUser = prompt('Enter number from 1 to 100 to generate grid.');
  lastGeneratedGridSize = promptUser;

  if (gridContainer.children.length > 0) {
    while (gridContainer.firstElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild)
    }
  }
   makeGrid(Number.parseInt(promptUser));
});

const gridResetButton = document.querySelector('.grid-reset');
gridResetButton.addEventListener('click', () => {
  if (lastGeneratedGridSize.length === 0) {
    alert('Nothing to reset. Please generate grid first.');
    return;
  }
   if (gridContainer.children.length > 0) {
    while (gridContainer.firstElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild)
    }
  }
   makeGrid(Number.parseInt(lastGeneratedGridSize));
})


