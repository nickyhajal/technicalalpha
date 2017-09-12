import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-remarkable';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';

const Shell = styled.div`
  position: relative;
  background: ${C.color.red};
  padding: 28px 0 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;
`;
const Team = styled.div`
  position: absolute;
  background: url(/static/team.png);
  width: 348px;
  height: 152px;
  bottom: 0;
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
const About = ({ episodes, content }) => (
  <Shell>
    <Content>
      <Team />
      <Text>
        <Markdown>{content.about}</Markdown>
      </Text>
    </Content>
  </Shell>
);
export default About;
