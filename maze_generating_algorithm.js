// All the code related to generating matrix

const generateMaze = (nRows, nCols) => {
  // helper function to generate a matrix of size (nRows x nCols) and fill with value (val)

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////// generating matrices //////////////////////////////////
  const generateMatrix = (nRows, nCols, val = 0) => {
    let result = [];

    // fill array with null => take each el => return array of null
    result = Array(nRows)
      .fill(null)
      .map(() => Array(nCols).fill(val));

    return result;
  };

  const grid = generateMatrix(nRows, nCols, false);
  const verticals = generateMatrix(nRows, nCols - 1, false);
  const horizontals = generateMatrix(nRows - 1, nCols, false);

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  ///////// helper functions related to grid traversal //////////
  let [starting_x, starting_y] = [0, 0];

  //////////// select starting_x, starting_y at random
  starting_x = Math.floor(Math.random() * nRows);
  starting_y = Math.floor(Math.random() * nCols);

  const valid = (x, y) => {
    return x >= 0 && y >= 0 && x < nRows && y < nCols;
  };

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  /////////////// dfs function ////////////////////////////
  const dfs = (x, y, direction) => {
    if (!valid(x, y)) return;

    if (grid[x][y]) return;

    // here we will dismantle horizonals and verticals
    if (direction != "") {
      switch (direction) {
        case "top":
          horizontals[x][y] = true;
          break;
        case "bottom":
          horizontals[x - 1][y] = true;
          break;

        case "left":
          verticals[x][y] = true;
          break;

        case "right":
          verticals[x][y - 1] = true;
          break;

        default:
          console.log("invalid direction");
      }
    }

    grid[x][y] = true;

    const neighBours = [
      [x + 1, y, "bottom"],
      [x - 1, y, "top"],
      [x, y + 1, "right"],
      [x, y - 1, "left"],
    ];

    shuffle(neighBours);

    //////////////////////////////////////
    /////////////// perform dfs ///////////
    for (let neighBour of neighBours) {
      const [curX, curY, direction] = neighBour;
      dfs(curX, curY, direction);
    }

    // shuffle the neighbours
  };

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  dfs(starting_x, starting_y, "");

  return [grid, horizontals, verticals];
};

// horizontals and verticals ... ///
