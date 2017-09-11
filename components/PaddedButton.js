// @flow

import React from 'react';
import styled from 'styled-components';
import C from '../constants';

export default styled.button`
  border: 1px solid ${C.rain};
  background: ${C.ice};
  color: ${C.storm};
  border-radius: 3px;
  padding: ${({ format }) => {
    switch (format) {
      case 'narrow': {
        return '4px 12px';
      }
      default: {
        return '8px 12px';
      }
    }
  }};
  font-size: 16px;
  font-style: italic;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    background: #fff;
  }

  span {
    position: relative;
    top: 1px;
  }
`;
