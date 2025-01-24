import { type IMesh } from "./types/editor";
import Object3D from "./object3d";

export default class Mesh extends Object3D implements IMesh {
  geometry: any;
  material: any;
  constructor(geometry: any, material: any) {
    super();
    this.geometry = geometry; // 버텍스 및 인덱스 정보
    this.material = material; // 셰이더 및 텍스처 정보
  }
}
