// Slider Pixels Test 01

let video;
let sliders = [];
let resSlider;
let SLIDER_COLS;
let SLIDER_ROWS;

function setup() {
  createCanvas(600, 600);
  resSlider = createSlider(3, 30, 10);
  
  // Update SLIDER_COLS and SLIDER_ROWS based on slider
  SLIDER_COLS = SLIDER_ROWS = resSlider.value();
  
  video = createCapture(VIDEO);
  video.size(SLIDER_COLS, SLIDER_ROWS);
  video.hide();

  // Create grid of sliders
  const sliderWidth = width / SLIDER_COLS;
  const sliderHeight = height / SLIDER_ROWS;

  for (let y = 0; y < SLIDER_ROWS; y++) {
    for (let x = 0; x < SLIDER_COLS; x++) {
      sliders.push({
        x: x * sliderWidth,
        y: y * sliderHeight,
        width: sliderWidth,
        height: sliderHeight,
        value: 0
      });
    }
  }
}

function draw() {
  SLIDER_COLS = SLIDER_ROWS = resSlider.value();
  video.size(SLIDER_COLS, SLIDER_ROWS);
  
  // Reset sliders array with new dimensions
  sliders = [];
  const sliderWidth = width / SLIDER_COLS;
  const sliderHeight = height / SLIDER_ROWS;
  
  for (let y = 0; y < SLIDER_ROWS; y++) {
    for (let x = 0; x < SLIDER_COLS; x++) {
      sliders.push({
        x: x * sliderWidth,
        y: y * sliderHeight,
        width: sliderWidth,
        height: sliderHeight,
        value: 0
      });
    }
  }

  background(0);
  video.loadPixels();

  // Update slider values based on video brightness
  for (let i = 0; i < sliders.length; i++) {
    let x = i % SLIDER_COLS;
    let y = Math.floor(i / SLIDER_COLS);
    
    // Flip x coordinate when reading pixels
    let flippedX = (SLIDER_COLS - 1) - x;
    
    // Get brightness of corresponding video pixel (using flippedX)
    let index = (y * video.width + flippedX) * 4;
    let r = video.pixels[index];
    let g = video.pixels[index + 1];
    let b = video.pixels[index + 2];
    let brightness = (r + g + b) / 3;  // Simple brightness calculation
    
    // Update slider value with some smoothing
    sliders[i].value = lerp(sliders[i].value, brightness / 255, 1);
  }

  // Draw sliders
  noStroke();
  fill(255);
  for (let slider of sliders) {
    let sliderPos = slider.value * slider.width;
    rect(slider.x, slider.y, sliderPos, slider.height);
  }
}