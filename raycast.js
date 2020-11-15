// --------------
// Constants
// --------------
const canvas = document.getElementById("rayCastCTX");
const ctx = canvas.getContext("2d");

// --------------
// Functions
// --------------
// checkMapVIntersect : returns distance of vertical intersection
//                    : returns (intersection ? distance : -1)
function checkMapVIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects) {
  let xC = 0, yC = 0;
  let intersection = false, i = 0;

  yC = Math.floor(((pY / mapHW) * mapHW) + (cAngle > 180 ? mapHW : -1));
  xC = Math.floor((pY - yC) / (Math.tan(cAngle) * Math.PI / 180)) + pX;

  do {
    ++i;
    let iX = Math.floor(xC / mapHW), iY = Math.floor(yC / mapHW);

    if (iX < 0 || iY < 0 || iX >= mW || iY >= mH)
      return -1;

    if (map[(iY * mH) + iX]) {
      intersection = true;
      break;
    }

    yC += (cAngle > 180 ? mapHW : -mapHW);
    xC += xC;
  } while (i < maxIntersects);

  if (intersection)
    return Math.sqrt(Math.pow(pX - xC, 2) + Math.pow(pY - yC, 2));

  return -1;
}

// --------------
// Game variables
// --------------
var playerAngle = 170, playerX = 128, playerY = 128,
  playerFOV = 80;

var cUnit = playerFOV / canvas.width,
  cDistance = (canvas.width / 2) / Math.tan((playerFOV / 2) * Math.PI / 180);

var mapWH = 64;
var map = [
  1, 1, 1, 1, 1,
  1, 0, 0, 1, 1,
  1, 0, 0, 0, 1,
  1, 0, 1, 0, 1,
  1, 1, 1, 1, 1
];

// --------------
// Main loop
// --------------
function main(cTime) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";

  playerAngle += 0.8;
  if (playerAngle > 360) playerAngle = 0;

  // Update raycast
  let cAngle = (playerAngle - (playerFOV / 2) < 0 ? 360 + (playerAngle - (playerFOV / 2)) : playerAngle - (playerFOV / 2));

  for (let i = 0; i < canvas.width; ++i) {
    let v = checkMapVIntersect(map, 5, 5, mapWH, playerX, playerY, cAngle, 10);
    if (v !== -1) {
      let tv = (mapWH / (v * Math.cos(cAngle * Math.PI / 180))) * cDistance;
      ctx.fillRect(i, (canvas.height / 2) - (tv / 2), i + 1, tv);
    }
    cAngle = (cAngle + cUnit > 360 ? (cAngle + cUnit) - 360 : cAngle + cUnit);
  }

  // Continue loop
  window.requestAnimationFrame(main);
}

window.onload = main(0);
