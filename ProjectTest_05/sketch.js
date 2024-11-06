let time = 0;
const WAVE_PERIOD = 2000; // Slower wave
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
      currentColors[x][y] = 240; // Start with blue
    }
  }
  
  targetHue = random(360); // Initial random target color
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reinitialize color array for new dimensions
  currentColors = [];
  for (let x = 0; x < width; x++) {
    currentColors[x] = [];
    for (let y = 0; y < height; y++) {
      currentColors[x][y] = 240;
    }
  }
}

function draw() {
  time = millis();
  
  // Calculate wave position
  let waveX = map(time % WAVE_PERIOD, 0, WAVE_PERIOD, -width, width);
  
  // Check if wave completed a cycle
  if (waveX < lastWaveX) {
    targetHue = random(360); // New random color
  }
  lastWaveX = waveX;
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let baseBrightness = map(y, 0, height, 100, 30);
      
      let distanceFromWave = x - waveX;
      let transitionWidth = 300; // Wider transition
      
      if (distanceFromWave >= 0 && distanceFromWave < transitionWidth) {
        // Slowly ease towards target color
        currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.1);
      }
      
      set(x, y, color(currentColors[x][y], 80, baseBrightness));
    }
  }
  updatePixels();
}