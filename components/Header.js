import React from 'react';
import styled from 'styled-components';
import C from '../constants';
import strings from '../content/strings';
import Container from './Container';
import SocialButton from './SocialButton';

const Shell = styled.div`
  background: ${C.color.darkgray};
  height: 60px;
  padding: 7px;
  width: 100%;
`;
const Logo = styled.button`
  position: relative;
  background: url(/static/word-logo.png);
  width: 190px;
  height: 35px;
  background-size: 100% auto;
  margin-top: 8px;
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
const Content = styled(Container)`
  color: ${C.color.beige};
  h3 {
    font-family: bebas-neue, sans-serif;
    font-weight: 400;
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 2px;
    letter-spacing: 0.8px;
  }
  .controls {
    float: right;
    text-align: center;
    width: 348px;
    .row {
      display: flex;
      margin-top: 4px;
      a {
        top: 3px;
        margin-right: 18px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
`;
const LiveIndicator = styled.div`
  padding: 6px;
  background: ${C.color.black};
  border-radius: 6px;
  font-weight: 100;
  font-family: bebas-neue;
  width: 130px;
  font-size: 15px;
  text-align: center;
  position: relative;
  text-indent: 12px;
  cursor: pointer;
  margin-right: 18px;
  color: ${({ live }) => (live ? C.color.tan : C.color.tan)};
  &:after {
    content: '';
    width: 15px;
    height: 15px;
    background: ${C.color.red};
    opacity: ${({ live }) => (live ? '1' : '0.4')};
    border-radius: 50%;
    position: absolute;
    left: 8px;
    top: 7px;
  }
`;
const Header = ({ live }) => (
  <Shell>
    <Content>
      <Logo />
      <div className="controls">
        <h3>{strings.podcastTime}</h3>
        <div className="row">
          <SocialButton service="twitter" href={strings.urlTwitter} />
          <SocialButton service="facebook" href={strings.urlFacebook} />
          <SocialButton
            service="google"
            href={strings.urlGoogle}
            style={{ top: '4px' }}
          />
          <LiveIndicator live={live}>
            {strings[live ? 'onair' : 'offair']}
          </LiveIndicator>
          <SocialButton
            service="twitch"
            href={strings.urlTwitch}
            style={{ top: '2px' }}
          />
          <SocialButton
            service="youtube"
            href={strings.urlYouTube}
            style={{ top: '0px' }}
          />
        </div>
      </div>
    </Content>
  </Shell>
);
Header.defaultProps = {
  live: false,
};
export default Header;
