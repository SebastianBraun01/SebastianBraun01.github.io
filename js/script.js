const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d')

let breite = canvas.width;
let höhe = canvas.height;

c.strokeStyle = "white";
c.lineWidth = 2;

const sinus = {
  amplitude: 150,
  periode: 0.03,
  ausbreitung: 0.1
}

function drawSine(phase) {
  c.clearRect(0, 0, breite, höhe);
  c.beginPath();
  c.moveTo(0, höhe / 2);
  for (let i = 0; i < breite; i++) {
    c.lineTo(i, (höhe / 2) + Math.sin(i * sinus.periode + phase) * sinus.amplitude);
  }
  c.stroke();
}

let i = 0;
function animation() {
  drawSine(i);
  i += sinus.ausbreitung;
  requestAnimationFrame(animation);
}

drawSine(0);
animation();














































// Alte Funktionen (werden ausgemustert)
function redirectProjekt(param) {
  if(param == 1) window.location.href = '../pages/LED-Netzwerk.html';
  else if(param == 2) window.location.href = '../pages/Steckbrett-Computer.html';
  else if(param == 3) window.location.href = '../pages/Nixie-Uhr.html';
  else if(param == 4) window.location.href = '../pages/equipment.html';
}