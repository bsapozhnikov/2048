function ArtificialPlayer() {}

// 0: up, 1: right, 2: down, 3: left
ArtificialPlayer.prototype.move = deterministic1;

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
