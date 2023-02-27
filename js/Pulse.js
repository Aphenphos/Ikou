import { Group, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

class Pulse {
  static pulseG = new Group();
  static initials = new Array();
  constructor(x, colorHex) {
    const geometry = new SphereGeometry(5, 8, 8);
    const material = new MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
    });
    const sphere = new Mesh(geometry, material);
    sphere.position.x = x;
    Pulse.initials.push(sphere.geometry.attributes.position.array);
    Pulse.pulseG.add(sphere);
  }
}

export default Pulse;
