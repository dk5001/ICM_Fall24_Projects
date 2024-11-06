let time = 0;
const WAVE_PERIOD = 5000; // Slower wave
let currentColors = []; // Store current colors
let targetHue; // Target color to transition to
let center = {x: 0, y: 0}; // Center point for radial spread

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
  center.x = width/2;
  center.y = height/2;
  
  // Initialize color array
  for (let x = 0; x < width; x++) {
    currentColors[x] = [];
    for (let y = 0; y < height; y++) {
      currentColors[x][y] = 240;
    }
  }
  
  targetHue = random(360);
}

function draw() {
  time = millis();
  let progress = (time % WAVE_PERIOD) / WAVE_PERIOD;
  let maxRadius = dist(0, 0, width, height);
  let currentRadius = progress * maxRadius;
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let d = dist(x, y, center.x, center.y);
      let transitionWidth = 200;
      
      if (d < currentRadius) {
        // Smooth transition based on distance
        let t = constrain(map(d, currentRadius - transitionWidth, currentRadius, 1, 0), 0, 1);
        currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.05 * t);
      }
      
      let baseBrightness = map(d, 0, maxRadius, 100, 70);
      set(x, y, color(currentColors[x][y], 80, baseBrightness));
    }
  }
  
  updatePixels();
  
  // Reset with new color when cycle completes
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width/2;
  center.y = height/2;
  currentColors = [];
  for (let x = 0; x < width; x++) {
    currentColors[x] = [];
    for (let y = 0; y < height; y++) {
      currentColors[x][y] = 240;
    }
  }
}