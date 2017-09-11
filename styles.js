import { injectGlobal } from 'styled-components';
import C from './constants';

/* eslint-disable */

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: open-sans, sans-serif;
    color: ${C.color.black};
  }
  * {
    box-sizing: border-box;
  }
  textarea, input, button { outline: none; }
`;
