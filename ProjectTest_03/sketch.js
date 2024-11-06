// Galaxy pixels 
// make streaks of pixels that move across the screen
// make pixels horizontally longer and vertically shorter
// reduce the saturation of the pixels
// easy ease the pixels, like use lerp

let pixels = [];
const MIN_PIXEL_SIZE = 1.2;
const MAX_PIXEL_SIZE = 3;
const NUM_PIXELS = 500;
let bgImage;
const RING_RADIUS = 200; // Radius of the ring
const RING_WIDTH = 50; // Width of the ring

function preload() {
  let imageName = 'Earth.png'; // Replace with your image file name
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
      x: random(width),
      y: random(height),
      size: size,
      initialSize: size,
      direction: 1, // 1 for left to right, -1 for right to left
      speed: random(1, 3)
    });
  }
}

function draw() {
  background(10, 10, 10, 10); // Use a low alpha value to create trails
  
  // Calculate the size and position for the background image
  let imgSize = min(width, height) / 2; // Adjust the divisor to change the size
  let imgX = (width - imgSize) / 2;
  let imgY = (height - imgSize) / 2;
  
  // Draw the background image
  image(bgImage, imgX, imgY, imgSize, imgSize);
  
  // Draw and move pixels
  for (let i = 0; i < pixels.length; i++) {
    let p = pixels[i];
    
    // Calculate new size based on position
    let midPoint = width / 2;
    let distanceFromMid = abs(p.x - midPoint);
    let maxDistance = midPoint;
    let sizeFactor = 1 - (distanceFromMid / maxDistance);
    p.size = p.initialSize + sizeFactor * (MAX_PIXEL_SIZE - p.initialSize);
    
    fill(255, 255, 255, 200); // White color with some transparency
    noStroke();
    ellipse(p.x, p.y, p.size);
    
    // Move pixel
    p.x += p.speed * p.direction;
    
    // Check if pixel reaches the edge
    if (p.x > width || p.x < 0) {
      p.direction *= -1; // Reverse direction
      p.initialSize = random(MIN_PIXEL_SIZE, MAX_PIXEL_SIZE / 2); // Smaller size range for reverse direction
    }
  }
}