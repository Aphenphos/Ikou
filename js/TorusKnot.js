import { Group, Mesh, MeshBasicMaterial, TorusKnotGeometry } from "three";

class TorusKnot {
  static knots = new Group();
  constructor(x, scale, colorHex) {
    const geometry = new TorusKnotGeometry(scale, 3, 100, 15, 9, 9);
    const material = new MeshBasicMaterial({
      color: colorHex,
    });
    const knot = new Mesh(geometry, material);
    knot.position.x = x;
    knot.position.y = -2;
    TorusKnot.knots.add(knot);
  }
}

export default TorusKnot;
