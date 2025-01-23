export default class WebGLProgramManager {
  private static instance: WebGLProgramManager | null = null;
  private gl: WebGLRenderingContext;
  private shaderCache: Map<string, WebGLShader>;

  private constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.shaderCache = new Map();
  }

  static getInstance(gl: WebGLRenderingContext): WebGLProgramManager {
    if (!WebGLProgramManager.instance) {
      WebGLProgramManager.instance = new WebGLProgramManager(gl);
    }

    return WebGLProgramManager.instance;
  }

  private compileShader(type: number, source: string): WebGLShader {
    const cachedShader = this.shaderCache.get(source);
    if (cachedShader) return cachedShader;

    const shader = this.gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw new Error(
        `Shader compilation error (${
          type === this.gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT"
        }): ${error}`
      );
    }

    this.shaderCache.set(source, shader);

    return shader;
  }

  createProgram(
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): WebGLProgram {
    const vertexShader = this.compileShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.compileShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const program = this.gl.createProgram();
    if (!program) throw new Error("Failed to create WebGL program");

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(program);
      this.gl.deleteProgram(program);
      throw new Error(`Program linking error: ${error}`);
    }

    return program;
  }

  deleteShader(shader: WebGLShader): void {
    if (this.gl && shader) {
      this.gl.deleteShader(shader);
      this.shaderCache.forEach((cachedShader, source) => {
        if (cachedShader === shader) {
          this.shaderCache.delete(source);
        }
      });
    }
  }

  deleteProgram(program: WebGLProgram): void {
    if (this.gl && program) {
      this.gl.deleteProgram(program);
    }
  }
}

// const canvas = document.createElement("canvas");
// const gl = canvas.getContext("webgl");

// if (!gl) throw new Error("WebGL is not supported");
// const programManager = WebGLProgramManager.getInstance(gl);
// // GLSL 셰이더 소스
// const vertexShaderSource = `
//     attribute vec4 aPosition;
//     void main() {
//         gl_Position = aPosition;
//     }
// `;

// const fragmentShaderSource = `
//     precision mediump float;
//     uniform vec4 uColor;
//     void main() {
//         gl_FragColor = uColor;
//     }
// `;

// // WebGL 프로그램 생성
// const program = programManager.createProgram(vertexShaderSource, fragmentShaderSource);
// gl.useProgram(program);
