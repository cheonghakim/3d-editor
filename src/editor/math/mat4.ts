export class Mat4 {
  constructor(
    public elements: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  ) {}

  static identity(): Mat4 {
    return new Mat4();
  }

  add(matrix: Mat4): Mat4 {
    return new Mat4(this.elements.map((v, i) => v + matrix.elements[i]));
  }

  multiply(matrix: Mat4): Mat4 {
    const a = this.elements;
    const b = matrix.elements;
    const result = new Array(16);

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        result[row * 4 + col] =
          a[row * 4 + 0] * b[0 + col] +
          a[row * 4 + 1] * b[4 + col] +
          a[row * 4 + 2] * b[8 + col] +
          a[row * 4 + 3] * b[12 + col];
      }
    }

    return new Mat4(result);
  }

  transpose(): Mat4 {
    const e = this.elements;
    return new Mat4([
      e[0],
      e[4],
      e[8],
      e[12],
      e[1],
      e[5],
      e[9],
      e[13],
      e[2],
      e[6],
      e[10],
      e[14],
      e[3],
      e[7],
      e[11],
      e[15],
    ]);
  }

  static translation(x: number, y: number, z: number): Mat4 {
    return new Mat4([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  }

  static scaling(x: number, y: number, z: number): Mat4 {
    return new Mat4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  }

  static rotationX(angle: number): Mat4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Mat4([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
  }
}
