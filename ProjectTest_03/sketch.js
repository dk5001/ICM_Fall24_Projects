// make mouse interaction -> directional light (like a sun)(refer to ProjectTest_04)

let pixels = [];
const MIN_PIXEL_SIZE = 1.2;
const MAX_PIXEL_SIZE = 3;
const NUM_PIXELS = 500;
let bgImage;
const RING_RADIUS = 200;
const RING_WIDTH = 50;
let slantAngle = PI / 6;

function preload() {
  let imageName = 'Earth.png';
  bgImage = loadImage(imageName);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);  
  };
  
  // Initialize pixels
  for (let i = 0; i < NUM_PIXELS; i++) {
    let angle = random(TWO_PI);
    let radius = RING_RADIUS + random(-RING_WIDTH / 2, RING_WIDTH / 2);
    let size = random(MIN_PIXEL_SIZE, MAX_PIXEL_SIZE);
    pixels.push({
      angle: angle,
      radius: radius,
      size: size,
      speed: random(0.01, 0.03)
    });
  }
}

function draw() {
  background(10, 10, 10, 25);
  
  // Draw background image
  let imgSize = min(width, height) / 4;
  let imgX = (width - imgSize) / 2;
  let imgY = (height - imgSize) / 2;
  image(bgImage, imgX, imgY, imgSize, imgSize);
  
  // Move coordinate system to center
  push();
  translate(width/2, height/2);
  
  // Draw all pixels
  for (let i = 0; i < pixels.length; i++) {
    let p = pixels[i];
    
    // Calculate position
    let x = p.radius * cos(p.angle);
    let y = p.radius * sin(p.angle) * 0.3; // Apply slant
    
    // Draw pixel
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(x, y, p.size * 2, p.size);
    
    // Update angle
    p.angle += p.speed;
    if (p.angle > TWO_PI) {
      p.angle = p.angle % TWO_PI;
    }
  }
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}