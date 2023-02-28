import { Group, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

class Pulse {
  static pulseG = new Group();
  static initials = new Array();
  constructor(x, colorHex) {
    const geometry = new SphereGeometry(5, 13, 13);
    const material = new MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
    });
    const sphere = new Mesh(geometry, material);
    sphere.position.x = x;
    const copy = JSON.parse(JSON.stringify(geometry.attributes.position.array));
    Pulse.initials.push(copy);
    Pulse.pulseG.add(sphere);
  }
}

export default Pulse;
