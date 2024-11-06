// Slit Scan FX 

let capture;
const WIDTH = 160
const HEIGHT = 120
let images = []

function setup() {
  createCanvas(WIDTH * 4, HEIGHT * 4);
  let constraints = {
    video: {
      mandatory: {
        maxWidth: WIDTH,
        maxHeight: HEIGHT
      },
      optional: [{
        maxFrameRate: 30
      }]
    }
  };
  capture = createCapture(constraints);
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  background(0)
  frameRate(30)
}

function draw() {
  scale(4)
  background(0)
  const g = createGraphics(WIDTH, HEIGHT)
  g.image(capture, 0, 0, WIDTH, HEIGHT)
  images.unshift(g)
  if (images.length > WIDTH) images.pop()
  for (let i = 0; i < WIDTH; i++) {
    if (images[i]) {
      image(images[i].get(i, 0, 1, HEIGHT), i, 0, 1, HEIGHT)
    }
  }
}