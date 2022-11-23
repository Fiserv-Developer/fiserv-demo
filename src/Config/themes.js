export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#FBFAFA',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      main: '#232323',
      faded: '#C3C3C3',
    },
    menu: {
      main: '#111111',
    },
    green: {
      main: '#005989',
    },
    red: {
      main: '#91171F',
    },
    orange: {
      main: '#FF6600',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    zIndex:{
      drawer: 'red'
    }
  },
}

export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#232323',
    },
    secondary: {
      main: '#111111',
    },
    text: {
      main: '#DDDDDD',
      faded: '#333333',
    },
    menu: {
      main: '#111111',
    },
    green: {
      main: '#005989',
    },
    red: {
      main: '#91171F',
    },
    orange: {
      main: '#FF6600',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    zIndex:{
        drawer:'red'
    }
  },
}