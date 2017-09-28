import { css } from 'styled-components';

export default {
  handheld: (...args) =>
    css`
      @media (max-device-width: 456px) {
        ${css(...args)};
      }
    `,
  xx: (...args) => css`@media (min-resolution: 1.25dppx) {${css(...args)};}`,
  xxx: (...args) => css`@media (min-resolution: 2.25dppx) {${css(...args)};}`,
};
