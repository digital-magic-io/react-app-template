export const commonColors = {
  white: '#fff',
  black: '#000',
  grey100: '#fafafa',
  grey200: '#f4f4f4',
  grey300: '#f3f3f3',
  grey400: '#e6e6e6',
  grey500: '#dddddd',
  grey600: '#cecece',
  grey700: '#b5b5b5',
  grey800: '#333',
  grey900: '#222',
  error: '#de1d1d',
  success: '#34b32b'
} as const

export type CommonColor = typeof commonColors
