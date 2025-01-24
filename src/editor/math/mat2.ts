export class Mat2 {
  constructor(public elements: number[] = [1, 0, 0, 1]) {}

  static identity(): Mat2 {
    return new Mat2([1, 0, 0, 1]);
  }

  add(matrix: Mat2): Mat2 {
    return new Mat2(this.elements.map((v, i) => v + matrix.elements[i]));
  }

  multiply(matrix: Mat2): Mat2 {
    const a = this.elements;
    const b = matrix.elements;
    return new Mat2([
      a[0] * b[0] + a[1] * b[2], // Row 1, Col 1
      a[0] * b[1] + a[1] * b[3], // Row 1, Col 2
      a[2] * b[0] + a[3] * b[2], // Row 2, Col 1
      a[2] * b[1] + a[3] * b[3], // Row 2, Col 2
    ]);
  }

  transpose(): Mat2 {
    const [a, b, c, d] = this.elements;
    return new Mat2([a, c, b, d]);
  }
}
