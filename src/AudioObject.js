import OpenSeadragon from "openseadragon";

/**
 * AudioObject class
 * Store data and provide methods for interacting with each audio player
 */
export class AudioObject {

  constructor(audioEl) {
    // Connect audio context to audio element and panner
    this.audioEl = audioEl;
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(audioEl);
    this.panner = this.audioCtx.createStereoPanner();
    this.panner.pan.value = -1;
    this.source.connect(this.panner);
    this.panner.connect(this.audioCtx.destination);
    
    // Extract xywh data from audio element and create rectangle
    this.extractXYWH();
    this.rectangle = new OpenSeadragon.Rect(...this.xywh);

    // Play if not playing already
    this.audioEl.play();
  }

  /**
   * Extract xywh data attribute from audio element
   */
  extractXYWH() {
    this.xywh = this.audioEl?.dataset?.xywh?.split(',').map(Number);
  }

  /**
   * Set the volume for this audio element
   * @param {number} volume number between 0 and 1
   */
  setVolume(volume) {
    this.volume = volume;
    this.audioEl.volume = volume;
  }

  /**
   * Set the pan for this audio element
   * @param {number} pan number between -1 and 1
   */
  setPan(pan) {
    this.panner.pan.value = pan;
  }

}
