// set up matter.js boilerPlate

const { World, Engine, Runner, Render, Bodies, Body, Events } = Matter;

const body = document.querySelector("body");
const winMessage = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

// width and height of the canvas window
const width = window.innerWidth;
const height = window.innerHeight;
const wallWidth = 50;

// make an engine
const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;

// make a render object to render content onto browser

// render in a window

// need engine to know the changes in position

const render = Render.create({
  element: document.body,

  engine,

  options: {
    wireframes: false,
    width,
    height,
  },
});

// start the render
Render.run(render);

Runner.run(Runner.create(), engine);

// generate borders across the canvas element

// code to create a border around our canvas

///////////////////////////// make top and bottom //////////////////////////

//////////////////// later we will make this as a separate function ////////////////////
const borderOptions = { isStatic: true };
const wallLeft = Bodies.rectangle(
  0,
  height / 2,
  wallWidth,
  height,
  borderOptions
);
const wallRight = Bodies.rectangle(
  width,
  height / 2,
  50,
  height,
  borderOptions
);
const wallTop = Bodies.rectangle(width / 2, 0, width, wallWidth, borderOptions);
const wallBottom = Bodies.rectangle(
  width / 2,
  height,
  width,
  50,
  borderOptions
);

const walls = [wallRight, wallTop, wallLeft, wallBottom];

////// render a circle in our matter window ///////////

World.add(world, walls);

// call the function to generate the maze
const [nRows, nCols] = [3, 3];

const [grid, horizontals, verticals] = generateMaze(nRows, nCols);
console.log(grid, horizontals, verticals);

// render the maze now
const cells = [];
const cellColor = "#cf541f";

const [cellWidth, cellHeight] = [
  (width - wallWidth) / nRows,
  (height - wallWidth) / nCols,
];

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// generate lines
horizontals.forEach((row, rowIndex) => {
  // for each col in row
  row.forEach((open, colIndex) => {
    if (open) return;

    // we have to draw a rectangle
    let widthOffset = colIndex * cellWidth + (cellWidth + wallWidth) / 2;
    let heightOffset = rowIndex * cellHeight + cellHeight + wallWidth / 2;

    let lineWidth = cellWidth;
    let lineHeight = 5;

    cells.push(
      Bodies.rectangle(widthOffset, heightOffset, lineWidth, lineHeight, {
        isStatic: true,
        render: {
          fillStyle: cellColor,
        },
      })
    );
  });

  // if col is true

  // continue

  // else

  // drawArectangle of lineWidth, lineHeight
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////// draw vertical lines ////////////////////////////////////////
verticals.forEach((row, rowIndex) => {
  row.forEach((open, colIndex) => {
    if (open) return;

    // if not open draw a rectangle
    let widthOffset = colIndex * cellWidth + cellWidth + wallWidth / 2;

    let heightOffset = rowIndex * cellHeight + (cellHeight + wallWidth) / 2;

    let lineHeight = cellHeight;

    let lineWidth = 5;

    cells.push(
      Bodies.rectangle(widthOffset, heightOffset, lineWidth, lineHeight, {
        isStatic: true,
        render: {
          fillStyle: cellColor,
        },
      })
    );
  });
});

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/// time to draw the goal //////////////////////////////////////////////////

let goalWidth = cellWidth / 2;
let goalHeight = cellHeight / 2;
let goalWidthOffset = (nCols - 1) * cellWidth + (cellWidth + wallWidth) / 2;
let goalHeightOffset = (nRows - 1) * cellHeight + (cellHeight + wallWidth) / 2;

const finalGoal = Bodies.rectangle(
  goalWidthOffset,
  goalHeightOffset,
  goalWidth,
  goalHeight,
  {
    isStatic: true,
    label: "finalGoal",
    render: {
      fillStyle: "green",
    },
  }
);

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////// draw the starting ball ///////////////////////////////////////////
let ballRadius = (cellWidth + cellHeight) / 8;
let ballWidthOffset = (cellWidth + wallWidth) / 2;
let ballHeightOffset = (cellHeight + wallWidth) / 2;

const startingBall = Bodies.circle(
  ballWidthOffset,
  ballHeightOffset,
  ballRadius,
  {
    label: "startingBall",
  }
);

// i want to place it in the middle of the last cell grid[nRow-1][nCol-1]
// colIndex => (nRows - 1) * cellHeight + cellHeight/2
// rowIndex => (nCols - 1) * cellWidth + cellWidth/2

// add an event listener on our ball property
document.addEventListener("keydown", (event) => {
  // get the velocity of the ball
  const { x, y } = startingBall.velocity;
  console.log(x, y);

  //velocity mapping
  // up => 0, -y
  // down => 0, +y
  // right=> +x, 0
  // left => -x, 0
  // look for event.key
  switch (event.key) {
    case "w":
      console.log("up");

      // move the ball up
      Body.setVelocity(startingBall, { x, y: y - 5 });
      break;
    case "a":
      console.log("left");

      Body.setVelocity(startingBall, { x: x - 5, y });

      // move the ball left
      break;
    case "s":
      console.log("down");

      Body.setVelocity(startingBall, { x, y: y + 5 });

      // move the ball right
      break;
    case "d":
      console.log("right");

      Body.setVelocity(startingBall, { x: x + 5, y });

      // move the ball down
      break;
  }
});

Events.on(engine, "collisionStart", (event) => {
  // on the starting of a collision there occurs an event
  event.pairs.forEach((collision) => {
    const labels = ["startingBall", "finalGoal"];
    // bodyA, bodyB
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      // turn the gravity on

      // remove static flag from all the cells
      //   cells.forEach((cell) => (cell.isStatic = false));

      for (let cell of cells) {
        Body.setStatic(cell, false);
      }

      engine.world.gravity.y = 1;

      ///// display the modal of win message /////////
      winMessage.style.display = "flex";

      // addAnEventListener on close button
      closeButton.addEventListener("click", (event) => {
        // close the modal

        winMessage.style.display = "none";

        // refresh my game for the new level
        location.reload();
      });
    }
  });
});

World.add(world, startingBall);

World.add(world, finalGoal);

World.add(world, cells);

// tomorrow full refactor of the code ..

// complete the project
// push to github

// deploy to heroku

// add a readme.md file to both my projects

// fill abu form

// make resume

// refactor the code of this project
