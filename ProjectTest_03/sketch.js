// Galaxy pixels 
// make streaks of pixels that move across the screen
// make pixels horizontally longer and vertically shorter
// reduce the saturation of the pixels

let pixels = [];
const MIN_PIXEL_SIZE = 3;
const MAX_PIXEL_SIZE = 10;
const NUM_PIXELS = 400;
let bgImage;

function preload() {
  let imageName = 'Elon.png'; // Replace with your image file name
  bgImage = loadImage(imageName);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);  
  };
  
  // Initialize random pixels
  for (let i = 0; i < NUM_PIXELS; i++) {
    let size = random(MIN_PIXEL_SIZE, MAX_PIXEL_SIZE);
    pixels.push({
      x: width + random(width), // Start off-screen
      y: random(height),
      size: size,
      color: color(
        random(255), 
        random(255), 
        random(255)
      ),
      speed: map(size, MAX_PIXEL_SIZE, MIN_PIXEL_SIZE, 20, 2) // Bigger pixels travel faster
    });
  }
}

function draw() {
  background(10);
  
  // Draw the background image
  image(bgImage, 0, 0, width, height);
  
  // Draw and move pixels
  for (let i = 0; i < pixels.length; i++) {
    let p = pixels[i];
    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, p.size);
    p.x -= p.speed;
    
    // Reset pixel position if it moves off-screen
    if (p.x < -p.size) {
      p.x = width + p.size;
      p.y = random(height);
    }
  }
}