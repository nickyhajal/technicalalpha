import React from 'react';
import styled from 'styled-components';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';

const Shell = styled.div`
  background: ${C.color.red};
  padding: 32px 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;
`;
const Team = styled.div`
  position: relative;
  background: url(/static/team.png);
  width: 348px;
  height: 152px;
  background-size: 100% auto;
  border: 0;
`;
const Text = styled.div``;

const Player = ({ episodes }) => (
  <Shell>
    <Content>
      <Logo />
      <Text />
    </Content>
  </Shell>
);
export default Player;
