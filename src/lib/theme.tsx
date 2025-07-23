import { Theme } from 'theme-ui'

const theme: Theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
  },
  styles: {
    root: {
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    h1: {
      color: 'primary',
      fontSize: 5,
    },
    p: {
      fontSize: 2,
      marginBottom: 3,
    },
    pre: {
      variant: 'prism.pre',
      bg: 'muted',
      padding: 3,
      borderRadius: 4,
      overflowX: 'auto',
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
    },
  },
}

export default theme
