let mic;
let recorder;
let sounds = []; // Array to store multiple sound files
let state = 0;
let lastStateChange = 0;
const INTERVAL = 4000; // 4 seconds in milliseconds

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  mic.start();
  
  textAlign(CENTER, CENTER);
  background('green');
  text('Recording will start automatically...', width / 2, height / 2);
}

function draw() {
  // Check if it's time to change states
  if (millis() - lastStateChange >= INTERVAL) {
    changeState();
  }
}

function changeState() {
  state++;
  state %= 3;
  lastStateChange = millis();
  
  if (state == 1) {
    // Start new recording
    let newSound = new p5.SoundFile();
    sounds.push(newSound);
    recorder.record(newSound);
    background('red');
    text('Recording...', width / 2, height / 2);
    
  } else if (state == 2) {
    // Stop recording
    recorder.stop();
    background('gray');
    text('Processing...', width / 2, height / 2);
    
  } else {
    // Play all recorded sounds
    let currentSound = sounds[sounds.length - 1];
    if (currentSound) {
      currentSound.loop();
    }
    background('green');
    text('Playing... (' + sounds.length + ' layers)', width / 2, height / 2);
  }
}