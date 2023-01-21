class Sliders {
  constructor(min, max, def, variable, x, y) {
    this.min = min;
    this.max = max;
    this.def = def;
    this.variable = variable;
    this.x = x;
    this.y = y;
  }

  build() {
    this.slider = createSlider(min, max, def);
    this.slider.position(x, y);
  }

  get get_variable_value() {
    this.variable = slider.value();
  }

  set set_variable_value(var_to_change) {
    var_to_change = this.variable;
    return var_to_change;
  }
}