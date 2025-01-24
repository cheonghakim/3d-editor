import type { ReadonlyVec3 } from "gl-matrix";

export interface IObject3D {
  position: ReadonlyVec3;
  rotation: ReadonlyVec3;
  scale: ReadonlyVec3; // 오일러 각
  children: any[];

  add(child: any): any;
  remove(child: any): any;
}

export interface ICamera {
  position: ReadonlyVec3;
  target: ReadonlyVec3;
  up: ReadonlyVec3;
  fov: number;
  aspect: number;
  near: number;
  far: number;
  projectionMatrix: ReadonlyVec3;
  viewMatrix: ReadonlyVec3;
}

export interface IScene {
  objects: any[];
  lights: any[]; // 조명
  camera: any;

  add(object: IObject3D): any;
  remove(object: IObject3D): any;
}

export interface IMesh extends IObject3D {
  geometry: any;
  material: any;
}
