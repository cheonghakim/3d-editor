import Mesh from "./mesh.ts";
import Scene from "./scene.ts";
import Camera from "./camera.ts";
import { mat4 } from "gl-matrix";
import WebGLProgramManager from "./webGLProgramManager.ts";
import Object3D from "./object3d.ts";

export default class Renderer {
  gl: WebGLRenderingContext | null = null;
  constructor(canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!this.gl) throw new Error("WebGL not supported");
  }

  render(scene: Scene, camera: Camera) {
    const gl = this.gl;

    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      scene.objects.forEach((object: any) => {
        if (object instanceof Mesh) {
          this.drawMesh(object, camera);
        }
      });
    }
  }

  drawMesh(mesh: Mesh, camera: Camera) {
    const gl = this.gl;

    if (gl) {
      // 기하학 및 재질 데이터를 설정
      this.setupGeometry(mesh.geometry);
      this.setupMaterial(mesh.material);

      // 셰이더에 행렬 전달
      const modelMatrix = this.computeModelMatrix(mesh);
      const viewProjectionMatrix = mat4.create();
      mat4.multiply(
        viewProjectionMatrix,
        camera.projectionMatrix,
        camera.viewMatrix
      );

      const mvpMatrix = mat4.create();
      mat4.multiply(mvpMatrix, viewProjectionMatrix, modelMatrix);

      const uMVP = gl.getUniformLocation(mesh.material.program, "uMVP");
      if (!uMVP)
        throw new Error("Uniform 'uMVP' not found in the shader program");

      gl.uniformMatrix4fv(uMVP, false, mvpMatrix);

      // 드로우 호출
      gl.drawElements(
        gl.TRIANGLES,
        mesh.geometry.indexCount,
        gl.UNSIGNED_SHORT,
        0
      );
    }
  }

  setupGeometry(geometry: any) {
    const gl = this.gl;
    if (!gl) throw new Error("WebGL context is not available");
    if (!geometry) throw new Error("Geometry is not defined");

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) throw new Error("Failed to create vertex buffer");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(geometry.vertices),
      gl.STATIC_DRAW
    );

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) throw new Error("Failed to create index buffer");
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(geometry.indices),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(
      geometry.program,
      "aPosition"
    );
    if (positionLocation === -1) {
      throw new Error("Attribute 'aPosition' not found in shader program");
    }

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  }

  setupMaterial(material: any) {
    const gl = this.gl;
    if (!gl) throw new Error("WebGL context is not available");
    if (!material) throw new Error("Material is not defined");

    const programManager = WebGLProgramManager.getInstance(gl);
    const program = programManager.createProgram(
      material.vertexShader,
      material.fragmentShader
    );

    // 쉐이더 프로그램 셋업
    gl.useProgram(program);

    if (material.uniforms) {
      Object.entries(material.uniforms).forEach(([name, value]) => {
        const location = gl.getUniformLocation(program, name);
        if (location === null)
          throw new Error(`Uniform ${name} not found in shader program`);

        if (typeof value === "number") {
          gl.uniform1f(location, value); // float
        } else if (value instanceof Float32Array) {
          if (value.length === 4) gl.uniform4fv(location, value); // vec4
          else if (value.length === 3) gl.uniform3fv(location, value); // vec3
        } else if (value instanceof WebGLTexture) {
          gl.activeTexture(gl.TEXTURE0); // 텍스처 유닛 활성화
          gl.bindTexture(gl.TEXTURE_2D, value);
          gl.uniform1i(location, 0); // 텍스처 유닛 0 사용
        }
      });
    }

    // 재질의 WebGL 프로그램을 저장
    material.program = program;
  }

  computeModelMatrix(object: Object3D) {
    const modelMatrix = mat4.create();
    mat4.translate(modelMatrix, modelMatrix, object.position);
    mat4.rotateX(modelMatrix, modelMatrix, object.rotation[0]);
    mat4.rotateY(modelMatrix, modelMatrix, object.rotation[1]);
    mat4.rotateZ(modelMatrix, modelMatrix, object.rotation[2]);
    mat4.scale(modelMatrix, modelMatrix, object.scale);
    return modelMatrix;
  }
}
