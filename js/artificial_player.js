function ArtificialPlayer() {
  this.Q = {};
  this.alpha = 0.5;
  this.gamma = 0.9;
}

// 0: up, 1: right, 2: down, 3: left
ArtificialPlayer.prototype.move = qLearning;

function qLearning(grid) {
  const state = grid.cells.map(row => row.map(tile => tile ? tile.value : 0));
  var best_move = 0;
  var best_value = 0;
  for (var i = 0; i < 4; i++) {
    const value = this.Q[(state, i)];
    if (value > best_value) {
      best_move = i;
      best_value = value;
    }
  }
  return best_move;
}

function deterministic1() {
  r = Math.random();
  if (r < 0.5) { return 2; }
  if (r < 0.9) { return 1; }
  if (r < 0.99) { return 3; }
  return 0;
}

function alwaysDown() {
  return 2;
}
