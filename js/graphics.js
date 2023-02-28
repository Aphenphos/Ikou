import {
  AmbientLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import { colorHex } from "../main";
import Bar from "./Bar";
import Pulse from "./Pulse";
import TorusKnot from "./TorusKnot";
import { getAverage, getRandomNumber } from "./utils";
import Water from "./Water";
const scene = new Scene();

// Bars --------------------
export async function createBars() {
  camera.position.z = 45;
  camera.position.x = 60;
  camera.position.y = 10;
  camera.lookAt(60, 0, 0);
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
  camera.position.z = 45;
  camera.position.x = 60;
  camera.position.y = 10;
  camera.lookAt(60, 0, 0);
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
  200
);
// ____WATER_________________
export const createWater = () => {
  camera.position.z = 45;
  camera.position.x = 60;
  camera.position.y = 10;
  camera.lookAt(60, 0, 0);
  const ambient = new AmbientLight(colorHex, 1000);
  scene.add(ambient);

  Water.water = new Group();
  new Water(colorHex, -10);
  new Water(colorHex, 30);
  scene.add(Water.water);
};
export const updateWater = (dataPoints) => {
  const count = 196;
  let dataP = 0;
  let round = -1;
  for (let i = 0; i < count; i++) {
    if (round > 1) {
      round = -1;
      dataP++;
    }
    const xBottom =
      Water.water.children[0].geometry.attributes.position.getX(i);
    const xsinBottom = Math.sin(xBottom - dataPoints[dataP] / 12);
    Water.water.children[0].geometry.attributes.position.setZ(
      i,
      xsinBottom + round / 30
    );
    const xTop = Water.water.children[1].geometry.attributes.position.getX(i);
    const xsinTop = Math.sin(xTop + dataPoints[dataP] / 10);
    Water.water.children[1].geometry.attributes.position.setZ(
      i,
      xsinTop - round / 30
    );
    round++;
  }
  Water.water.children[0].geometry.computeVertexNormals();
  Water.water.children[0].geometry.attributes.position.needsUpdate = true;
  Water.water.children[1].geometry.computeVertexNormals();
  Water.water.children[1].geometry.attributes.position.needsUpdate = true;
};
export const updateWaterColor = (colorHex) => {
  Water.water.children[0].material.color.set(colorHex);
  Water.water.children[1].material.color.set(colorHex);
  Water.water.children[0].material.needsUpdate = true;
  Water.water.children[1].material.needsUpdate = true;
};
//________
let starGroup = new Group();
export const handleStars = (change) => {
  if (change === true) {
    starGroup = new Group();
    for (let i = 0; i < 100; i++) {
      const geometry = new SphereGeometry(0.25);
      const material = new MeshBasicMaterial({
        color: "white",
      });
      const star = new Mesh(geometry, material);
      const randomZ = getRandomNumber(-60, -50);
      const randomX = getRandomNumber(-150, 300);
      const randomY = getRandomNumber(-110, 80);
      star.position.z = randomZ;
      star.position.x = randomX;
      star.position.y = randomY;
      starGroup.add(star);
    }
    scene.add(starGroup);
  } else {
    scene.remove(starGroup);
  }
};
//__________________________
export const createPulse = () => {
  camera.position.z = 45;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.lookAt(0, 0, 0);
  Pulse.pulseG = new Group();
  new Pulse(0, colorHex);
  new Pulse(0, colorHex);
  scene.add(Pulse.pulseG);
};

export const updatePulse = (dataPoints) => {
  const avg = getAverage(dataPoints);
  Pulse.pulseG.children[0].scale.x = 20;
  Pulse.pulseG.children[0].scale.y = 20;
  Pulse.pulseG.children[0].scale.z = 20;
  Pulse.pulseG.children[0].rotation.y -= 0.01;
  // small;
  Pulse.pulseG.children[1].scale.x = avg / 30;
  Pulse.pulseG.children[1].scale.y = avg / 30;
  Pulse.pulseG.children[1].scale.z = avg / 30;
  Pulse.pulseG.children[1].rotation.y += 0.009;

  const count = 194;
  let dataP = 0;
  let round = -0.1;
  for (let i = 0; i < count; i++) {
    let ix = i * 3;
    let iy = i * 3 + 1;
    let iz = i * 3 + 2;
    if (round > 1) {
      dataP++;
      round = -0.1;
    }
    round += 0.1;

    const x = Pulse.initials[1][ix];
    let xmulti = (dataPoints[dataP] + round) / 225;
    if (xmulti < 1) {
      xmulti = 1;
    }
    const newX = x * xmulti;
    Pulse.pulseG.children[1].geometry.attributes.position.setX(i, newX);

    const y = Pulse.initials[1][iy];
    let ymulti = (dataPoints[dataP] + round) / 225;
    if (ymulti < 1) {
      ymulti = 1;
    }
    const newY = y * ymulti;
    Pulse.pulseG.children[1].geometry.attributes.position.setY(i, newY);

    const z = Pulse.initials[1][iz];
    let zmulti = (dataPoints[dataP] + round) / 225;
    if (zmulti < 1) {
      zmulti = 1;
    }
    const newZ = z * zmulti;
    Pulse.pulseG.children[1].geometry.attributes.position.setZ(i, newZ);
  }
  Pulse.pulseG.children[1].geometry.attributes.position.needsUpdate = true;
  Pulse.pulseG.children[0].geometry.attributes.position.needsUpdate = true;
};

export const updatePulseColor = (colorHex) => {
  Pulse.pulseG.children[0].material.color.set(colorHex);
  Pulse.pulseG.children[1].material.color.set(colorHex);
  Pulse.pulseG.children[0].material.needsUpdate = true;
  Pulse.pulseG.children[1].material.needsUpdate = true;
};
//_____________________________
camera.position.z = 45;
camera.position.x = 60;
camera.position.y = 10;
camera.lookAt(60, 0, 0);
const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
export function generate(shapeGenFunc, stars) {
  scene.clear();
  handleStars(stars);
  shapeGenFunc();
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
export default function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
