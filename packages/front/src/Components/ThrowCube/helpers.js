import objectsToThrow from './data';

const MAX_SIZE_RANDOM = 100;

export const getRandomObject = () => {
  const randomNumber = Math.floor(Math.random() * MAX_SIZE_RANDOM);
  const objectToThrow = objectsToThrow.find(
    ({ occurency }) => occurency >= randomNumber
  );

  return objectToThrow || objectsToThrow[0];
};

export const mockRandomObject = selectedObject => {
  return [...Array(10).fill(undefined), selectedObject];
};
