let time = 0;
let wavePeriod = 5000;
let currentColors = [];
let targetHue;
let center = {x: 0, y: 0};
let pixelSize = 10;
let pixelSlider;
let waveSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
  pixelSlider = createSlider(2, 50, 10);
  pixelSlider.position(20, 20);
  pixelSlider.style('width', '200px');
  
  waveSlider = createSlider(500, 20000, 5000);
  waveSlider.position(20, 50);
  waveSlider.style('width', '200px');
  
  center.x = width/2;
  center.y = height/2;
  
  targetHue = random(360);
  initializeColors();
  
  time = millis();
  draw();
  
  // Add labels
  let pixelLabel = createDiv('Pixel Size');
  pixelLabel.position(230, 20);
  pixelLabel.style('color', 'white');
  
  let waveLabel = createDiv('Wave Period');
  waveLabel.position(230, 50);
  waveLabel.style('color', 'white');
}

function initializeColors() {
  let oldColors = currentColors;
  currentColors = [];
  
  // Calculate grid dimensions instead of using pixel coordinates directly
  let cols = Math.ceil(width / pixelSize);  // Fix: Use ceil to ensure cover entire canvas
  let rows = Math.ceil(height / pixelSize); // Fix: Use ceil to prevent missing edge pixels
  
  // Initialize array using grid coordinates instead of pixel coordinates
  for (let i = 0; i < cols; i++) {
    currentColors[i] = [];
    for (let j = 0; j < rows; j++) {
      if (oldColors.length > 0) {
        // Fix: Improved mapping between old and new grid coordinates
        let oldCol = Math.floor(i * oldColors.length / cols);      // Fix: Better interpolation
        let oldRow = Math.floor(j * (oldColors[0]?.length || 1) / rows); // Fix: Better interpolation
        currentColors[i][j] = oldColors[oldCol]?.[oldRow] ?? targetHue;  // Fix: Proper fallback
      } else {
        currentColors[i][j] = 240;
      }
    }
  }
}

function draw() {
  if (frameCount % 2 !== 0) return;
  
  let newPixelSize = pixelSlider.value();
  if (newPixelSize !== pixelSize) {
    pixelSize = newPixelSize;
    initializeColors();
  }
  
  wavePeriod = waveSlider.value();
  
  time = millis();
  let progress = (time % wavePeriod) / wavePeriod;
  let maxRadius = dist(0, 0, width, height);
  let currentRadius = progress * maxRadius;
  
  noStroke();
  
  // Fix: Calculate grid dimensions once instead of using pixel coordinates
  let cols = Math.ceil(width / pixelSize);
  let rows = Math.ceil(height / pixelSize);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Fix: Convert grid coordinates to pixel coordinates
      let x = i * pixelSize;
      let y = j * pixelSize;
      
      // Fix: Calculate distance from center of pixel, not corner
      let d = dist(
        x + pixelSize/2,
        y + pixelSize/2,
        center.x,
        center.y
      );
      
      let transitionWidth = 200;
      
      if (d < currentRadius) {
        let t = (currentRadius - d) / transitionWidth;
        t = max(0, min(1, t));
        currentColors[i][j] = lerp(currentColors[i][j], targetHue, 0.05 * t);  // Fix: Use grid coordinates
      }
      
      let baseBrightness = map(d, 0, maxRadius, 100, 70);
      fill(currentColors[i][j], 80, baseBrightness);
      
      // Fix: Handle edge cases by calculating actual pixel dimensions
      let w = min(pixelSize, width - x);   // Fix: Prevent overflow at right edge
      let h = min(pixelSize, height - y);  // Fix: Prevent overflow at bottom edge
      rect(x, y, w, h);
    }
  }
  
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width/2;
  center.y = height/2;
  initializeColors();  // Fix: Properly reinitialize grid on resize
}