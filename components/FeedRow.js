import React from 'react';
import styled from 'styled-components';
import { truncate } from 'lodash';
import C from '../constants';
import Container from './Container';
import FeedList from './FeedList';

const Shell = styled.div`
  padding: 18px 15px;
  width: 100%;
  min-height: 95px;
  cursor: pointer;
  background: ${({ selected }) =>
    selected ? `${C.color.gray} !important` : C.color.tan};
  color: ${({ selected }) =>
    selected ? `${C.color.beige} !important` : C.color.black};
  &:nth-of-type(2n) {
    background: ${C.color.beige};
  }
`;
const Title = styled.h2`
  font-size: 18px;
  font-family: bebas-neue;
  font-weight: 400;
  margin: 0 0 5px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 3px;
`;
const Descr = styled.h4`
  font-size: 12px;
  font-weight: 100;
  margin: 0;
`;
const FeedRow = ({ ep, selected, onClick, isMobile }) => {
  const { title, contentSnippet, summary } = ep;
  return (
    <Shell selected={selected} onClick={onClick}>
      <Title>{title}</Title>
      <Descr>
        {truncate(contentSnippet, {
          length: isMobile ? 100 : 170,
          omission: '...',
        })}
      </Descr>
    </Shell>
  );
};
export default FeedRow;
