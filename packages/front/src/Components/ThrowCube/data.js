const objectsToThrow = [
  {
    id: 0,
    img: require('../../assets/throwcube/feather.png').default,
    occurency: 5,
    weight: 0.2,
  },
  {
    id: 1,
    img: require('../../assets/throwcube/microwave.png').default,
    occurency: 25,
    weight: 0.5,
  },
  {
    id: 2,
    img: require('../../assets/throwcube/tv.png').default,
    occurency: 45,
    weight: 1,
  },
  {
    id: 3,
    img: require('../../assets/throwcube/speaker.png').default,
    occurency: 65,
    weight: 1.5,
  },
  {
    id: 4,
    img: require('../../assets/throwcube/lit.png').default,
    occurency: 80,
    weight: 2,
  },
  {
    id: 5,
    img: require('../../assets/throwcube/piano.png').default,
    occurency: 90,
    weight: 2.5,
  },
  {
    id: 6,
    img: require('../../assets/throwcube/fridge.png').default,
    occurency: 100,
    weight: 3,
  },
];

export default objectsToThrow;

export const initialState = [
  { id: 0, img: '', weight: 0 },
  { id: 1, img: '', weight: 0 },
  { id: 2, img: '', weight: 0 },
];
