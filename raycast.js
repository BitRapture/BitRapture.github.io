// --------------
// Constants
// --------------
const canvas = document.getElementById("rayCastCTX");
const ctx = canvas.getContext("2d");

// --------------
// Functions
// --------------
// toDeg : input radians, output degrees
//       : returns (degrees)
function toDeg(radians) {
  return radians * Math.PI / 180;
}
// checkMapVIntersect : returns distance of vertical intersection
//                    : returns (intersection ? distance : -1)
function checkMapVIntersect(map, mW, mH, mapHW, pX, pY, cAngle, maxIntersects) {
  let aY = (Math.floor(pY / mapHW) * mapHW) + (cAngle < 180 ? -1 : mapHW),
    aYM = (cAngle < 180 ? -mapHW : mapHW);
  let aX = pX + ((pY - aY) / toDeg(Math.tan(cAngle))),
    aXM = mapHW / toDeg(Math.tan(cAngle));

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
  let aY = pY + ((pX - aX) * toDeg(Math.tan(cAngle))),
    aYM = mapHW * toDeg(Math.tan(cAngle));

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
  return (v > 0 ? v : h);
}

// --------------
// Game variables
// --------------
var playerAngle = 0, playerX = 128, playerY = 128,
  playerFOV = 60;

var cUnit = playerFOV / canvas.width,
  cDistance = (canvas.width / 2) / toDeg(Math.tan(playerFOV / 2));

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

  //playerAngle += 0.2;
  //if (playerAngle > 360) playerAngle = 0;

  // Update raycast
  let cAngle = (playerAngle - (playerFOV / 2) < 0 ? 360 + (playerAngle - (playerFOV / 2)) : playerAngle - (playerFOV / 2));
  for (let i = 0; i < canvas.width; ++i) {
    let v = returnMapIntersect(map, 5, 5, mapWH, playerX, playerY, cAngle, 20);
    console.log(v);

    cAngle = (cAngle + cUnit > 360 ? (cAngle + cUnit) - 360 : cAngle + cUnit);
  }

  return 0;

  // Continue loop
  window.requestAnimationFrame(main);
}

window.onload = main(0);
