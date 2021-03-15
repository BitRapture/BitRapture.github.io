// --------------
// Constants
// --------------
var canvas = document.getElementById("quickFFCTX"); // Not a const, just leaving it here >:)
var ctx = canvas.getContext("2d"); // Not a const either :O
const fileList = document.getElementById("loadImage").files;
const qtff = {
  version : 1,
  stamp : "QTFFv" // <- This should never change
}

// --------------
// Variables
// --------------
// Source Image
var sImage = new Image();
var sImageURL = "";

// Converting Image
var converting = false;

// Loading Image
var loading = false;

// Generate download link
var imageOutput = document.getElementById("imageOutput");

function getRGBIndex(x, y, width) {
  let b = (y * (width * 4)) + (x * 4);
  return b;
}

function loadImage() {
  if (fileList.length > 0 && !converting) {
    if (sImageURL != "") window.URL.revokeObjectURL(sImageURL);
    sImageURL = window.URL.createObjectURL(fileList[0]);
    sImage.src = sImageURL;
    loading = true;
  }
}

function convertImage() {
  if (fileList.length > 0 && !converting && !loading) {
    converting = true;
    let pData = ctx.getImageData(0, 0, sImage.naturalWidth, sImage.naturalHeight).data;
    let headerSize = (qtff.stamp.length + 1) + 10;
    let cBuffer = new ArrayBuffer((sImage.naturalWidth * sImage.naturalHeight * 3) + headerSize);
    let cData = new Uint8Array(cBuffer);

    for (let i = 0; i < qtff.stamp.length; ++i) {
      cData[i] = qtff.stamp.charCodeAt(i);
    }
    cData[qtff.stamp.length] = qtff.version;
    cData[qtff.stamp.length + 1] = "W".charCodeAt(0);
    cData[qtff.stamp.length + 6] = "H".charCodeAt(0);
    for (let i = 0; i < 4; i++) {
      cData[qtff.stamp.length + 2 + i] = (sImage.naturalWidth & (0x000000ff << (i * 8))) >> (i * 8);
      cData[qtff.stamp.length + 7 + i] = (sImage.naturalHeight & (0x000000ff << (i * 8))) >> (i * 8);
    }
    for (let pY = 0; pY < sImage.naturalHeight; pY++) {
      for (let pX = 0; pX < sImage.naturalWidth; pX++) {
        let colData = getRGBIndex(pX, pY, sImage.naturalWidth);
        let index = ((pY * (sImage.naturalWidth * 3)) + (pX * 3)) + headerSize;
        cData[index] = pData[colData];
        cData[index + 1] = pData[colData + 1];
        cData[index + 2] = pData[colData + 2];
      }
    }

    let cFile = new File([cData], "out.qff", { type : "application/octet-stream" });
    let cFileURL = window.URL.createObjectURL(cFile);
    if (imageOutput.href != "") window.URL.revokeObjectURL(imageOutput.href);
    imageOutput.href = cFileURL;
    converting = false;
  }
}


function main()
{
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (fileList.length > 0) {

      if (loading && sImage.naturalWidth != 0) {
        canvas.width = sImage.naturalWidth;
        canvas.height = sImage.naturalHeight;
        ctx = canvas.getContext("2d");
        loading = false;
      }

      ctx.drawImage(sImage, 0, 0);
  }

  window.requestAnimationFrame(main);
}

window.onload = main;
