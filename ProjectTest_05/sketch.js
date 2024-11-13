let time = 0;
let wavePeriod = 6000;
let currentColors = [];
let targetHue = 0;
let pixelSize = 10;
let pixelSlider;
let waveSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  background(220);
  
  // Pixel size slider
  pixelSlider = createSlider(2, 50, 10);
  pixelSlider.position(20, 20);
  pixelSlider.style('width', '200px');
  
  // Wave period slider
  waveSlider = createSlider(500, 20000, 6000);
  waveSlider.position(20, 50);
  waveSlider.style('width', '200px');
  
  // Labels (optional)
  let pixelLabel = createDiv('Pixel Size');
  pixelLabel.position(230, 20);
  pixelLabel.style('color', 'white');
  
  let waveLabel = createDiv('Wave Speed');
  waveLabel.position(230, 50);
  waveLabel.style('color', 'white');
  
  targetHue = random(360);
  initializeColors();
  
  time = millis();
  draw();
}

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
  
  // Update pixel size if changed
  let newPixelSize = pixelSlider.value();
  if (newPixelSize !== pixelSize) {
    pixelSize = newPixelSize;
    initializeColors();
  }
  
  // Update wave period from slider
  wavePeriod = waveSlider.value();
  
  time = millis();
  let progress = (time % wavePeriod) / wavePeriod;
  let transitionX = progress * (width * 1.5);
  
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
  
  noStroke();
  
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      let baseBrightness = map(y, 0, height, 100, 50);
      
      let t = constrain(map(x, transitionX - width, transitionX, 0, 1), 0, 1);
      t = t * t * (3 - 2 * t);
      
      currentColors[x][y] = lerp(currentColors[x][y], targetHue, 0.1 * (1 - t));
      
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