export default class Object3D {
  position: any[] = [0, 0, 0];
  rotation: any[] = [0, 0, 0]; // Euler angles
  scale: any[] = [1, 1, 1];
  children: any[] = [];

  constructor() {}

  add(child: any) {
    this.children.push(child);
  }

  remove(child: any) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
  }
}
