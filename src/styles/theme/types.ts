import { DataType, Property } from 'csstype'
import { PaletteMode } from '@mui/material'

export type ThemeType = PaletteMode

export type ThemeElementFont = Readonly<{
  fontSize: number
  fontWeight: Property.FontWeight
}>

export type ThemeFont = Readonly<{
  bold: number
  medium: number
  regular: number
  //size: Record<TextSize, string>
  title: ThemeElementFont
  subtitle: ThemeElementFont
  text: ThemeElementFont
  smallText: ThemeElementFont
}>

export type ThemeColors = Readonly<{
  background: DataType.Color
  body: DataType.Color
  title: DataType.Color
  subtitle: DataType.Color
  text: DataType.Color
  smallText: DataType.Color
  primary: DataType.Color
  secondary: DataType.Color
}>

export type CustomTheme = Readonly<{
  type: ThemeType
  colors: ThemeColors
  fonts: ThemeFont
}>

//export type CustomThemes = { readonly [key in ThemeType]: CustomThemeOptions }
