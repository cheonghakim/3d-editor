import { BehaviorSubject, type Subscription, take } from "rxjs";

export class AudioPlayer {
  audioAuth: boolean = false;
  audioList: HTMLAudioElement[] = [];
  player$: HTMLAudioElement | null = null;
  controller$: BehaviorSubject<boolean> | null = new BehaviorSubject(false);
  timer: any = null;
  isNowPlaying: boolean = false;
  subscription: Subscription | null | undefined = null;
  constructor() {}

  _unsubscribeAll() {
    this._unsubscribeController();
    if (this.controller$) {
      this.controller$.unsubscribe();
      this.controller$ = null;
    }
  }
  _unsubscribeController() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
  async getAudioAuth() {
    try {
      const { active } = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.audioAuth = active;
    } catch (error) {
      this.audioAuth = false;
    }
  }
  // public addAudio() -> setAndPlay()
  addAudio(targetSrc: string) {
    const audio = new Audio(targetSrc);
    this.audioList.push(audio);
  }

  // public addAudio() -> setAndPlay()
  setAndPlay() {
    this._readyAudio(); // 오디오가 끝나면 다음 오디오 준비
    if (this.player$) {
      this.controller$?.next(false);
      this._pendingAndPlay();
    } else {
      this.isNowPlaying = false;
    }
  }

  clearAudio() {
    clearInterval(this.timer);
    this._unsubscribeAll();
    this._clearPlayer();
    this.audioList.forEach((item) => {
      item.src = "";
      item?.load();
    });

    // this.$reset();
  }

  _readyAudio() {
    this._clearPlayer();
    const audio = this.audioList.shift();
    if (audio) {
      this.player$ = audio;
      this.player$.addEventListener("ended", this.setAndPlay.bind(this));
    } else {
      this.isNowPlaying = false;
    }
  }

  _clearPlayer() {
    if (this.player$) {
      this.player$.pause();
      this.player$.removeEventListener("ended", this.setAndPlay.bind(this));
      this.player$.src = "";
      this.player$.load();
      this.player$ = null;
    }
  }

  _pendingAndPlay() {
    this._unsubscribeController();
    this.controller$?.pipe(take(1)).subscribe((isPlaying) => {
      if (isPlaying) {
        this.subscription = this.controller$?.subscribe({
          next: (playing) => {
            if (!playing) {
              this._startPlayback();
            }
          },
        });
      } else {
        this._startPlayback();
      }
    });
  }

  async _startPlayback() {
    try {
      this._unsubscribeController();
      if (!this.audioAuth) await this.getAudioAuth();

      if (this.player$ && !this.isNowPlaying) {
        this.isNowPlaying = true;

        // 메타데이터가 로드될 때까지 대기
        if (this.player$.readyState < 2) {
          await new Promise((resolve) => {
            this.player$?.addEventListener("loadedmetadata", resolve, {
              once: true,
            });
          });
        }

        this.player$.play();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
