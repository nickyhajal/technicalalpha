import React from 'react';
import styled from 'styled-components';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';

const patronSizes = {
  god: [1, 76],
  fb: [2, 62],
  oprah: [3, 36],
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
  margin: 60px auto 80px;
  background-size: 100% auto;
  border: 0;
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
`;
const PatronRow = ({ type, patrons }) => {
  console.log(patrons);
  return <Row type={type}>{patrons.map(patron => <Name>{patron}</Name>)}</Row>;
};
const Patrons = ({ patrons, content }) => (
  <Shell>
    <Content>
      <Heading />
      {Object.keys(patrons).map(key => (
        <PatronRow type={key} patrons={patrons[key]} />
      ))}
    </Content>
  </Shell>
);
export default Patrons;
