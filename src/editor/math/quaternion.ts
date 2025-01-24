// | **특성**           | **회전 행렬**              | **쿼터니언**             | **오일러 각도**          |
// |-------------------|------------------------|-----------------------|-----------------------|
// | **표현 방식**       | 3x3 또는 4x4 행렬         | 축과 각도(4개의 값)       | 피치, 요, 롤(3개의 각도) |
// | **효율성**         | 비교적 느림                | 매우 빠름                | 빠름                   |
// | **짐벌 락**         | 없음                     | 없음                   | 있음                   |
// | **보간(Slerp)**    | 불가능                   | 가능                   | 불가능                 |
// | **직관성**         | 낮음                     | 낮음                   | 높음                   |
// | **사용 사례**       | 3D 그래픽 변환, 물리 시뮬레이션 | 카메라 회전, 애니메이션    | UI, 제한된 회전         |

import { Euler } from "./euler";

export class Quaternion {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public w: number = 0
  ) {}

  multiply(q: Quaternion): Quaternion {
    const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
    const y = this.w * q.y + this.x * q.z + this.y * q.w - this.z * q.x;
    const z = this.w * q.z + this.y * q.w + this.y * q.x - this.z * q.w;
    const w = this.w * q.w + this.x * q.x + this.y * q.y - this.z * q.z;

    return new Quaternion(x, y, z, w);
  }

  // 정규화
  normalize(): Quaternion {
    const length = Math.sqrt(
      this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2
    );
    if (length === 0) return new Quaternion(0, 0, 0, 1);
    // 요소 / 유클리드 거리
    return new Quaternion(
      this.x / length,
      this.y / length,
      this.z / length,
      this.w / length
    );
  }

  // 벡터 회전(회전 벡터 = 정규 쿼터니언 * 벡터v 쿼터니언 * 켤레 벡터)
  rotateVector(v: { x: number; y: number; z: number }): {
    x: number;
    y: number;
    z: number;
  } {
    const qVec = new Quaternion(v.x, v.y, v.z, 0);
    const result = this.multiply(qVec).multiply(this.conjugate());
    return { x: result.x, y: result.y, z: result.z };
  }

  // 켤레 (Conjugate)
  conjugate(): Quaternion {
    return new Quaternion(-this.x, -this.y, -this.z, this.w);
  }

  // 오일러 각도로 변환
  toEuler(): Euler {
    const pitch = Math.atan2(
      2 * (this.w * this.x + this.y * this.z),
      1 - 2 * (this.x ** 2 + this.y ** 2)
    );
    const yaw = Math.asin(2 * (this.w * this.y - this.z * this.x));
    const roll = Math.atan2(
      2 * (this.w * this.z + this.x * this.y),
      1 - 2 * (this.y ** 2 + this.z ** 2)
    );
    return new Euler(pitch, yaw, roll);
  }

  // 쿼터니언 생성 (축과 각도)
  static fromAxisAngle(
    axis: { x: number; y: number; z: number },
    angle: number
  ): Quaternion {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);
    return new Quaternion(
      axis.x * s,
      axis.y * s,
      axis.z * s,
      Math.cos(halfAngle)
    ).normalize();
  }
}
