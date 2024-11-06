let time = 0;
const WAVE_PERIOD = 2000; // Slower transition
let currentColors = []; // Store current colors
let targetHue;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
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
  let transitionX = progress * (width * 1.5); // Position of color transition
  
  // New color when cycle completes
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let baseBrightness = map(y, 0, height, 100, 50);
      
      // Smooth gradient transition
      let t = constrain(map(x, transitionX - width, transitionX, 0, 1), 0, 1);
      t = t * t * (3 - 2 * t); // Cubic easing
      
      currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.1 * (1 - t));
      set(x, y, color(currentColors[x][y], 85, baseBrightness));
    }
  }
  updatePixels();
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