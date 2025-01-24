import { type IObject3D } from "./types/editor";
import { type ReadonlyVec3 } from "gl-matrix";

export default class Object3D implements IObject3D {
  position: ReadonlyVec3 = [0, 0, 0];
  rotation: ReadonlyVec3 = [0, 0, 0]; // 오일러 각
  scale: ReadonlyVec3 = [1, 1, 1];
  children: any[] = [];

  constructor() {}

  add(child: any) {
    this.children.push(child);
  }

  remove(child: any) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
  }
}
