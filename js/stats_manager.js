function StatsManager() {
  this.maxScore = 1;
  this.container = document.getElementsByClassName('game-stats')[0];
  this.items = [];
}

StatsManager.prototype.pushResult = function(score) {
  const bar = document.createElement('div');
  this.container.appendChild(bar);
  this.maxScore = Math.max(this.maxScore, score);
  this.items.push({ bar, score });
  this.updateBars();
};

StatsManager.prototype.updateBars = function() {
  this.items.forEach(({ bar, score }) => {
    bar.style.width = "1px";
    const height = Math.floor(100.0 * score / this.maxScore);
    bar.style.height = height + "%";
  });
}
