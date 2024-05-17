import './styles.css';
import OpenSeadragon from 'openseadragon';
import { throttle } from 'underscore';
import { AudioObject } from './AudioObject';

const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  document.querySelector('audio').play();
  init();
  startButton.remove();
});


function init() {
  // Container for audio objects (refernces to audio elements and data)
  let audioObjects = [];
  
  // Window object for debugging in console
  window.OpenSeadragon = OpenSeadragon;

  window.viewer = OpenSeadragon({
    id: 'viewer',
    tileSources: ['https://images.peck.cogapp.com/iiif/3/OP197a-Garden-birds.ptif/info.json'],
    maxZoomLevel: 10,
    showZoomControl: false,
    showHomeControl: false,
    showFullPageControl: false,
    showRotationControl: false,
  });


  // Get all audio elements and create AudioObject instances
  document.querySelectorAll('audio').forEach((audioEl) => {
    audioObjects.push(new AudioObject(audioEl));
  });

  // // Return if for some reason there are no audio objects
  if (audioObjects.length === 0) {
    return;
  }

  const checkForIntersections = throttle(()=> {
    // Get the viewport as an image coordinate rectangle)
    const viewportImageRect = viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds());
    // Area of the above rectangle
    const viewportImageArea = viewportImageRect.width * viewportImageRect.height;
    
    // Loop over each audio object and check for intersection with the viewport
    for (const audioObject of audioObjects) {
      // audioObject.audioEl.play();

      // Create new rect for the intersection of the audio object and the viewport
      const intersectRect = audioObject.rectangle.intersection(viewportImageRect);
      let intersectArea;
      let intersectPercentage;
      let panScale;

      // If there is an intersection calculate the area of viewport occupied and center offset.
      if (intersectRect) {
        intersectArea = intersectRect.width * intersectRect.height;

        // Find the center of the intersection rectangle relative to the viewport image rectangle edge.
        let intersectCenter = (intersectRect.x + (intersectRect.width/2)) - viewportImageRect.x
        // Convert to a value between -1 and 1
        panScale = ((2/viewportImageRect.width) * intersectCenter) -1
      } else {
        intersectArea = 0;
        panScale = 0;
      }


      // Calculate the percentage of the viewport that is intersecting with the audio object
      intersectPercentage = (100 / viewportImageArea) * intersectArea;
      
      // Volume expected to be between 0 and 1
      // Clamp a value between 0 and 1 using intersectPercentage
      audioObject.setVolume(Math.max(0, Math.min(intersectPercentage / 100, 1)));

      // Set stereo panning between -1 and 1
      audioObject.setPan(panScale);
    }    
  }, 200);



  viewer.addHandler('open', checkForIntersections);
  viewer.addHandler('animation', checkForIntersections);

}
