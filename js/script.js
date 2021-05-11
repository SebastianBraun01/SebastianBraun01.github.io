const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
// Canvas einstellungen ===========================================================================
canvas.width = window.innerWidth;
canvas.height = 700;
const fenster = {
    breite: canvas.width,
    höhe: canvas.height
};
c.strokeStyle = "black";
c.lineWidth = 1;
// Animation vorbereiten ==========================================================================
const sinus = {
    amplitude: 150,
    periode: 0.03,
    ausbreitung: 0.1
};
function drawSine(phase) {
    c.clearRect(0, 0, fenster.breite, fenster.höhe);
    c.beginPath();
    c.moveTo(0, fenster.höhe / 2);
    for (let i = 0; i < fenster.breite; i++) {
        c.lineTo(i, (fenster.höhe / 2) + Math.sin(i * sinus.periode + phase) * sinus.amplitude);
    }
    c.stroke();
}
// Animation abspielen ============================================================================
let i = 0;
function animation() {
    drawSine(i);
    i += sinus.ausbreitung;
    requestAnimationFrame(animation);
}
drawSine(0);
animation();
