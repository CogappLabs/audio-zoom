import './styles.css';
import OpenSeadragon from 'openseadragon';

document.addEventListener('DOMContentLoaded', () => {

  const viewer = OpenSeadragon({
    id: 'viewer',
    tileSources: ['https://images.peck.cogapp.com/iiif/3/OP197a-Garden-birds.ptif/info.json']
  });

});
