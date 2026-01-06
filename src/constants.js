// Destination Categories
export const DESTINATION_CATEGORIES = {
  SACRED: 'Sacred Paths',
  ARCHITECTURE: 'Architecture',
  LANDMARKS: 'Geographic Landmarks'
};

// Tours Feature
export const GUIDED_TOURS = [
  {
    id: 'stations-of-the-cross',
    name: 'Stations of the Cross',
    icon: '✝️',
    description: 'Walk the path Jesus took to his crucifixion through 14 sacred stations',
    duration: '14 stops',
    category: 'Sacred',
    stops: [
      { name: 'Station I', query: 'Via Dolorosa', description: 'Jesus is condemned to death by Pontius Pilate' },
      { name: 'Station II', query: 'Via Dolorosa', description: 'Jesus receives the cross and takes it upon his shoulders' },
      { name: 'Station III', query: 'Via Dolorosa', description: 'Jesus falls for the first time under the weight of the cross' },
      { name: 'Station IV', query: 'Via Dolorosa', description: 'Jesus meets his mother Mary along the way' },
      { name: 'Station V', query: 'Via Dolorosa', description: 'Simon of Cyrene is compelled to help Jesus carry the cross' },
      { name: 'Station VI', query: 'Via Dolorosa', description: 'Veronica wipes the face of Jesus with her veil' },
      { name: 'Station VII', query: 'Via Dolorosa', description: 'Jesus falls for the second time' },
      { name: 'Station VIII', query: 'Via Dolorosa', description: 'Jesus meets and consoles the women of Jerusalem' },
      { name: 'Station IX', query: 'Via Dolorosa', description: 'Jesus falls for the third and final time' },
      { name: 'Station X', query: 'Church of the Holy Sepulchre', description: 'Jesus is stripped of his garments at Calvary' },
      { name: 'Station XI', query: 'Church of the Holy Sepulchre', description: 'Jesus is nailed to the cross' },
      { name: 'Station XII', query: 'Church of the Holy Sepulchre', description: 'Jesus dies on the cross' },
      { name: 'Station XIII', query: 'Church of the Holy Sepulchre', description: 'Jesus is taken down from the cross' },
      { name: 'Station XIV', query: 'Church of the Holy Sepulchre', description: 'Jesus is laid in the tomb' }
    ]
  }
];

export const POPULAR_DESTINATIONS = [
  // Sacred Paths
  { name: 'Western Wall', icon: '🕍', query: 'Western Wall, Jerusalem', category: 'SACRED' },
  { name: 'Dome of the Rock', icon: '🕌', query: 'Dome of the Rock, Jerusalem', category: 'SACRED' },
  
  // Architecture
  { name: 'Colosseum', icon: '🏛️', query: 'Colosseum, Rome, Italy', category: 'ARCHITECTURE' },
  { name: 'Taj Mahal', icon: '🕌', query: 'Taj Mahal, Agra, India', category: 'ARCHITECTURE' },
  { name: 'Eiffel Tower', icon: '🗼', query: 'Eiffel Tower, Paris, France', category: 'ARCHITECTURE' },
  { name: 'Big Ben', icon: '🕰️', query: 'Big Ben, London, United Kingdom', category: 'ARCHITECTURE' },
  
  // Geographic Landmarks
  { name: 'Giza Pyramids', icon: '🔺', query: 'Pyramids of Giza, Egypt', category: 'LANDMARKS' },
  { name: 'Machu Picchu', icon: '⛰️', query: 'Machu Picchu, Peru', category: 'LANDMARKS' },
  { name: 'Grand Canyon', icon: '🏜️', query: 'Grand Canyon South Rim, Arizona, USA', category: 'LANDMARKS' },
  { name: 'Great Wall', icon: '🧱', query: 'Great Wall of China, Badaling, China', category: 'LANDMARKS' }
];
