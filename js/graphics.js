import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import Bar from "./Bar";

const scene = new Scene();
// const planeGeometry = new PlaneGeometry(100, 100);
// const planeMaterial = new MeshBasicMaterial({
//   color: "grey",
//   side: DoubleSide,
// });
// const plane = new Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = 1.57;
// plane.position.y = 0;
// plane.position.x = 50;

//add the bars;
function createBars() {
  let pos = 0;
  for (let i = 0; i < 63; i++) {
    new Bar(pos);
    pos += 2;
  }
  scene.add(Bar.bars);
}
createBars();

export function updateBars(dataPoints) {
  for (let i = 0; i < 63; i++) {
    Bar.bars.children[i].scale.y = dataPoints[i] / 10;
    Bar.bars.children[i].position.y = dataPoints[i] / 10 / 2;
  }
}
const camera = new PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 40;
camera.position.x = 60;
camera.position.y = 10;
camera.lookAt(60, 0, 0);
const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export default function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
