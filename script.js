const grid = document.getElementById("grid");
for (let i = 0; i < 9; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 9; j++) {
    const cell = document.createElement("input");
    cell.type = "number";
    cell.min = "0";
    cell.max = "9";
    cell.className = "cell";
    cell.id = `cell-${i}-${j}`;
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

// Get grid values
function getBoard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = parseInt(document.getElementById(`cell-${i}-${j}`).value);
      row.push(isNaN(val) ? 0 : val);
    }
    board.push(row);
  }
  return board;
}

// Set grid values
function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = board[i][j] || '';
    }
  }
}

// Check if number can be placed
function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)]
              [3 * Math.floor(col / 3) + x % 3] === num) {
      return false;
    }
  }
  return true;
}

// Solve Sudoku using backtracking
function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Handle Solve button click
function solve() {
  const board = getBoard();
  const solvable = solveSudoku(board);
  if (solvable) {
    setBoard(board);
    alert("Solved!");
  } else {
    alert("No solution found!");
  }
}


// // Generate grid
// const grid = document.getElementById("grid");
// for (let i = 0; i < 9; i++) {
//   const row = document.createElement("div");
//   row.className = "row";
//   for (let j = 0; j < 9; j++) {
//     const cell = document.createElement("input");
//     cell.type = "number";
//     cell.min = "1";
//     cell.max = "9";
//     cell.className = "cell";
//     cell.id = `cell-${i}-${j}`;
//     row.appendChild(cell);
//   }
//   grid.appendChild(row);
// }

// // Get current board
// function getBoard() {
//   let board = [];
//   for (let i = 0; i < 9; i++) {
//     let row = [];
//     for (let j = 0; j < 9; j++) {
//       let val = parseInt(document.getElementById(`cell-${i}-${j}`).value);
//       row.push(isNaN(val) ? 0 : val);
//     }
//     board.push(row);
//   }
//   return board;
// }

// // Set board to grid
// function setBoard(board) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       const cell = document.getElementById(`cell-${i}-${j}`);
//       cell.value = board[i][j] || '';
//       cell.disabled = board[i][j] !== 0; // lock pre-filled cells
//     }
//   }
// }

// // Check if safe
// function isSafe(board, row, col, num) {
//   for (let x = 0; x < 9; x++) {
//     if (board[row][x] === num || board[x][col] === num ||
//         board[3 * Math.floor(row / 3) + Math.floor(x / 3)]
//              [3 * Math.floor(col / 3) + x % 3] === num) {
//       return false;
//     }
//   }
//   return true;
// }

// // Solve using backtracking
// function solveSudoku(board) {
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (board[row][col] === 0) {
//         for (let num = 1; num <= 9; num++) {
//           if (isSafe(board, row, col, num)) {
//             board[row][col] = num;
//             if (solveSudoku(board)) return true;
//             board[row][col] = 0;
//           }
//         }
//         return false;
//       }
//     }
//   }
//   return true;
// }

// // Generate full solved board
// function generateFullBoard() {
//   let board = Array.from({ length: 9 }, () => Array(9).fill(0));
//   fillDiagonalBoxes(board);
//   solveSudoku(board);
//   return board;
// }

// // Fill diagonal 3x3 boxes first (faster generation)
// function fillDiagonalBoxes(board) {
//   for (let i = 0; i < 9; i += 3) {
//     fillBox(board, i, i);
//   }
// }

// function fillBox(board, row, col) {
//   let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//   let idx = 0;
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       board[row + i][col + j] = nums[idx++];
//     }
//   }
// }

// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// // Remove cells to create puzzle
// function removeNumbers(board, count = 40) {
//   while (count > 0) {
//     let i = Math.floor(Math.random() * 9);
//     let j = Math.floor(Math.random() * 9);
//     if (board[i][j] !== 0) {
//       board[i][j] = 0;
//       count--;
//     }
//   }
// }

// // Solve button click
// function solve() {
//   let board = getBoard();
//   if (solveSudoku(board)) {
//     setBoard(board);
//     alert("Puzzle Solved!");
//   } else {
//     alert("No solution possible.");
//   }
// }

// // On load: generate and display puzzle
// window.onload = () => {
//   const fullBoard = generateFullBoard();
//   removeNumbers(fullBoard, 40); // you can change number to make it harder
//   setBoard(fullBoard);
// };
// Create 9x9 grid
