console.log('%cbootstrap.js :: 1 =============================', 'color: #f00; font-size: 1rem');

const size = 40;
const matrix = new Matrix(size, size);
matrix.randomize(0.25);

// matrix.setCell(1, 3, 1);
// matrix.setCell(1, 4, 1);
// matrix.setCell(1, 5, 1);

// matrix.setCell(2, 0, 1);
// matrix.setCell(3, 1, 1);
// matrix.setCell(3, 2, 1);

// matrix.setCell(3, 3, 1);
// matrix.setCell(3, 4, 1);

// matrix.setCell(5, 2, 1);

// matrix.setCell(6, 2, 1);
// matrix.setCell(6, 3, 1);
// matrix.setCell(6, 4, 1);
// matrix.setCell(6, 5, 1);
// matrix.setCell(6, 6, 1);
// matrix.setCell(6, 7, 1);
// matrix.setCell(6, 8, 1);
// matrix.setCell(6, 9, 1);

// matrix.setCell(7, 4, 1);
// matrix.setCell(8, 4, 1);


matrix.render(document.body);


const path = matrix.findPath(0, 0, size-1, size-1);

for(let step of path) {
  matrix.renderer.getCell(step.row, step.col).style.backgroundColor = '#0f0';
}

console.log('%cbootstrap.js :: 15 =============================', 'color: #f00; font-size: 1rem');
console.log(path);