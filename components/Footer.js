import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-remarkable';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import FeedList from './FeedList';
import SocialButton from './SocialButton';

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
  font-weight: 400;
  letter-spacing: 0.4px;
  div {
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  a {
    color: ${C.color.beige};
    text-decoration: none;
  }
  .social {
    display: flex;
    justify-content: center;
    a {
      position: relative;
      margin-right: 20px;
    }
  }
`;
const Footer = ({ episodes, content }) => {
  const { license, inquiries, contact } = content.strings;
  return (
    <Shell>
      <Content>
        <div style={{ opacity: 0.5 }}>{license}</div>
        <div>
          {inquiries} | <a href={`mailto:${contact}`}>{contact}</a>
        </div>
        <div className="social">
          <SocialButton service="twitter" href={strings.urlTwitter} />
          <SocialButton service="facebook" href={strings.urlFacebook} />
          <SocialButton
            service="google"
            href={strings.urlGoogle}
            style={{ top: '2px' }}
          />
          <SocialButton
            service="twitch"
            href={strings.urlTwitch}
            style={{ top: '3px' }}
          />
          <SocialButton
            service="youtube"
            href={strings.urlYouTube}
            style={{ top: '2px' }}
          />
          <SocialButton
            service="patreon"
            href={strings.urlPatreon}
            iconSize={18}
            style={{ top: '3px' }}
          />
        </div>
      </Content>
    </Shell>
  );
};
export default Footer;
