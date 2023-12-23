class PathStep {
  constructor(row, col, previous) {
    this.row = row;
    this.col = col;
    this.previous = previous;

    this.topChecked = false;
    this.rightChecked = false;
    this.bottomChecked = false;
    this.leftChecked = false;
  }
}

class Matrix
{

  cells = [];

  open = [];
  closed = [];

  /** @param {MatrixRenderer} matrixRenderer */
  renderer;


  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    for(let row = 0; row < rows; row++) {
      this.cells[row] = [];
      for(let col = 0; col < cols; col++) {
        this.cells[row][col] = new Cell(row, col, 0);
      }
    }

    this.renderer = new MatrixRenderer(this, 20);
  }



  findPath(startRow, startCol, endRow, endCol) {
    const path = [];
    let currentStep = new PathStep(startRow, startCol, null);
    const visited = [];
    path.push(currentStep);
    visited.push(currentStep);


    this.open.push(currentStep);
    this.closed.push(`${startRow}-${startCol}`);


    const open = [];


    const neighbors = {
      left: [0, -1],
      right: [0, 1],
      top: [-1, 0],
      bottom:[1, 0],
    };


    let max = this.rows * this.cols;
    for(let step of this.open) {
      for(let direction in neighbors) {
        if(max < 0) {
          console.log(this.open);
          return;
        }
        const nextRow = step.row + neighbors[direction][0];
        const nextCol = step.col + neighbors[direction][1];

        if(nextRow === endRow && nextCol === endCol) {
          console.log('%cMatrix.js :: 73 =============================', 'color: #f00; font-size: 2rem');
          console.log("ICI");

          const steps = [];
          const lastStep = new PathStep(nextRow, nextCol, step);
          steps.push(lastStep);
          steps.push(step);
          while(step.previous !== null) {
            steps.push(step.previous);
            step = step.previous;
          }

          console.log(step);
          console.log(steps);

          console.log('found');
          console.log(max);
          return steps.reverse();
        }

        const key = `${nextRow}-${nextCol}`;


        if(this.closed.includes(key)) {
          console.log('locked');
          continue;
        }

        this.closed.push(key);

        console.log(nextRow, nextCol);

        if(nextRow < 0 || nextRow >= this.cells.length) {
          console.log('out of bounds');
          continue;
        }
        if(nextCol < 0 || nextCol >= this.cells[nextRow].length) {
          console.log('out of bounds');
          continue;
        }

        if(this.cells[nextRow][nextCol].isWall()) {
          console.log('wall');
          continue;
        }

        max--;

        const nextStep = new PathStep(nextRow, nextCol, step);

        if(visited.includes(key)) {
          console.log('already visited');
          continue;
        }
        visited.push(key);
        this.open.push(nextStep);

        // this.renderer.getCell(nextRow, nextCol).style.backgroundColor = 'red';
        this.renderer.getCell(nextRow, nextCol).classList.add('visited');
      }
    }

    console.log(this.open);

  }

  render(container) {
    this.renderer.render(container);
  }

  randomize(treshold = 0.3) {
    for(let row = 0; row < this.cells.length; row++) {
      for(let col = 0; col < this.cells[row].length; col++) {
        this.cells[row][col] = new Cell(row, col, Math.round(Math.random() - treshold));
      }
    }
  }

  setCell(row, col, value) {
    this.cells[row][col].value = value;
  }
}