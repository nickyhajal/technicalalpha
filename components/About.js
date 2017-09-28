import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-remarkable';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';
import media from '../utils/media';

const Shell = styled.div`
  position: relative;
  background: ${C.color.red};
  padding: 28px 0 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;

  ${media.handheld`
    flex-direction: column-reverse;
  `};
`;
const Team = styled.div`
  position: absolute;
  background: url(/static/team.png);
  width: 366px;
  height: 158px;
  bottom: 0;
  background-size: 100% auto !important;
  border: 0;
  ${media.xx`
    background: url(/static/team@2x.png);
  `} ${media.xxx`
    background: url(/static/team@3x.png);
  `} ${media.handheld`
  position: relative;
  margin: 0 auto;
  width: 310px;
  height: 134px;
  `};
`;
const Text = styled.div`
  padding: 0 0 28px 28px;
  width: 543px;
  margin-left: 364px;
  p {
    font-size: 12px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  ${media.handheld`
    width: 100%;
    margin-left: 0;
    padding: 0px 28px 40px 28px;
  `};
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
