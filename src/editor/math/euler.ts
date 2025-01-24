import { Quaternion } from "./quaternion";

export class Euler {
  constructor(
    public pitch: number = 0, // X축 회전
    public yaw: number = 0, // Y축 회전
    public roll: number = 0 // Z축 회전
  ) {}

  // 라디안 → 도 변환
  toDegrees(): { pitch: number; yaw: number; roll: number } {
    return {
      pitch: (this.pitch * 180) / Math.PI,
      yaw: (this.yaw * 180) / Math.PI,
      roll: (this.roll * 180) / Math.PI,
    };
  }

  // 도 → 라디안 변환
  static fromDegrees(pitch: number, yaw: number, roll: number): Euler {
    return new Euler(
      (pitch * Math.PI) / 180,
      (yaw * Math.PI) / 180,
      (roll * Math.PI) / 180
    );
  }

  // 쿼터니언으로 변환
  toQuaternion(): Quaternion {
    const cy = Math.cos(this.yaw / 2);
    const sy = Math.sin(this.yaw / 2);
    const cp = Math.cos(this.pitch / 2);
    const sp = Math.sin(this.pitch / 2);
    const cr = Math.cos(this.roll / 2);
    const sr = Math.sin(this.roll / 2);

    return new Quaternion(
      sr * cp * cy - cr * sp * sy,
      cr * sp * cy + sr * cp * sy,
      cr * cp * sy - sr * sp * cy,
      cr * cp * cy + sr * sp * sy
    ).normalize();
  }
}
