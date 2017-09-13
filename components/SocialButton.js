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
  patreon: false,
};
const Button = styled.a`
  position: relative;
  display: block;
`;
const SocialButton = props => {
  const { className, service, iconSize, href, onClick, style } = props;
  const Icon = IonIcon[service];
  return (
    <Button href={href} style={style} target="_blank">
      {Icon ? (
        <Icon size={iconSize} color={C.color.tan} />
      ) : (
        <div
          style={{
            background: `url(/static/${service}-logo.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        />
      )}
    </Button>
  );
};
SocialButton.defaultProps = {
  className: '',
  iconSize: 20,
};
export default SocialButton;
