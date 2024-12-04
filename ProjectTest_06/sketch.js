<<<<<<< HEAD
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
=======
let img
let hatch
let crisp
let capture

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	crisp = createFramebuffer()
	hatch = createFilterShader(`#version 300 es
		precision highp float;
		
		in vec2 vTexCoord;
		out vec4 outColor;
		uniform sampler2D tex0;
		uniform sampler2D crisp;
		uniform vec2 canvasSize;
		uniform float time;
		
		vec3 position(vec2 uv) {
			vec4 color = texture(tex0, uv);
			float h = (color.r + color.b + color.g) / 3.;
			return vec3(canvasSize * uv, h * (canvasSize.x + canvasSize.y) * 0.035);
		}
		
		void main() {
			vec4 orig = texture(crisp, vTexCoord);
			float brightness = (orig.x + orig.y + orig.z) / 3.;
			
			vec3 c = position(vTexCoord);

			outColor = mix(
				vec4(0., 0., 0., 1.),
				vec4(1., 1., 1., 1.),
				smoothstep(
					0.5,
					0.51,
					brightness + smoothstep(0., 0.5, sin(c.z * 4. + time*0.001)) * 0.3
				)
			);  
		}
	`)
	
	capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
	crisp.draw(() => {
		clear()
		imageMode(CENTER)
		
		// Swap commented lines for horse
		// image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER, RIGHT, CENTER)
		image(capture, 0, 0, width, height, 0, 0, capture.width, capture.height, COVER)
	})
	clear()
	imageMode(CENTER)
	image(crisp, 0, 0)
	filter(BLUR, 100)
	hatch.setUniform('crisp', crisp)
	hatch.setUniform('time', millis())
	filter(hatch)
>>>>>>> e8038b6022d947d3b65e0ecbb2547c6111df2941
}