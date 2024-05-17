import './styles.css';
import OpenSeadragon from 'openseadragon';
import { throttle } from 'underscore';
import { AudioObject } from './AudioObject';

const audioObjectsData = [
  {
    id: 1,
    src: 'goldfinch.mp3',
    xywh: [17, 167, 325, 346],
  },
  {
    id: 2,
    src: 'robin.mp3',
    xywh: [350, 173, 477, 372],
  },
  {
    id: 3,
    src: 'great-tit.mp3',
    xywh: [840, 131, 354, 343],
  },
];

const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  init();
  startButton.remove();
});


function init() {
  // Container for audio objects (refernces to audio elements and data)
  let audioObjects = [];
  
  // loop through audioObjectData and instantiate audioObjects
  audioObjectsData.forEach((audioObjectData)=>{
    audioObjects.push(new AudioObject(audioObjectData));
  });

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

      // If there is an intersection calculate the area and percentage
      if (intersectRect) {
        intersectArea = intersectRect.width * intersectRect.height;
      } else {
        intersectArea = 0;
      }

      // Calculate the percentage of the viewport that is intersecting with the audio object
      intersectPercentage = (100 / viewportImageArea) * intersectArea;
      
      // Volume expected to be between 0 and 1
      // Clamp a value between 0 and 1 using intersectPercentage
      audioObject.setVolume(Math.max(0, Math.min(intersectPercentage / 100, 1)));
    }    
  }, 200);




  viewer.addHandler('animation', (e) => {
    // Return if for some reason there are no audio objects
    if (audioObjects.length === 0) {
      return;
    }

    checkForIntersections();
  });

}
