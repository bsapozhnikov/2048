function ArtificialPlayer() {
  this.Q = {};
  this.alpha = 0.7;
  this.gamma = 0.9;
  this.prevState = undefined;
  this.prevMove = undefined;
  this.prevScore = 0;
  this.noise = 0.5;
  this.numMoves = 0;
  this.stageGoal = 256;
}

// 0: up, 1: right, 2: down, 3: left
ArtificialPlayer.prototype.move = qLearning;

function qLearning(grid, score, didMove) {
  if (score > this.stageGoal) {
    return { shouldRestart: true };
  }

  const state = grid.cells.map(row => row.map(tile => tile ? tile.value : 0));
  let [a, v] = this.qMakeBestMove(state, score);
  this.updateQ(state, v, score, didMove);

  if (Math.random() < this.noise) {
    const a2 = Math.floor(Math.random() * 4);
    console.log("AP qLearning adding noise", a, a2);
    a = a2;
  }

  this.updateParams();

  this.prevState = state;
  this.prevMove = a;
  this.prevScore = score;
  this.numMoves++;

  return { move: a };
}

ArtificialPlayer.prototype.qMakeBestMove = function(state, score) {
  var best_move = 0;
  var best_value = -Infinity;
  for (var i = 0; i < 4; i++) {
    let value = this.Q[[state, i]];
    if (value) {
      console.log("AP QMakeBestMove", state, i, value);
    }
    else {
      value = this.reward(state, score);
    }
    if (value > 0 && false) {
      console.log("AP QMakeBestMove", this.Q, [state, i], value);
    }
    if (value > best_value) {
      best_move = i;
      best_value = value;
    }
  }
  return [best_move, best_value];
};

ArtificialPlayer.prototype.updateQ = function(state, value, score, didMove) {
  if (!this.prevState) { return; }
  const r = this.reward(state, score);
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

ArtificialPlayer.prototype.updateParams = function() {
  if (this.numMoves % 1000 == 0) {
    // console.log("Entering new epoch");
    this.noise /= 1.2;
  }
};

ArtificialPlayer.prototype.reward = reward_4;

function reward_4(state, score) {
  if (score == 0) { return 0; }
  return score - this.prevScore;
}

function reward_3(state) {
  const set = new Set();
  state.forEach(row => row.forEach(v => { set.add(v); }));
  let sum = 0;
  set.forEach(v => sum += v);
  return sum;
}

function reward_2(state) {
  var sum = 0;
  var count = 0;
  state.forEach(row => row.forEach(v => { sum += v; count += Math.min(1, v); }));
  return sum / count;
}

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
