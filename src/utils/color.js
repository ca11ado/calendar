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

const pickedColors = [];

export const getRandomColor = () => {
  if (colors.length === pickedColors.length) throw new Error('not enough colors');
  
  const getColor = () => {
    const index = getRandomInt(colors.length);
    const color = colors[index];

    return pickedColors.includes(color)
      ? getColor()
      : pickedColors.push(color) && color;
  };

  return getColor();
};
