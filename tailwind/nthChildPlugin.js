const plugin = require('tailwindcss/plugin');

module.exports = {
  nthChildPlugin: plugin(({ matchVariant }) => {
    const modifier = (value) => `&:nth-child(${value})`;
    const values = {
      values: {
        DEFAULT: 'n',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '2n': '2n',
        '3n': '3n',
        '4n': '4n',
        '5n': '5n',
        '6n': '6n',
      },
    };

    matchVariant('nth', modifier, values);
  }),
};
