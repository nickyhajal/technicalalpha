// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';
import cx from 'classnames';
import C from '../constants';

type SpinnerProps = {
  loading: boolean,
  className: string,
};

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.3);
  } 50% { 
    transform: scale(1.0);
  }
`;

const SpinnerShell = styled.div`
  margin: 0 auto;

  .pdrpSpinner {
    width: 12px;
    height: 12px;

    position: relative;
    margin: 6px auto 0;
    transition: opacity 200ms;

    opacity: 0;

    &.pdrpLoading {
      opacity: 1;

      .double-bounce1,
      .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: ${C.lake};
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        animation: ${bounce} 2.5s infinite ease-in-out;
      }

      .double-bounce2 {
        animation-delay: -1s;
      }
    }
  }
`;

const Spinner = ({ loading, className }: SpinnerProps) => {
  const spinnerClass = cx('pdrpSpinner', loading ? 'pdrpLoading' : '');
  return (
    <SpinnerShell className={className}>
      <div className={spinnerClass}>
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </SpinnerShell>
  );
};

export default Spinner;
