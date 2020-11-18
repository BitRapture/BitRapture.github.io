// --------------
// Constants
// --------------
const canvas = document.getElementById("rayCastCTX");
const ctx = canvas.getContext("2d");

// --------------
// Functions
// --------------
// getI : return the index for any 2D 1D array
function getI(x, y, aW) {
  return aW * x + y;
}

function rotateVec(vec, angle) {
  let hX = vec.x;
  vec.x = (vec.x * Math.cos(angle)) - (vec.y * Math.sin(angle));
  vec.y = (hX * Math.sin(angle)) + (vec.y * Math.cos(angle));
}

function calculateIntersect(map, pX, pY, rX, rY, cam) {
  let mapX = Math.floor(pX),
    mapY = Math.floor(pY),
    sX = (rX < 0 ? -1 : 1), sY = (rY < 0 ? -1 : 1);
  let drX = Math.abs(1 / rX),
    drY = Math.abs(1 / rY);
  let sDistX = 0, sDistY = 0;

  if (sX === -1) {
    sDistX = (pX - mapX) * drX;
  } else {
    sDistX = ((mapX + 1) - pX) * drX;
  }
  if (sY === -1) {
    sDistY = (pY - mapY) * drY;
  } else {
    sDistY = ((mapY + 1) - pY) * drY;
  }

  let axis = 0, intersect = false;
  while (mapX < map.w && mapX >= 0 && mapY < map.h && mapY >= 0) {
    if (sDistX < sDistY) {
      sDistX += drX;
      mapX += sX;
      axis = 0;
    } else {
      sDistY += drY;
      mapY += sY;
      axis = 1;
    }

    if (map.walls[getI(mapX, mapY, map.w)] !== 0) {
      intersect = true;
      break;
    }
  }
  cam.axisFlag = axis;

  if (intersect) {
    if (!axis) {
      return (mapX - pX + (1 - sX) / 2) / rX;
    } else {
      return (mapY - pY + (1 - sY) / 2) / rY;
    }
  }

  return -1;
}

// --------------
// Game variables
// --------------
var player = {
  x : 0, y : 0,
  dir : {
    x: -1, y : 0
  }
}
var camera = {
  x : 0, y : 0.85,
  axisFlag : 0
}

var mapStart = true;
var maps = {
  debug : {
    w : 10, pX : 1.2,
    h : 10, pY : 1.2,
    walls : [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
  }
}

// --------------
// Main loop
// --------------
function main(cTime) {
  // On map start
  if (mapStart) {
    player.x = maps.debug.pX;
    player.y = maps.debug.pY;
    mapStart = false;
  }

  rotateVec(player.dir, -0.01);
  rotateVec(camera, -0.01);

  // Clear screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";

  // Update raycast
  for (let i = 0; i < canvas.width; ++i) {
    let seg = 2 * i / canvas.width - 1;
    let rayX = player.dir.x + camera.x * seg,
      rayY = player.dir.y + camera.y * seg;

    let wallDist = canvas.height / calculateIntersect(maps.debug, player.x, player.y, rayX, rayY, camera);
    let drawS = -wallDist / 2 + canvas.height / 2,
      drawE = wallDist / 2 + canvas.height / 2;
    if (drawS < 0) drawS = 0;
    if (drawE > canvas.height) drawE = canvas.height;

    let col = ((wallDist * 5) / 255) + (camera.axisFlag ? 20 : 0);
    ctx.strokeStyle = "rgb(" + (col + 150).toString() + ", " + col.toString() + ", " + col.toString() + ")";

    ctx.beginPath();
    ctx.moveTo(i, drawS);
    ctx.lineTo(i, drawE);
    ctx.stroke();
  }

  // Continue loop
  window.requestAnimationFrame(main);
}

window.onload = main(0);
