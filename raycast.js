// --------------
// Constants
// --------------
const canvas = document.getElementById("rayCastCTX");
const ctx = canvas.getContext("2d");

// --------------
// Functions
// --------------
// toDeg : input degrees, output radians
//       : returns (radians)
function toRad(degrees) {
  return degrees * Math.PI / 180;
}
// checkMapVIntersect : returns distance of vertical intersection
//                    : returns (intersection ? distance : -1)
function checkMapVIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects) {
  let aY = (Math.floor(pY / mapHW) * mapHW) + (cAngle < 180 ? -1 : mapHW),
    aYM = (cAngle < 180 ? -mapHW : mapHW);
  let aX = pX + (Math.abs(pY - aY) / Math.tan(toRad(cAngle))),
    aXM = mapHW / Math.tan(toRad(cAngle));

  let i = 0, intersection = false;
  do {
    let mapX = Math.floor(aX / mapHW),
      mapY = Math.floor(aY / mapHW);

    if (mapX >= mW || mapX < 0 || mapY >= mH || mapY < 0)
      break;

    if (map[(mapY * mH) + mapX]) {
      intersection = true;
      break;
    }

    aY += aYM;
    aX += aXM;
    i++;
  } while (i < maxIntersects);

  if (intersection)
    return Math.sqrt(Math.pow(pX - aX, 2) + Math.pow(pY - aY, 2));
  return -1;
}
// checkMapHIntersect : returns distance of vertical intersection
//                    : returns (intersection ? distance : -1)
function checkMapHIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects) {
  let d = (cAngle > 90 || cAngle < 270 ? -1 : 1);
  let aX = (Math.floor(pX / mapHW) * mapHW) + (d === 1 ? mapHW : d),
    aXM = mapHW * d;
  let aY = pY + (Math.abs(pX - aX) * Math.tan(toRad(cAngle))),
    aYM = mapHW * Math.tan(toRad(cAngle));

  let i = 0, intersection = false;
  do {
    let mapX = Math.floor(aX / mapHW),
      mapY = Math.floor(aY / mapHW);

    if (mapX >= mW || mapX < 0 || mapY >= mH || mapY < 0)
      break;

    if (map[(mapY * mH) + mapX]) {
      intersection = true;
      break;
    }

    aY += aYM;
    aX += aXM;
    i++;
  } while (i < maxIntersects);

  if (intersection)
    return Math.sqrt(Math.pow(pX - aX, 2) + Math.pow(pY - aY, 2));
  return -1;
}
// returnMapIntersect : returns the shortest distance from both intersection functions
//                    : returns (distance)
function returnMapIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects) {
  let v = checkMapVIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects),
    h = checkMapHIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects);
  return (v > 0 && v < h ? v : h);
}

// --------------
// Game variables
// --------------
var playerAngle = 45, playerX = 130, playerY = 124,
  playerFOV = 80;

var cUnit = playerFOV / canvas.width,
  cDistance = (canvas.width / 2) / Math.tan(toRad(playerFOV / 2));

console.log(cDistance);

var mapWH = 64;
var map = [
  1, 1, 1, 1, 1,
  1, 0, 0, 0, 1,
  1, 0, 0, 0, 1,
  1, 0, 0, 0, 1,
  1, 1, 1, 1, 1
];

// --------------
// Main loop
// --------------
function main(cTime) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";

  playerAngle += 0.6;
  if (playerAngle >= 360) playerAngle = 0;

  // Update raycast
  let cAngle = (playerAngle - (playerFOV / 2) < 0 ? 360 + (playerAngle - (playerFOV / 2)) : playerAngle - (playerFOV / 2));
  let i = 0;
  do {
    let v = returnMapIntersect(map, 5, 5, mapWH, playerX, playerY, cAngle, 4);
    let tV = mapWH / v * 255;

    ctx.fillRect(i, (canvas.height / 2) - (tV / 2), i + 1, tV);

    cAngle = (cAngle + cUnit > 360 ? (cAngle + cUnit) - 360 : cAngle + cUnit);
    i++;
  } while (i < canvas.width);

  // Continue loop
  window.requestAnimationFrame(main);
}

window.onload = main(0);
