import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";

class Bar {
  static bars = new Group();
  constructor(x, colorHex) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: colorHex,
    });
    const bar = new Mesh(geometry, material);
    bar.position.x = x;
    Bar.bars.add(bar);
  }
}

export default Bar;
