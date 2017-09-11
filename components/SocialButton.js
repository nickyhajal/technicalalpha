import React from 'react';
import IoGoogle from 'react-icons/lib/io/social-google';
import IoFacebook from 'react-icons/lib/io/social-facebook';
import IoTwitter from 'react-icons/lib/io/social-twitter';
import IoTwitch from 'react-icons/lib/io/social-twitch';
import IoYouTube from 'react-icons/lib/io/social-youtube';
import styled from 'styled-components';
import C from '../constants';

const IonIcon = {
  google: IoGoogle,
  twitter: IoTwitter,
  twitch: IoTwitch,
  facebook: IoFacebook,
  youtube: IoYouTube,
};
const Button = styled.a`
  position: relative;
  display: block;
`;
const SocialButton = props => {
  const { className, service, iconSize, href, onClick, style } = props;
  const Icon = IonIcon[service];
  return (
    <Button href={href} style={style}>
      <Icon size={iconSize} color={C.color.tan} />
    </Button>
  );
};
SocialButton.defaultProps = {
  className: '',
  iconSize: 20,
};
export default SocialButton;
