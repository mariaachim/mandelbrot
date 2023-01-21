// resolution
const HEIGHT = 500;
const WIDTH = 700;

// user-changable values
const NUM_ITERATIONS = 150;
const RE_COORD = 0; //-0.415343365;
const IM_COORD = 0; //0.596579372;
const HUMAN_ZOOM = 0.25;

// zoom!
const ZOOM_LEVEL = 1 / HUMAN_ZOOM; // increasing this makes it zoom out lol
const ASPECT = HEIGHT / WIDTH;

const RE_START = RE_COORD - ZOOM_LEVEL / 2;
const RE_END = RE_COORD + ZOOM_LEVEL / 2
const IM_START = IM_COORD - (ZOOM_LEVEL * ASPECT / 2);
const IM_END = IM_COORD + (ZOOM_LEVEL * ASPECT / 2);

/*
const RE_START = -2.0;
const RE_END = 1.0;
const IM_START = -1.0;
const IM_END = 1.0;
*/

function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(HSL);
  noLoop();
}

function draw() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 1; x < WIDTH; x++) {
      let x_scaled = RE_START + (parseFloat(x) / parseFloat(WIDTH)) * (RE_END - RE_START);
      let y_scaled = IM_END - (parseFloat(y) / parseFloat(HEIGHT)) * (IM_END - IM_START);
      let mandelbrot = check_if_mandelbrot(x_scaled, y_scaled);
      if (mandelbrot === -1) {
        set(x, y, color(0));
      } else {
        let hsl = color(pow((mandelbrot / NUM_ITERATIONS) * 360, 1.3) % 360, 100, 50);
        set(x, y, hsl)
      }
    }
  }
  updatePixels();
}

function check_if_mandelbrot(x, y) {
  const c = math.complex(x, y);
  let z = math.complex(0, 0);
  for (let i = 0; i < NUM_ITERATIONS; i++) {
    z = math.add(math.multiply(z, z), c);
    if (math.abs(z) >= 2) {
      return i;
    }
  }
  if (math.abs(z) < 2) {
    return -1;
  } else {
    return NUM_ITERATIONS;
  }
}