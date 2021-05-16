import anime from "animejs";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const c = canvas.getContext('2d');


// Canvas einstellungen ===========================================================================
canvas.width = window.innerWidth / 2;
canvas.height = 450;


// Funktionen =====================================================================================
function vertLine(x: number, height: number) {
  if(height > canvas.height || x > canvas.width) console.log("Fehler: grid zu groß! (vertLine();)");
  c.clearRect(x - 1, canvas.height - height, 3, height);
  c.beginPath();
  c.moveTo(x, canvas.height);
  c.lineTo(x, canvas.height - height);
  c.stroke();
}

function horiLine(y: number, length: number) {
  if(length > canvas.width || y > canvas.height) console.log("Fehler: grid zu groß! (horiLine();)");
  c.clearRect(0, canvas.height - y - 1, length, 3);
  c.beginPath();
  c.moveTo(0, canvas.height - y);
  c.lineTo(length, canvas.height - y);
  c.stroke();
}

function drawSine(länge: number, phase: number) {
  const amplitude = 150;
  const periode = 0.03;

  if(länge > canvas.width) console.log("Fehler: Länge zu groß! (drawSine();)");
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for(let i = 0; i < länge; i++){
    c.lineTo(i, (canvas.height / 2) + amplitude * Math.sin(i * periode + phase));
  }
  c.stroke();
}

function drawRect(länge: number, phase: number, noise: boolean) {
  const amplitude = 150;
  const T = 170;

  if(länge > canvas.width) console.log("Fehler: Länge zu groß! (drawRect();)");
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  if(noise == true){
    for(let i = 0; i < länge; i = i + 10){
      c.lineTo(i, (canvas.height / 2) + (amplitude + Math.floor(Math.random() * 21) - 10) * (((i % T) < T / 2) ? 1 : -1) + phase);
    }
  }
  else{
    for(let i = 0; i < länge; i++){
      c.lineTo(i, (canvas.height / 2) + amplitude * (((i % T) < T / 2) ? 1 : -1) + phase);
    }
  }
  c.stroke();
}

function refreshGrid() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  // Border
  c.strokeStyle = "#B6B6B6";
  c.lineWidth = 2;
  vertLine(0, canvas.height);
  vertLine(canvas.width, canvas.height);
  horiLine(0, canvas.width);
  horiLine(canvas.height, canvas.width);
  // Grid
  c.lineWidth = 1;
  for(let i = 0; i < 10; i++){
    vertLine(grid.vx[i], canvas.height);
  }
  for(let i = 0; i < 8; i++){
    horiLine(grid.hx[i], canvas.width);
  }
  c.stroke();
  c.strokeStyle = "black";
}


// Animation Daten ================================================================================
let border = {
  vy0: 0, vy1: 0,
  hy0: 0, hy1: 0,

  vx: [0, canvas.width],
  hx: [0, canvas.height]
};

let grid = {
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
    canvas.width / 11 * 10
  ],

  hx: [
    canvas.height / 9 * 1,
    canvas.height / 9 * 2,
    canvas.height / 9 * 3,
    canvas.height / 9 * 4,
    canvas.height / 9 * 5,
    canvas.height / 9 * 6,
    canvas.height / 9 * 7,
    canvas.height / 9 * 8
  ]
};

let wave = {
  width: 0,
  pos: canvas.height / 2,
  phase: 0
};


// Animation Timeline =============================================================================
let tl_border = anime.timeline({
  round: 1,
  easing: "easeOutCubic",
  loop: false
}).add({
  targets: border,
  vy0: canvas.height,
  hy0: canvas.width,
  update: () => {
    vertLine(border.vx[0], border.vy0);
    horiLine(border.hx[0], border.hy0);
  },
  begin: () => {
    c.strokeStyle = "#B6B6B6";
    c.lineWidth = 2;
  }
}).add({
  targets: border,
  vy1: canvas.height,
  hy1: canvas.width,
  update: () => {
    c.clearRect(canvas.width - border.hy1, 0, border.hy1, 1);
    c.beginPath();
    c.moveTo(canvas.width, 0);
    c.lineTo(canvas.width - border.hy1, 0);
    c.stroke();

    c.clearRect(canvas.width, 0, 1, border.vy1);
    c.beginPath();
    c.moveTo(canvas.width, 0);
    c.lineTo(canvas.width, border.vy1);
    c.stroke();
  },
  complete: () => {
    c.lineWidth = 1;
    tl_grid.play();
  }
}, "-= 600");

let tl_grid = anime.timeline({
  round: 1,
  easing: "easeOutCubic",
  loop: false,
  autoplay: false
}).add({
  targets: grid,
  vy0: canvas.height,
  update: () => {
    vertLine(grid.vx[0], grid.vy0);
  }
}).add({
  targets: grid,
  vy1: canvas.height,
  update: () => {
    vertLine(grid.vx[1], grid.vy1);
  }
}, "-= 900").add({
  targets: grid,
  vy2: canvas.height,
  update: () => {
    vertLine(grid.vx[2], grid.vy2);
  }
}, "-= 900").add({
  targets: grid,
  vy3: canvas.height,
  update: () => {
    vertLine(grid.vx[3], grid.vy3);
  }
}, "-= 900").add({
  targets: grid,
  vy4: canvas.height,
  update: () => {
    vertLine(grid.vx[4], grid.vy4);
  }
}, "-= 900").add({
  targets: grid,
  vy5: canvas.height,
  update: () => {
    vertLine(grid.vx[5], grid.vy5);
  }
}, "-= 900").add({
  targets: grid,
  vy6: canvas.height,
  update: () => {
    vertLine(grid.vx[6], grid.vy6);
  }
}, "-= 900").add({
  targets: grid,
  vy7: canvas.height,
  update: () => {
    vertLine(grid.vx[7], grid.vy7);
  }
}, "-= 900").add({
  targets: grid,
  vy8: canvas.height,
  update: () => {
    vertLine(grid.vx[8], grid.vy8);
  }
}, "-= 900").add({
  targets: grid,
  vy9: canvas.height,
  update: () => {
    vertLine(grid.vx[9], grid.vy9);
  }
}, "-= 900").add({
  targets: grid,
  hy0: canvas.width,
  update: () => {
    horiLine(grid.hx[0], grid.hy0);
  }
}, "-= 900").add({
  targets: grid,
  hy1: canvas.width,
  update: () => {
    horiLine(grid.hx[1], grid.hy1);
  }
}, "-= 900").add({
  targets: grid,
  hy2: canvas.width,
  update: () => {
    horiLine(grid.hx[2], grid.hy2);
  }
}, "-= 900").add({
  targets: grid,
  hy3: canvas.width,
  update: () => {
    horiLine(grid.hx[3], grid.hy3);
  }
}, "-= 900").add({
  targets: grid,
  hy4: canvas.width,
  update: () => {
    horiLine(grid.hx[4], grid.hy4);
  }
}, "-= 900").add({
  targets: grid,
  hy5: canvas.width,
  update: () => {
    horiLine(grid.hx[5], grid.hy5);
  }
}, "-= 900").add({
  targets: grid,
  hy6: canvas.width,
  update: () => {
    horiLine(grid.hx[6], grid.hy6);
  }
}, "-= 900").add({
  targets: grid,
  hy7: canvas.width,
  update: () => {
    horiLine(grid.hx[7], grid.hy7);
  },
  complete: () => {
    tl_wave.play();
  }
}, "-= 900");

let tl_wave = anime({
  targets: wave,
  width: canvas.width,
  round: 1,
  duration: 3000,
  loop: false,
  autoplay: false,
  easing: "linear",
  update: () => {
    refreshGrid();
    drawSine(wave.width, 0);
  },
  begin: () => {
    c.strokeStyle = "black";
  },
  complete: () => {
    tl_loop.play();
  }
});

let tl_loop = anime({
  targets: wave,
  phase: 31,
  round: 1000,
  duration: 4000,
  loop: true,
  autoplay: false,
  easing: "linear",
  update: () => {
    refreshGrid();
    drawSine(canvas.width, wave.phase);
  }
});
