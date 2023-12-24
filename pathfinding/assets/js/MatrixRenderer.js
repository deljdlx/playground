class MatrixRenderer
{
  /** @param {Matrix} matrix */
  matrix;

  cellSize;

  cells = [];

  /** @param {Integer} matrix */
  cellSize;
  constructor(matrix, cellSize) {
    this.matrix = matrix;
    this.cellSize = cellSize;
    for(let row = 0; row < this.matrix.cells.length; row++) {
      this.cells[row] = [];
      for(let col = 0; col < this.matrix.cells[row].length; col++) {
        this.cells[row][col] = null;
      }
    }
  }

  render(container) {
    container.innerHTML = '';

    container.classList.add('matrix-container');

    for(let row = 0; row < this.matrix.cells.length; row++) {
      for(let col = 0; col < this.matrix.cells[row].length; col++) {
        const cell = document.createElement('div');
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.classList.add('cell');
        cell.style.width = `${this.cellSize}px`;
        cell.style.height = `${this.cellSize}px`;
        cell.style.top = `${row * this.cellSize}px`;
        cell.style.left = `${col * this.cellSize}px`;

        this.cells[row][col] = cell;
        if(this.matrix.cells[row][col].isWall()) {
          cell.classList.add('wall');
        }
        // cell.innerHTML = `${row}, ${col}`;
        container.appendChild(cell);
      }
      container.appendChild(document.createElement('br'));
    }
  }

  getCell(row, col) {
    return this.cells[row][col];
  };
}