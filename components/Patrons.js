import React from 'react';
import styled from 'styled-components';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';
import media from '../utils/media';

const patronSizes = {
  god: [1, 76],
  fb: [2, 62],
  oprah: [3, 40],
  exec: [3, 28],
};
const Shell = styled.div`
  position: relative;
  background: ${C.color.beige};
  padding: 28px 0 88px;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;
  flex-direction: column;
`;
const Heading = styled.div`
  position: relative;
  background: url(/static/producer-heading.png);
  width: 538px;
  height: 84px;
  margin: 60px auto 58px;
  background-size: 100% auto !important;
  border: 0;
  &:before,
  &:after {
    content: '';
    height: 1px;
    width: 181px;
    position: absolute;
    background: ${C.color.black};
    top: 42px;
    ${media.handheld`
      top: 19px;
      width: 50px;
    `};
  }
  &:before {
    left: -200px;
    ${media.handheld`
      left: -55px;
    `};
  }
  &:after {
    right: -213px;
    ${media.handheld`
      right: -65px;
    `};
  }
  ${media.xx`
    background: url(/static/producer-heading@2x.png);
  `};
  ${media.xxx`
    background: url(/static/producer-heading@3x.png);
  `};
  ${media.handheld`
    width: 260px;
    height: 40px;
    left: -5px;
    margin: 30px auto 28px;
  `};
`;
const Text = styled.div`
  padding: 0 0 28px 28px;
  width: 543px;
  margin-left: 364px;
  p {
    font-size: 14px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
const Name = styled.div`
  color: ${({ children }) =>
    children === 'Available' ? C.color.tan : C.color.black};
`;
const Row = styled.div`
  padding: 10px;
  font-family: bebas-neue;
  color: ${C.color.black};
  text-align: center;
  column-count: ${({ type }) => patronSizes[type][0]};
  font-size: ${({ type }) => `${patronSizes[type][1]}px`};
  margin-bottom: 16px;
  ${media.handheld`
  column-count: 1;
  `};
`;
const PatronRow = ({ type, patrons }) => {
  return (
    <Row type={type}>
      {patrons.map((patron, inx) => (
        <Name key={`${patron}-${inx}`}>{patron}</Name>
      ))}
    </Row>
  );
};
const Patrons = ({ patrons, content }) => (
  <Shell>
    <Content>
      <Heading />
      {Object.keys(patronSizes).map(key => (
        <PatronRow type={key} patrons={patrons[key]} key={key} />
      ))}
    </Content>
  </Shell>
);
export default Patrons;
