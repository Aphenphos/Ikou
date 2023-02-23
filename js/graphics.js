import {
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { colorHex } from "../main";
import Bar from "./Bar";
const scene = new Scene();
// Bars --------------------
export async function createBars() {
  let pos = 0;
  for (let i = 0; i < 63; i++) {
    new Bar(pos, colorHex);
    pos += 2;
  }
  scene.add(Bar.bars);
}

export const updateBars = (dataPoints) => {
  for (let i = 0; i < 63; i++) {
    Bar.bars.children[i].scale.y = dataPoints[i] / 10;
    Bar.bars.children[i].position.y = dataPoints[i] / 10 / 2;
  }
};

export const updateBarColor = (colorHex) => {
  for (let i = 0; i < 63; i++) {
    Bar.bars.children[i].material.color.set(colorHex);
  }
};
// -------------------------
const camera = new PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 45;
camera.position.x = 60;
camera.position.y = 10;
camera.lookAt(60, 0, 0);
const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
export function generate(shapeGenFunc) {
  scene.clear();
  shapeGenFunc();
}

export default function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
