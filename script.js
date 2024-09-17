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

const square = makeSquare(gridWidth, 16);


const squares = [];

const row = document.createElement('div');
row.style.display = 'flex';


for (let i = 0; i < 16; i+=1) {
  const square = makeSquare(gridWidth, 16);
  row.append(square);
}




gridContainer.append(row);
