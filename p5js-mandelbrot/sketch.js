// resolution
const HEIGHT = 400;
const WIDTH = 600;

const NUM_ITERATIONS = 50; //150 recommended
let re_coord = 0; //-0.415343365;
let im_coord = 0; //0.596579372;
let human_zoom = 0.25;

// zoom!
let zoom_level = 1 / human_zoom; // increasing this makes it zoom out lol
const ASPECT = HEIGHT / WIDTH;

let re_start = re_coord - zoom_level / 2;
let re_end = re_coord + zoom_level / 2
let im_start = im_coord - (zoom_level * ASPECT / 2);
let im_end = im_coord + (zoom_level * ASPECT / 2);

/*
const re_start = -2.0;
const re_end = 1.0;
const im_start = -1.0;
const im_end = 1.0;
*/

function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(HSL);

  text("Zoom", 100, 400); // TODO: add text, currently not working
  zoom = createSlider(25, 100, 0);
  zoom.position(100, 450);

  text("Vertical Pan", 250, 400);
  pan_vertical = createSlider(0, 100, 50);
  pan_vertical.position(250, 450);

  text("Horizontal Pan", 400, 400);
  pan_horizontal = createSlider(0, 100, 50);
  pan_horizontal.position(400, 450);

  zoom.changed(callback);
  pan_vertical.input(callback);
  pan_horizontal.input(callback);
  noLoop();
}

function draw() {
  let human_zoom = zoom.value() / 100;
  let pan_vertical_value = pan_vertical.value(); // y
  let pan_horizontal_value = pan_horizontal.value(); // x

  re_coord = -(0.5 - pan_horizontal_value / 100);
  im_coord = -(0.5 - pan_vertical_value / 100);

  zoom_level = 1 / human_zoom;
  re_start = re_coord - zoom_level / 2;
  re_end = re_coord + zoom_level / 2
  im_start = im_coord - (zoom_level * ASPECT / 2);
  im_end = im_coord + (zoom_level * ASPECT / 2);

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 1; x < WIDTH; x++) {
      let x_scaled = re_start + (parseFloat(x) / parseFloat(WIDTH)) * (re_end - re_start);
      let y_scaled = im_end - (parseFloat(y) / parseFloat(HEIGHT)) * (im_end - im_start);
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

function callback() {
  redraw();
}