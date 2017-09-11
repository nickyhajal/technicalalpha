import React from 'react';
import IoIosHeart from 'react-icons/lib/io/ios-heart';
import IoIosHeartOutline from 'react-icons/lib/io/ios-heart-outline';
import IoIosArrowBack from 'react-icons/lib/io/ios-arrow-back';
import IoIosPlay from 'react-icons/lib/io/ios-play';
import IoLogOut from 'react-icons/lib/io/log-out';
import IoIosCloudDownloadOutline from 'react-icons/lib/io/ios-cloud-download-outline';
import IoIosCloudDownload from 'react-icons/lib/io/ios-cloud-download';
import cx from 'classnames';
import styled from 'styled-components';
import PaddedButton from './PaddedButton';
import C from '../constants';
import Spinner from './Spinner';

const IonIcon = {
  IoIosHeart,
  IoIosHeartOutline,
  IoIosArrowBack,
  IoIosCloudDownloadOutline,
  IoIosCloudDownload,
  IoLogOut,
  IoIosPlay,
};
type IconButtonProps = {
  className: string,
  icon: string,
  children: string,
  format?: string,
  iconStyle?: { [string]: string },
  iconSize?: number | boolean,
  iconSeparated?: boolean,
  shadow?: boolean,
  message?: string,
  loading?: boolean,
  onClick: (event?: SyntheticEvent) => any,
  style: { [string]: string },
};
const IconShell = styled.div`
  float: left;
  position: relative;
`;
const getIconSize = (iconSize, format) => {
  if (iconSize) return iconSize;
  switch (format) {
    case 'narrow': {
      return 22;
    }
    default: {
      return 25;
    }
  }
};
const IconButton = (props: IconButtonProps) => {
  const {
    className,
    icon,
    iconSeparated,
    iconStyle,
    iconSize,
    children,
    format,
    message,
    shadow,
    style,
    loading,
    onClick,
  } = props;
  const Icon = IonIcon[icon];
  const pass = {
    format,
    style,
    onClick,
  };
  const finalClassName = cx(className, [
    'iconButton',
    iconSeparated ? 'iconSeparated' : '',
    format.length ? `format-${format}` : '',
  ]);
  return (
    <PaddedButton {...pass} className={finalClassName}>
      <IconShell className="icon" style={iconStyle}>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <Icon size={getIconSize(iconSize, format)} color={C.storm} />
        )}
      </IconShell>
      <span className="text">{children}</span>
      <span className="message">{message}</span>
    </PaddedButton>
  );
};
IconButton.defaultProps = {
  iconStyle: {},
  iconSeparated: false,
  iconSize: false,
  shadow: false,
  message: '',
  loading: false,
  format: '',
};
export default styled(IconButton)`
  position: relative;
  box-shadow: ${({ shadow }) =>
    shadow ? '0 12px 32px rgba(51,83,88,0.23)' : 'none'};
  .text {
    top: 7px;
    font-family: lato;
    font-size: 16pt;
    left: 6px;
  }
  .message {
    width: 100%;
    position: absolute;
    top: 67px;
    font-family: lato;
    font-style: italic;
    color: ${C.color.earth};
    font-size: 11pt;
    left: 6px;
  }
  &.format-narrow {
    .text {
      top: 2px;
    }
  }
  &.iconSeparated {
    .icon {
      padding: 0px;
      margin-left: -12px;
      margin-top: 0px;
      padding: 6px 16px 4px 20px;
      margin-bottom: -1px;
      background: ${C.cloud};
      border-radius: 3px 0 0 3px;
      border-right: 1px solid ${C.rain};
    }
    .pdrpSpinner {
      width: 20px;
      height: 20px;
      position: relative;
      margin: 6px auto 0;
      transition: opacity 200ms;
      -webkit-transition: opacity 200ms;
      opacity: 1;
      margin-top: 3px;
      margin-bottom: 2px;
      margin-left: 1px;
      margin-right: 4px;
    }
  }
`;
