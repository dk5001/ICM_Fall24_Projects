let time = 0;
const WAVE_PERIOD = 10000;
let currentColors = [];
let targetHue;
let center = {x: 0, y: 0};
let pixelSize = 10;
let pixelSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
  // Create slider
  pixelSlider = createSlider(2, 50, 10);
  pixelSlider.position(20, 20);
  pixelSlider.style('width', '200px');
  
  center.x = width/2;
  center.y = height/2;
  
  targetHue = random(360);
  initializeColors();
  
  // Force first frame
  time = millis();
  draw();
}

function initializeColors() {
  let oldColors = currentColors;
  currentColors = [];
  
  for (let x = 0; x < width; x += pixelSize) {
    currentColors[x] = [];
    for (let y = 0; y < height; y += pixelSize) {
      if (oldColors.length > 0) {
        // Preserve colors when changing pixel size
        let oldX = Math.round(x / oldColors.length * width);
        let oldY = Math.round(y / (oldColors[0]?.length || 1) * height);
        oldX = constrain(oldX - (oldX % pixelSize), 0, width - pixelSize);
        oldY = constrain(oldY - (oldY % pixelSize), 0, height - pixelSize);
        currentColors[x][y] = oldColors[oldX]?.[oldY] ?? targetHue;
      } else {
        currentColors[x][y] = 240;
      }
    }
  }
}

function draw() {
  if (frameCount % 2 !== 0) return; // Skip frames for performance
  
  // Check for pixel size changes
  let newPixelSize = pixelSlider.value();
  if (newPixelSize !== pixelSize) {
    pixelSize = newPixelSize;
    initializeColors();
  }
  
  time = millis();
  let progress = (time % WAVE_PERIOD) / WAVE_PERIOD;
  let maxRadius = dist(0, 0, width, height);
  let currentRadius = progress * maxRadius;
  
  noStroke();
  
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      let d = dist(x + pixelSize/2, y + pixelSize/2, center.x, center.y);
      let transitionWidth = 200;
      
      if (d < currentRadius) {
        // Smooth transition based on distance
        let t = constrain(map(d, currentRadius - transitionWidth, currentRadius, 1, 0), 0, 1);
        currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.05 * t);
      }
      
      let baseBrightness = map(d, 0, maxRadius, 100, 70);
      fill(currentColors[x][y], 80, baseBrightness);
      rect(x, y, pixelSize, pixelSize);
    }
  }
  
  // Reset with new color when cycle completes
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width/2;
  center.y = height/2;
  initializeColors();
}