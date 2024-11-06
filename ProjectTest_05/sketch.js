let time = 0;
const WAVE_PERIOD = 10000; // Slower transition
let currentColors = []; // Store current colors
let targetHue;
let pixelSize = 10; // Change PIXEL_SIZE to a variable instead of constant
let pixelSlider; // Add slider variable

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
  // Create slider
  pixelSlider = createSlider(2, 100, 10);
  pixelSlider.position(20, 20);
  pixelSlider.style('width', '200px');
  
  initializeColors(); // Move color initialization to separate function
}

// Add new function to initialize colors
function initializeColors() {
  currentColors = [];
  for (let x = 0; x < width; x += pixelSize) {
    currentColors[x] = [];
    for (let y = 0; y < height; y += pixelSize) {
      currentColors[x][y] = 240;
    }
  }
}

function draw() {
  if (frameCount % 2 !== 0) return;
  
  // Check if pixel size changed
  let newPixelSize = pixelSlider.value();
  if (newPixelSize !== pixelSize) {
    pixelSize = newPixelSize;
    initializeColors(); // Reinitialize colors when pixel size changes
  }
  
  time = millis();
  let progress = (time % WAVE_PERIOD) / WAVE_PERIOD;
  let transitionX = progress * (width * 1.5);
  
  // New color when cycle completes
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
  
  noStroke(); // Remove strokes
  
  // Use pixelSize instead of PIXEL_SIZE
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      let baseBrightness = map(y, 0, height, 100, 50);
      
      let t = constrain(map(x, transitionX - width, transitionX, 0, 1), 0, 1);
      t = t * t * (3 - 2 * t);
      
      currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.1 * (1 - t));
      
      // Draw a single rect instead of using set()
      fill(currentColors[x][y], 85, baseBrightness);
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width/2;
  center.y = height/2;
  initializeColors();
}