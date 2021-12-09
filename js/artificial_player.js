function ArtificialPlayer() {
  this.Q = {};
  this.alpha = 0.5;
  this.gamma = 0.9;
  this.prevState = undefined;
  this.prevMove = undefined;
}

// 0: up, 1: right, 2: down, 3: left
ArtificialPlayer.prototype.move = qLearning;

function qLearning(grid, didMove) {
  const state = grid.cells.map(row => row.map(tile => tile ? tile.value : 0));
  const [a, v] = this.qMakeBestMove(state);
  this.updateQ(state, v, didMove);
  this.prevState = state;
  this.prevMove = a;
  return a;
}

ArtificialPlayer.prototype.qMakeBestMove = function(state) {
  var best_move = 0;
  var best_value = -Infinity;
  for (var i = 0; i < 4; i++) {
    const value = this.Q[[state, i]] || 0;
    if (value > 0) {
      console.log("AP QMakeBestMove", this.Q, [state, i], value);
    }
    if (value > best_value) {
      best_move = i;
      best_value = value;
    }
  }
  return [best_move, best_value];
};

ArtificialPlayer.prototype.updateQ = function(state, value, didMove) {
  if (!this.prevState) { return; }
  const r = q_reward(state);
  let newQ = r;
  if (!didMove) {
    newQ = -1;
  }
  else {
    const oldQ = this.Q[[this.prevState, this.prevMove]] || 0;
    newQ = (1 - this.alpha)*oldQ + this.alpha * (r + (this.gamma * value));
  }

  this.Q[[this.prevState, this.prevMove]] = newQ;
};

function reward_1(state) {
  var r = 0;
  state.forEach(row => row.forEach(v => r += v));
  return r;
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
