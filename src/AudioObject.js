import OpenSeadragon from "openseadragon";

/**
 * AudioObject class
 * Store data and provide methods for interacting with each audio player
 */
export class AudioObject {

  constructor(audioEl) {
    this.audioEl = audioEl;
    this.extractXYWH();
    this.rectangle = new OpenSeadragon.Rect(...this.xywh);
  }

  extractXYWH() {
    this.xywh = this.audioEl?.dataset?.xywh?.split(',').map(Number);
  }

  setVolume(volume) {
    this.volume = volume;
    this.audioEl.volume = volume;
  }
  // TODO: method for panning audio to left/right channels


}
