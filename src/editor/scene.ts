import Camera from "./camera.ts";

export default class Scene {
  objects: any[] = [];
  lights: any[] = []; // 조명
  camera: any = null;
  constructor() {}

  add(object: any) {
    if (object instanceof Camera) {
      this.camera = object;
    } else {
      this.objects.push(object);
    }
  }

  remove(object: any) {
    const index = this.objects.indexOf(object);
    if (index !== -1) this.objects.splice(index, 1);
  }
}
