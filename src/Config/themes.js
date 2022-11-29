export const colours = {
  black: '#111111',
  blue: '#11686C',
  blueLight: '#6AC5C7',
  green: '#85CB33',
  grey: '#656565',
  greyDark: '#232323',
  greyDarkAccent: '#424242',
  greyLight: '#FBFAFA',
  greyMuted: '#DFDDDD',
  orange: '#FF6600',
  orangeLight: '#F79500',
  red: '#91171F',
  white: '#FFFFFF',
}

export const commonPalette = {
  primary: {
    main: colours.orange,
    light: colours.orangeLight,
    contrastText: colours.white,
  },
  secondary: {
    main: colours.blue,
    light: colours.blueLight,
  },
  tertiary: {
    main: colours.green,
  },
  menu: {
    background: colours.black,
    text: colours.white,
    line: colours.greyDarkAccent,
  },
  // Used by `getContrastText()` to maximize the contrast between
  // the background and the text.
  contrastThreshold: 3,
  // Used by the functions below to shift a color's luminance by approximately
  // two indexes within its tonal palette.
  // E.g., shift from Red 500 to Red 300 or Red 700.
  tonalOffset: 0.2,
}

export const light = {
  palette: {
    mode: 'light',
    ...commonPalette,
    text: {
      primary: colours.greyDark,
      secondary: colours.grey,
    },
    background: {
      paper: colours.white,
      default: colours.greyLight,
      line: colours.grey,
    },
  },
}

export const dark = {
  palette: {
    mode: 'dark',
    ...commonPalette,
    text: {
      primary: colours.greyMuted,
      secondary: colours.grey,
    },
    background: {
      paper: colours.black,
      default: colours.greyDark,
      line: colours.grey,
    },
  },
}