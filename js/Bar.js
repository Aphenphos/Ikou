import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";

const material = new MeshBasicMaterial({
  color: "purple",
});
class Bar {
  static bars = new Group();
  constructor(x) {
    const geometry = new BoxGeometry(1, 1, 1);
    const bar = new Mesh(geometry, material);
    bar.position.x = x;
    Bar.bars.add(bar);
  }
}

export default Bar;
