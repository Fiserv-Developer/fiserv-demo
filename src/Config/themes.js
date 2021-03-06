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
      faded: '#E3E3E3',
    },
    green: {
      main: '#11C118',
    },
    red: {
      main: '#FF2323',
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

export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#232323',
    },
    secondary: {
      main: '#121212',
    },
    text: {
      main: '#FDC201',
      faded: '#333333',
    },
    green: {
      main: '#23FF23',
    },
    red: {
      main: '#FF2323',
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