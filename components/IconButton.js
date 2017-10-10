import React from 'react';
import IoRss from 'react-icons/lib/io/social-rss';
import IoApple from 'react-icons/lib/io/social-apple';
import IoVolHigh from 'react-icons/lib/io/volume-high';
import IoVolMedium from 'react-icons/lib/io/volume-medium';
import IoVolLow from 'react-icons/lib/io/volume-low';
import IoMute from 'react-icons/lib/io/android-volume-mute';
import IoSpeedometer from 'react-icons/lib/io/speedometer';
import IoIosDownloadOutline from 'react-icons/lib/io/code-download';
import styled from 'styled-components';
import C from '../constants';

const IonIcon = {
  rss: IoRss,
  apple: IoApple,
  soundcloud: false,
  volHigh: IoVolHigh,
  volMedium: IoVolMedium,
  volLow: IoVolLow,
  volMute: IoMute,
  speedometer: IoSpeedometer,
  downloadOutline: IoIosDownloadOutline,
};
const Button = styled.a`
  position: relative;
  display: block;
  cursor: pointer;

  &.playerButton {
    color: #fff;
    border-radius: 4px;
    font-family: bebas-neue;
    padding: 6px 10px 6px 6px;
    text-decoration: none;
    margin-right: 8px;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
    svg {
      position: relative;
      top: 0px;
      vertical-align: top !important;
    }
    span {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
`;
const IconButton = props => {
  const {
    className,
    icon,
    iconSize,
    color,
    href,
    onClick,
    style,
    textStyle,
    children,
    bg,
  } = props;
  const Icon = IonIcon[icon];
  style.background = bg;
  return (
    <Button
      href={href}
      style={style}
      target="_blank"
      className={className}
      onClick={onClick}
    >
      {Icon ? (
        <Icon size={iconSize} color={color} />
      ) : (
        <div
          style={{
            background: `url(/static/${icon}-logo.png)`,
            backgroundSize: 'contain',
            float: 'left',
            position: 'relative',
            top: '6px',
            backgroundRepeat: 'no-repeat',
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        />
      )}
      <span style={textStyle}>{children}</span>
    </Button>
  );
};
IconButton.defaultProps = {
  className: '',
  style: {},
  color: C.color.white,
  textStyle: {},
  iconSize: 20,
  onClick: () => {},
};
export default IconButton;
