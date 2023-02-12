import { css } from 'styled-components'
// TODO: Remove library if material function suits here
//import alpha from 'color-alpha'
import { alpha } from '@mui/material/styles'

export const mixins = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexCenterV: css`
    display: flex;
    align-items: center;
  `,
  flexCenterH: css`
    display: flex;
    justify-content: center;
  `,
  flexColumnSpaceBetween: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  flexRowSpaceBetween: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  opacity: alpha,
  engulfAbsolute: css`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  `,
  square: (size: string) => css`
    width: ${size};
    height: ${size};
  `,
  circle: (size: string) => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
  `,
  shadowBorder: (color: string, width = 1) => css`
    box-shadow: 0 0 0 ${width}px ${color};
  `,
  dashedBorder: (color: string, dashLength: number, dashWidth: number) => css`
    background-image: linear-gradient(to right, ${color} 50%, transparent 0%),
      linear-gradient(${color} 50%, transparent 0%), linear-gradient(to right, ${color} 50%, transparent 0%),
      linear-gradient(${color} 50%, transparent 0%);
    background-position: bottom, left, top, right;
    background-size: ${dashLength}px ${dashWidth}px, ${dashWidth}px ${dashLength}px, ${dashLength}px ${dashWidth}px,
      ${dashWidth}px ${dashLength}px;
    background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
  `,
  hideScrollbar: css`
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 11 */

    &::-webkit-scrollbar {
      display: none; /* Chrome */
    }
  `
}

export type ThemeMixins = typeof mixins
