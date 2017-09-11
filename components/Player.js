import React from 'react';
import styled from 'styled-components';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';

const Shell = styled.div`
  background: ${C.color.black};
  padding: 32px 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;
`;
const Logo = styled.div`
  position: relative;
  background: url(/static/logo.png);
  width: 348px;
  height: 400px;
  background-size: 100% auto;
  border: 0;
  &:before,
  &:after {
    content: '';
    height: 1px;
    width: 70px;
    position: absolute;
    top: 12px;
  }
`;
const Player = ({ episodes }) => (
  <Shell>
    <Content>
      <Logo />
      <FeedList episodes={episodes} />
    </Content>
  </Shell>
);
export default Player;
