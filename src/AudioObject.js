import OpenSeadragon from "openseadragon";

/**
 * AudioObject class
 * Store data and provide methods for interacting with each audio player
 */
export class AudioObject {

  constructor(data) {
    this.id = data.id;
    this.src = data.src;
    this.xywh = data.xywh;
    this.audio = new Audio(this.src);
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    this.panner = this.audioCtx.createStereoPanner({pan: 0});
    this.source.connect(this.panner);
    this.panner.connect(this.audioCtx.destination);
    this.rectangle = new OpenSeadragon.Rect(...this.xywh);
    this.audio.volume = 0;
    this.audio.loop = true;
    this.audio.play();
  }

  extractXYWH() {
    this.xywh = this.audioEl?.dataset?.xywh?.split(',').map(Number);
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }
  // TODO: method for panning audio to left/right channels


}
