import anime from "animejs";
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
// Canvas einstellungen ===========================================================================
canvas.width = window.innerWidth / 2;
canvas.height = 450;
c.strokeStyle = "black";
c.lineWidth = 1;
// Funktionen =====================================================================================
function vertLine(x, height) {
    if (height > canvas.height || x > canvas.width)
        console.log("Fehler: data zu groß! (vertLine();)");
    c.clearRect(x - 1, canvas.height - height, 3, height);
    c.beginPath();
    c.moveTo(x, canvas.height);
    c.lineTo(x, canvas.height - height);
    c.stroke();
}
function horiLine(y, length) {
    if (length > canvas.width || y > canvas.height)
        console.log("Fehler: data zu groß! (horiLine();)");
    c.clearRect(0, canvas.height - y - 1, length, 3);
    c.beginPath();
    c.moveTo(0, canvas.height - y);
    c.lineTo(length, canvas.height - y);
    c.stroke();
}
function drawSine(länge, phase) {
    const amplitude = 150;
    const periode = 0.03;
    if (länge > canvas.width)
        console.log("Fehler: Länge zu groß! (drawSine();)");
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    for (let i = 0; i < länge; i++) {
        c.lineTo(i, (canvas.height / 2) + amplitude * Math.sin(i * periode + phase));
    }
    c.stroke();
}
function drawRect(länge, phase) {
    const amplitude = 150;
    const T = 120;
    if (länge > canvas.width)
        console.log("Fehler: Länge zu groß! (drawRect();)");
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    for (let i = 0; i < länge; i++) {
        c.lineTo(i, (canvas.height / 2) + amplitude * (((i % T) < T / 2) ? 1 : -1) + phase);
    }
    c.stroke();
}
// Animation Timeline =============================================================================
let data = {
    vy0: 0, vy1: 0, vy2: 0, vy3: 0, vy4: 0,
    vy5: 0, vy6: 0, vy7: 0, vy8: 0, vy9: 0,
    hy0: 0, hy1: 0, hy2: 0, hy3: 0,
    hy4: 0, hy5: 0, hy6: 0, hy7: 0,
    vx: [
        canvas.width / 11 * 1,
        canvas.width / 11 * 2,
        canvas.width / 11 * 3,
        canvas.width / 11 * 4,
        canvas.width / 11 * 5,
        canvas.width / 11 * 6,
        canvas.width / 11 * 7,
        canvas.width / 11 * 8,
        canvas.width / 11 * 9,
        canvas.width / 11 * 10,
    ],
    hx: [
        canvas.height / 9 * 1,
        canvas.height / 9 * 2,
        canvas.height / 9 * 3,
        canvas.height / 9 * 4,
        canvas.height / 9 * 5,
        canvas.height / 9 * 6,
        canvas.height / 9 * 7,
        canvas.height / 9 * 8,
    ]
};
let tl_grid = anime.timeline({
    round: 1,
    easing: "easeOutCubic",
    loop: false,
}).add({
    targets: data,
    vy0: canvas.height,
    update: () => {
        vertLine(data.vx[0], data.vy0);
    }
}).add({
    targets: data,
    vy1: canvas.height,
    update: () => {
        vertLine(data.vx[1], data.vy1);
    }
}, "-= 900").add({
    targets: data,
    vy2: canvas.height,
    update: () => {
        vertLine(data.vx[2], data.vy2);
    }
}, "-= 900").add({
    targets: data,
    vy3: canvas.height,
    update: () => {
        vertLine(data.vx[3], data.vy3);
    }
}, "-= 900").add({
    targets: data,
    vy4: canvas.height,
    update: () => {
        vertLine(data.vx[4], data.vy4);
    }
}, "-= 900").add({
    targets: data,
    vy5: canvas.height,
    update: () => {
        vertLine(data.vx[5], data.vy5);
    }
}, "-= 900").add({
    targets: data,
    vy6: canvas.height,
    update: () => {
        vertLine(data.vx[6], data.vy6);
    }
}, "-= 900").add({
    targets: data,
    vy7: canvas.height,
    update: () => {
        vertLine(data.vx[7], data.vy7);
    }
}, "-= 900").add({
    targets: data,
    vy8: canvas.height,
    update: () => {
        vertLine(data.vx[8], data.vy8);
    }
}, "-= 900").add({
    targets: data,
    vy9: canvas.height,
    update: () => {
        vertLine(data.vx[9], data.vy9);
    }
}, "-= 900").add({
    targets: data,
    hy0: canvas.width,
    update: () => {
        horiLine(data.hx[0], data.hy0);
    }
}, "-= 900").add({
    targets: data,
    hy1: canvas.width,
    update: () => {
        horiLine(data.hx[1], data.hy1);
    }
}, "-= 900").add({
    targets: data,
    hy2: canvas.width,
    update: () => {
        horiLine(data.hx[2], data.hy2);
    }
}, "-= 900").add({
    targets: data,
    hy3: canvas.width,
    update: () => {
        horiLine(data.hx[3], data.hy3);
    }
}, "-= 900").add({
    targets: data,
    hy4: canvas.width,
    update: () => {
        horiLine(data.hx[4], data.hy4);
    }
}, "-= 900").add({
    targets: data,
    hy5: canvas.width,
    update: () => {
        horiLine(data.hx[5], data.hy5);
    }
}, "-= 900").add({
    targets: data,
    hy6: canvas.width,
    update: () => {
        horiLine(data.hx[6], data.hy6);
    }
}, "-= 900").add({
    targets: data,
    hy7: canvas.width,
    update: () => {
        horiLine(data.hx[7], data.hy7);
    }
}, "-= 900");
