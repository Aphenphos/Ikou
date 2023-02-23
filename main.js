import "./style.css";
import parseAudio, { processAudio } from "./js/audio";
import animate, {
  createBars,
  createKnots,
  generate,
  updateBarColor,
  updateBars,
  updateKnotColor,
  updateKnots,
} from "./js/graphics";

export let colorHex = "#FFFFFF";
const updaters = {
  bars: [updateBars, createBars, updateBarColor],
  torus: [updateKnots, createKnots, updateKnotColor],
};

const color = document.getElementById("color-picker");
color.addEventListener("input", (e) => {
  colorHex = e.currentTarget.value;
  const updateFuncs = updateObj(shapeP);

  updateColor(updateFuncs[2], colorHex);
});

const shape = document.getElementById("shape");
let shapeP = "bars";
shape.addEventListener("change", (e) => {
  shapeP = e.currentTarget.value;
  const params = updateObj(shapeP);
  generate(params[1]);
  updateFunc = params[0];
});

export let updateFunc = updateBars;
const input = document.getElementById("audio-up");
input.addEventListener("change", (e) => {
  processAudio(e.currentTarget.files[0]);
  const params = updateObj(shapeP);
  generate(params[1]);
  updateFunc = params[0];
  parseAudio();
});
animate();

function updateObj(shapeP) {
  return updaters[shapeP];
}
function updateColor(updateColorFunc, colorHex) {
  updateColorFunc(colorHex);
}
