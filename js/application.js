// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  const gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, ArtificialPlayer);
  console.log(gm);
});
