// Constants
const COLS = 26, ROWS = 26;

// IDs
let EMPTY = 0, SNAKE = 1, FRUIT = 2;

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
  let randpos = empty[Math.foor(Math.random()*empthy.length)];
  grid.set(FRUIT, randpos.x, randpos.y);

}
function main() {

} 
function init() {

}
function loop() {

}
function update() {

} 
function draw() {

}

main();