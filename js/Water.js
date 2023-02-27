import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

class Water {
  static water = new Group();
  constructor(colorHex, y) {
    const geometry = new PlaneGeometry(150, 200, 8, 8);
    const material = new MeshBasicMaterial({
      wireframe: true,
      color: colorHex,
    });
    const water = new Mesh(geometry, material);
    water.position.x = 60;
    water.rotation.x = 1.57;
    water.position.y = y;
    water.position.z = -17;

    Water.water.add(water);
  }
}
export default Water;
