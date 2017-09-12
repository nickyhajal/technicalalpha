import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-remarkable';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';

const Shell = styled.div`
  position: relative;
  background: ${C.color.darkgray};
  padding: 28px 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  font-family: bebas-neue;
`;
const Footer = ({ episodes, content }) => {
  const { license, inquiries, contact } = content.strings;
  console.log(content.strings);
  return (
    <Shell>
      <Content>
        <div>{license}</div>
        <div>
          {inquiries} | <a href={`mailto:${contact}`}>{contact}</a>
        </div>
      </Content>
    </Shell>
  );
};
export default Footer;
