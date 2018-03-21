// Constants
const COLS = 26, ROWS = 26;

// IDs
let EMPTY = 0, SNAKE = 1, FRUIT = 2;

// Directions
var LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3;

let grid = {
  width: null,
  height: null,
  _grid: null,

  init: function(d, c, r) {
    this.width = c;
    this.height = r;

    this._grid = [];
    for (let x = 0; x < c; x++) {
      this._grid.push([]);
      for (let y = 0; y < r; y++) {
        this._grid[x].push(d);
      }
    }
  },
  set: function(val, x, y){
    this._grid[x][y] = val;
  },
  get: function(x, y){
    return this._grid[x][y];
  }
}

let snake = {
  direction: null,
  last: null,
  _queue: null,

  init: function(d, x, y) {
    this.direction = d;

    this._queue = [];
    this.insert(x, y);
  },
  insert: function(x, y) {
    this._queue.unshift({x:x, y:y});
    this.last = this._queue[0];
  },
  remove: function(){
    return this._queue.pop();
  }
}

function setFood() {
  let empty = [];
  for (let x = 0; x < grid.width; x++) {
    for (let y = 0; y < grid.height; y++) {
      if (grid.get(x,y) === EMPTY) {
        empty.push({x:x, y:y});
      }
    }
  }
  let randpos = empty[Math.floor(Math.random()*empty.length)];
  grid.set(FRUIT, randpos.x, randpos.y);
}
var canvas, ctx, keystate, frames;

function main() {
  canvas = document.createElement('canvas');
  canvas.width = COLS * 20;
  canvas.height = ROWS * 20;
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  frames = 0;
  keystate = {};
  init();
  loop();
} 
function init() {
  grid.init(EMPTY, COLS, ROWS);

  var sp = {x: Math.floor(COLS/2), y: ROWS - 1};
  snake.init(UP, sp.x, sp.y);
  grid.set(SNAKE, sp.x, sp.y);

  setFood();
}
function loop() {
  update();
  draw();

  window.requestAnimationFrame(loop, canvas);
}
function update() {
  frames++;

  if(frames%5 === 0) {
    var nx = snake.last.x;
    var ny = snake.last.y;

    switch (snake.direction) {
      case LEFT:
        nx--;
        break;
      case UP:
        ny--;
        break;      
      case RIGHT:
        nx++;
        break;      
      case DOWN:
        nx++;
        break;      
    }

    var tail = snake.remove();
    grid.set(EMPTY, tail.x, tail.y);
    tail.x = nx;
    tail.y = ny;
    grid.set(SNAKE, tail.x, tail.y);

    snake.insert(tail.x, tail.y);
  }
} 
function draw() {
  var tw = canvas.width/grid.width;
  var th = canvas.height/grid.height;

  for (let x = 0; x < grid.width; x++) {
    for (let y = 0; y < grid.height; y++) {
      switch (grid.get(x, y)) {
        case EMPTY:
          ctx.fillStyle = "#fff";
          break;
        case SNAKE:
          ctx.fillStyle = "#0ff";        
          break;
        case FRUIT:
          ctx.fillStyle = "#f00";        
          break;
      }
      ctx.fillRect(x*tw, y*th, tw, th);
    }
  }
}

main();