export class Mat3 {
  constructor(public elements: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {}

  static identity(): Mat3 {
    return new Mat3();
  }

  add(matrix: Mat3): Mat3 {
    return new Mat3(this.elements.map((v, i) => v + matrix.elements[i]));
  }

  multiply(matrix: Mat3): Mat3 {
    const a = this.elements;
    const b = matrix.elements;
    return new Mat3([
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ]);
  }

  transpose(): Mat3 {
    const e = this.elements;
    return new Mat3([e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]]);
  }
}
