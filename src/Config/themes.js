// All custom colours used by this application
// Any changes to the colour pallette should be made here
// Note that the #rrggbbaa format can be used to control opacity
const colours = {
  black: '#111111',
  blue: '#11686C',
  blueLight: '#6AC5C7',
  blueTranslucent: '#11686C40',
  green: '#85CB33',
  grey: '#656565',
  greyMedium: '#858585',
  greyDark: '#232323',
  greyDarkAccent: '#424242',
  greyLight: '#FAF5F5',
  greyMuted: '#DFDDDD',
  orange: '#FF6600',
  orangeLight: '#F79500',
  orangeTranslucent: '#FF660040',
  red: '#91171F',
  white: '#FFFFFF',
}

// Common pallette configuration used by both themes, such as
// use of the standard orange
const commonPalette = {
  primary: {
    main: colours.orange,
    light: colours.orangeLight,
    contrastText: colours.white,
    translucent: colours.orangeTranslucent,
  },
  secondary: {
    main: colours.blue,
    light: colours.blueLight,
    translucent: colours.blueTranslucent,
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
  // Used to shift a color's luminance by approximately two indexes within its tonal palette.
  // E.g. shift from Red 500 to Red 300 or Red 700.
  tonalOffset: 0.2,
}

// Exported light theme, inherits the common palette and adds
// any light-specific palette settings
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

// Exported dark theme, inherits the common palette and adds
// any light-specific palette settings
export const dark = {
  palette: {
    mode: 'dark',
    ...commonPalette,
    text: {
      primary: colours.greyMuted,
      secondary: colours.greyMedium,
    },
    background: {
      paper: colours.black,
      default: colours.greyDark,
      line: colours.grey,
    },
  },
}