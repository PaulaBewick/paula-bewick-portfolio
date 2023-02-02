function drawGradientCanvas() {
  let ctx = document.getElementById("gradient-canvas").getContext("2d");

  // set up the canvas fill
  let canvasFill = (x, y, r, g, b) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
  };

  // calculate red, green, and blue variables using x, y, and time
  let R = (x, y, time) =>
    Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time));

  let G = (x, y, time) =>
    Math.floor(
      192 +
        32 *
          Math.sin(
            (x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300
          )
    );

  let B = (x, y, time) =>
    Math.floor(
      192 +
        64 *
          Math.sin(
            5 * Math.sin(time / 9) +
              ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
          )
    );

  let time = 0;

  // write the rgb variables to the canvas fill
  let run = () => {
    for (let x = 0; x <= 35; x++) {
      for (let y = 0; y <= 35; y++) {
        canvasFill(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
      }
    }
    time += 0.04;
    window.requestAnimationFrame(run);
  };

  run();
}
drawGradientCanvas();
