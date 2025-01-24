import { type ICamera } from "./types/editor";
import { mat4, type ReadonlyVec3 } from "gl-matrix";

export default class Camera implements ICamera {
  position: ReadonlyVec3 = [0, 0, 5];
  target: ReadonlyVec3 = [0, 0, 0];
  up: ReadonlyVec3 = [0, 1, 0];
  fov: number;
  aspect: number;
  near: number;
  far: number;
  projectionMatrix: any = mat4.create();
  viewMatrix: any;
  constructor(fov: number, aspect: number, near: number, far: number) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.updateProjectionMatrix();
    this.updateViewMatrix();
  }

  updateProjectionMatrix() {
    mat4.perspective(
      this.projectionMatrix,
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
  }

  updateViewMatrix() {
    mat4.lookAt(this.viewMatrix, this.position, this.target, this.up);
  }
}
