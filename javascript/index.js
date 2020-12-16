var twContent = "", twI = 0,
    twContentV = "", twContentPreserve = "";
var typeWrite;

function typeWriter(ID) {
  document.getElementById(ID).innerHTML = twContentV;
  twI++;
  if (twI >= twContent.length) {
    clearInterval(typeWrite);
    document.getElementById(ID).innerHTML = twContentPreserve;
  } else {
    twContentV += twContent[twI];
  }
}

function startTypeWriter(ID) {
  if (document.getElementById(ID).style.visibility === "visible") return;
  twI = 0;
  twContent = document.getElementById(ID).textContent;
  twContentPreserve = document.getElementById(ID).innerHTML;
  document.getElementById(ID).innerHTML = twContentV = twContent[twI];
  document.getElementById(ID).style.visibility = "visible";
  document.getElementById(ID).style.height = "auto";
  typeWrite = setInterval(typeWriter, 25, ID);
}

function main() {
  startTypeWriter("typeWriterDesc");
}

window.onload = main;
