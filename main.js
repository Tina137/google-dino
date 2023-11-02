let canvas = document.getElementById("c");
let c = canvas.getContext("2d");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let gameOver = false;

// dino

let dinoWidth = 40;
let dinoHeight = 92;
let dinoY = canvas.height - dinoHeight;
let dino = {
  x: 15,
  y: dinoY,
};

let dinoImg = new Image(dino.dinoWidth, dino.dinoHeight);
dinoImg.src = "./imgs/dino.png";

// cactus

cactusHeight = 70;
let cactusX = 700;
let cactusY = canvas.height - cactusHeight;
changeX = -8;

let cactusOneImg = new Image();
cactusOneImg.src = "./imgs/cactus1.png";

let cactusTwoImg = new Image();
cactusTwoImg.src = "./imgs/cactus2.png";

let cactusTreeImg = new Image();
cactusTreeImg.src = "./imgs/cactus3.png";

let cactusArr = [cactusOneImg, cactusTwoImg, cactusTreeImg];
let cactusWidth = [33, 66, 100];

function detectCollision(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + dinoWidth > b.x &&
    a.y < b.y + b.h &&
    a.y + dinoHeight > b.y
  );
}

window.onload = () => {
  setInterval(placeCactus, 1500);
  requestAnimationFrame(update);
};
arr = [];
function placeCactus() {
  let random = getRandomInt(3);
  let cactus = {
    img: cactusArr[random],
    x: cactusX,
    y: cactusY,
    w: cactusWidth[random],
    h: cactusHeight,
  };

  arr.push(cactus);
  if (arr.length > 5) {
    arr.shift();
  }
  return arr;
}
let jumping = false;

function update() {
  requestAnimationFrame(update);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    for (let i of arr) {
      i.x += changeX;
      c.drawImage(i.img, i.x, i.y, i.w, i.h);

      if (detectCollision(dino, i)) {
        gameOver = true;
        dinoImg.src = "imgs/dino-dead.png";
        dinoImg.onload = function () {
          c.drawImage(dinoImg, dino.x, dino.y);
        };
      }
    }
  }
  c.drawImage(dinoImg, dino.x, dino.y);
  if (jumping === true) {
    dino.y = dinoY - cactusHeight;
    setTimeout(full, 700);
  }
}
function full() {
  jumping = false;
  dino.y = dinoY;
}

document.addEventListener("keydown", (e) => {
  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    jumping = true;
  }
});
