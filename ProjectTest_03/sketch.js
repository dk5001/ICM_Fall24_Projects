let pixels = [];
const MIN_PIXEL_SIZE = 3;
const MAX_PIXEL_SIZE = 10;
const NUM_PIXELS = 400;

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
  
  // Draw and move pixels
  for (let pixel of pixels) {
    // Move pixel left
    pixel.x -= pixel.speed;
    
    // Reset pixel when it goes off-screen
    if (pixel.x < -pixel.size) {
      pixel.x = width + random(100);
      pixel.y = random(height);
      // Optional: Regenerate color
      pixel.color = color(
        random(255), 
        random(255), 
        random(255)
      );
    }
    
    // Draw pixel
    noStroke();
    fill(pixel.color);
    rect(pixel.x, pixel.y, pixel.size, pixel.size);
  }
}