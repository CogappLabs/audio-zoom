import OpenSeadragon from "openseadragon";

/**
 * AudioObject class
 * Store data and provide methods for interacting with each audio player
 */
export class AudioObject {

  constructor(audioEl) {
    this.audioEl = audioEl;
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(audioEl);
    this.panner = this.audioCtx.createStereoPanner();
    this.panner.pan.value = -1;
    this.source.connect(this.panner);
    this.panner.connect(this.audioCtx.destination);
    this.extractXYWH();
    this.rectangle = new OpenSeadragon.Rect(...this.xywh);
    this.audioEl.play();
  }

  extractXYWH() {
    this.xywh = this.audioEl?.dataset?.xywh?.split(',').map(Number);
  }

  setVolume(volume) {
    this.volume = volume;
    this.audioEl.volume = volume;
  }

  setPan(pan) {
    this.panner.pan.value = pan;
  }

}
