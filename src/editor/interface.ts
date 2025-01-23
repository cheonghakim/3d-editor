import type { ReadonlyVec3 } from "gl-matrix";

export interface Camera {
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

export interface Scene {
  objects: any[];
  lights: any[]; // 조명
  camera: any;

  add(object: Object3D): any;
  remove(object: Object3D): any;
}

export interface Object3D {
  position: ReadonlyVec3;
  rotation: ReadonlyVec3; // Euler angles
  scale: ReadonlyVec3;
  children: ReadonlyVec3;

  add(child: any): any;
  remove(child: any): any;
}

export interface Mesh extends Object3D {
  geometry: any;
  material: any;
}
