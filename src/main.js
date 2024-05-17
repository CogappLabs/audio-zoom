import './styles.css';
import OpenSeadragon from 'openseadragon';
import { AudioObject } from './AudioObject';

document.addEventListener('DOMContentLoaded', () => {
  // Container for audio objects (refernces to audio elements and data)
  let audioObjects = [];

  // Window object for debugging in console
  window.OpenSeadragon = OpenSeadragon;

  window.viewer = OpenSeadragon({
    id: 'viewer',
    tileSources: ['https://images.peck.cogapp.com/iiif/3/OP197a-Garden-birds.ptif/info.json'],
    maxZoomLevel: 10,
  });

  // Temp for now work with first audio object
  window.audioObject1 = new AudioObject(document.getElementById('1'));
  audioObject1.audioEl.play();
  audioObject1.setVolume(0);

  // TODO: Loop over each audio element and create an AudioObject


  viewer.addHandler('animation-finish', (e) => {
    const viewportImageRect = viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds());
    let viewportImageArea = viewportImageRect.width * viewportImageRect.height;
    let intersectRect = audioObject1.rectangle.intersection(viewportImageRect);
    let intersectArea;

    console.log(e);
    // Return if for some reason there are no audio objects
    // if (audioObjects.length === 0) {
    //   return;
    // }
    // Check for intersection with audio objects here
    
    
    if (intersectRect) {
      console.log(intersectRect);
      console.log(viewportImageArea);
      intersectArea = intersectRect.width * intersectRect.height;
    } else {
      intersectArea = 0;
      console.log('Audio object is out of view');
    }
    let intersectPercentage = (100 / viewportImageArea) * intersectArea;
    console.log('intersectPercentage:', intersectPercentage);
    console.log('intersectArea:', intersectArea);
    audioObject1.setVolume(intersectPercentage / 100);

  });



});
