import {
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TorusKnotGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { colorHex } from "../main";
import Bar from "./Bar";
import TorusKnot from "./TorusKnot";
const scene = new Scene();
// Bars --------------------
export async function createBars() {
  Bar.bars = new Group();
  let pos = 0;
  for (let i = 0; i < 63; i++) {
    new Bar(pos, colorHex);
    pos += 2;
  }
  scene.add(Bar.bars);
}

export const updateBars = (dataPoints) => {
  for (let i = 0; i < 63; i++) {
    Bar.bars.children[i].scale.y = dataPoints[i + 1] / 10;
    Bar.bars.children[i].position.y = dataPoints[i + 1] / 10 / 2;
  }
};

export const updateBarColor = (colorHex) => {
  for (let i = 0; i < 63; i++) {
    Bar.bars.children[i].material.color.set(colorHex);
  }
};
// -------------------------
//TorusKnot __________
//add smallerknots in thr center
export const createKnots = () => {
  let pos = 60;
  let scale = 25;
  TorusKnot.knots = new Group();
  for (let i = 0; i < 6; i++) {
    new TorusKnot(pos, scale, colorHex);
  }
  scene.add(TorusKnot.knots);
};

export const updateKnots = (dataPoints) => {
  for (let i = 6 - 1; i >= 0; i--) {
    const newGeo = new TorusKnotGeometry(
      dataPoints[i * 10] / 10 || (i * 10) / 3 + i || 1,
      0.1,
      300,
      15,
      19,
      20
    );
    TorusKnot.knots.children[i].geometry = newGeo;
    TorusKnot.knots.children[i].rotation.z += 0.01;
  }
};

export const updateKnotColor = (colorHex) => {
  for (let i = 0; i < 6; i++) {
    TorusKnot.knots.children[i].material.color.set(colorHex);
  }
};
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
