import map from 'lodash/map';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const colors = [
  'blue',
  'red',
  'yellow',
  'green',
  'gray',
  'orange',
  'purple',
  'aqua',
  'antiqueWhite',
  'aquamarine',
  'cadetBlue',
  'cornflowerblue',
  'brown',
  'darkslategrey',
  'dodgerblue',
  'goldenrod',
  'hotpink',
  'lemonchiffon',
  'magenta',
  'peachpuff',
  'teal',
];

const pickedColors = {};

export const getRandomColor = (id) => {
  if (pickedColors[id]) return pickedColors[id];
  if (colors.length === Object.keys(pickedColors).length) throw new Error('not enough colors');
  
  const getColor = () => {
    const index = getRandomInt(colors.length);
    const color = colors[index];

    return map(pickedColors, (ind, key) => key).includes(color)
      ? getColor()
      : (pickedColors[id] = color) && color;
  };

  return getColor();
};
