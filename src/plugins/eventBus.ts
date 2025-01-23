import { nextTick } from "vue";
import { Subject, Subscription } from "rxjs";

class EventBus {
  listeners$: { [name: string]: Subject<any> };
  subscriptions: { [name: string]: Subscription };

  constructor() {
    this.listeners$ = {};
    this.subscriptions = {};
  }

  $on(name: string, callback: any) {
    this.listeners$[name] = this.listeners$[name] || new Subject();
    this.subscriptions[name] = this.listeners$[name].subscribe(callback);
  }

  $emit(name: string, data: any) {
    nextTick(() => {
      if (!this.listeners$[name]) {
        console.error(`Cannot find "${name}" in listeners$, data: ${data}`);
        return;
      }

      this.listeners$[name].next(data);
    });
  }

  $off(name: string) {
    if (this.subscriptions[name]) {
      this.subscriptions[name].unsubscribe();
      delete this.subscriptions[name];
      delete this.listeners$[name];
    }
  }
}

export default new EventBus();
