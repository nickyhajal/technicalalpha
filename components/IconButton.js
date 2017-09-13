import React from 'react';
import IoRss from 'react-icons/lib/io/social-rss';
import IoApple from 'react-icons/lib/io/social-apple';
import styled from 'styled-components';
import C from '../constants';

const IonIcon = {
  rss: IoRss,
  apple: IoApple,
  soundcloud: false,
};
const Button = styled.a`
  position: relative;
  display: block;

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
    span {
      position: relative;
      top: 0px;
      left: 2px;
    }
  }
`;
const IconButton = props => {
  const {
    className,
    icon,
    iconSize,
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
    <Button href={href} style={style} target="_blank" className={className}>
      {Icon ? (
        <Icon size={iconSize} color={C.color.white} />
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
  textStyle: {},
  iconSize: 20,
};
export default IconButton;
