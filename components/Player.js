import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { defaults } from 'lodash';
import C from '../constants';
import IoIosPlay from 'react-icons/lib/io/ios-play';
import IoIosPause from 'react-icons/lib/io/ios-pause';
import Container from './Container';
import FeedList from './FeedList';
import IconButton from './IconButton';
import media from '../utils/media';
const Shell = styled.div`
  background: ${C.color.black};
  padding: 32px 0;
  width: 100%;
`;
const Content = styled(Container)`
  color: ${C.color.beige};
  display: flex;

  .title {
    text-align: center;
    font-family: bebas-neue;
    font-size: 22px;
  }
  ${media.handheld`
    flex-direction: column-reverse;
  `};
`;
const Time = styled.div`
  position: absolute;
  right: 32px;
  top: 56px;
  font-size: 10px;
  padding: 1px 2px 1px 4px;
  z-index: 10;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
const MainControls = styled.div`
  position: relative;
  display: flex;
  padding: 0 30px;
`;
const SubControls = styled.div`
  display: flex;
  height: 44px;
  margin-top: -26px;
  margin-bottom: 3px;
  padding-left: 90px;
  padding-right: 30px;
  justify-content: space-between;
  align-items: center;
`;
const SubControlsSection = styled.div`
  display: flex;
  justification-content: space-between;
  align-items: center;

  a {
    margin-right: 24px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const Speed = styled.div`
  display: flex;
  font-size: 10px;
  color: ${C.color.beige};
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  span {
    padding-left: 1px;
  }
`;
const Volume = styled.div`position: relative;`;
const VolumeControl = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  height: 90px;
  width: 20px;
  background: ${C.color.darkgray};
  top: 4px;
  right: -20px;
  z-index: 10;
  padding: 6px;
  border-radius: 4px;
  &:before,
  &:after {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    width: 8px;
    margin: 0 auto;
    content: '';
    display: block;
    border-radius: 2px;
    cursor: pointer;
  }
  &:before {
    background: ${C.color.red};
    z-index: 5;
    height: ${({ volume }) => volume * 80}px;
  }
  &:after {
    background: ${C.color.black};
    z-index: 4;
    height: 80px;
  }
`;
const PlayPause = styled.button`
  border: 0;
  height: 50px;
  width: 50px;
  min-width: 50px;
  background: ${C.color.red};
  border-radius: 50%;
  margin-top: 21px;
  cursor: pointer;
`;
const Wave = styled.div`
  height: 85px;
  width: 420px;
  margin-top: 16px;
  margin-bottom: -8px;
  margin-left: 10px;
`;
const PlayerSection = styled.div`
  padding-left: 28px;
  ${media.handheld`
  padding: 0 6px;
  `};
`;
const Logo = styled.div`
  position: relative;
  background: url(/static/logo.png);
  width: 348px;
  height: 400px;
  background-size: 100% auto !important;
  margin-bottom: 14px;
  border: 0;
  &:before,
  &:after {
    content: '';
    height: 1px;
    width: 70px;
    position: absolute;
    top: 12px;
  }
  ${media.xx`
    background: url(/static/logo@2x.png);
  `};
  ${media.xxx`
    background: url(/static/logo@3x.png);
  `};
  ${media.handheld`
  width: 260px;
  height: 299px;
  margin: 64px auto 14px;
  `};
`;
const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
class Player extends React.Component {
  constructor() {
    super();
    const store = this.getStore();
    this.wave = false;
    this.state = {
      selected: 0,
      playing: false,
      showTime: false,
      currentTime: 0,
      showDuration: true,
      speed: store.speed === undefined ? 1 : store.speed,
      volumeOpen: false,
      volumeMouseDown: false,
      volume: store.volume === undefined ? 0.5 : store.volume,
    };
    this.speeds = [0.75, 1, 1.5, 1.8, 2, 2.2, 2.5, 3];
  }
  componentDidMount() {
    const guid = this.props.episodes[0].guid;
    if (!this.state.selected) {
      this.setState({
        selected: guid,
      });
    }
    this.updateWave(guid);
  }
  componentDidUpdate(props) {}
  playPause = () => {
    const { playing } = this.state;
    if (this.wave) {
      if (playing) {
        this.wave.pause();
        clearTimeout(this.progressTimo);
      } else {
        this.wave.play();
        this.saveProgress();
      }
      this.setState({ playing: !playing });
    }
  };
  saveProgress = () => {
    if (typeof window !== undefined) {
      const ep = defaults(
        this.props.episodes.find(ep => ep.guid === this.state.selected),
        { title: '' },
      );
      window.localStorage.setItem(
        ep.guid,
        (this.wave.getCurrentTime() / this.wave.getDuration()).toFixed(5) *
          10000,
      );
      this.setState({ currentTime: this.wave.getCurrentTime() });
    }
  };
  updateWave = guid => {
    if (typeof window !== undefined) {
      this.setState({ playing: false, showTime: false });
      const ctx = document.createElement('canvas').getContext('2d');
      const h = window.devicePixelRatio * 65;
      const linGrad = ctx.createLinearGradient(0, 0, 0, h);
      linGrad.addColorStop(0.61, 'rgba(239, 231, 205, 1.000)');
      linGrad.addColorStop(0.61, 'rgba(133, 128, 115, 1.000)');
      const pGrad = ctx.createLinearGradient(0, 0, 0, h);
      pGrad.addColorStop(0.61, 'rgba(207, 61, 65, 1.000)');
      pGrad.addColorStop(0.61, 'rgba(158, 63, 67, 1.000)');
      this.wave = window.WaveSurfer.create({
        container: '#wave',
        waveColor: linGrad,
        progressColor: pGrad,
        cursorColor: 'rgba(0,0,0,0.0)',
        normalize: true,
        curserWidth: 0,
        barWidth: 2,
        height: 80,
        barHeight: 90,
        backend: 'MediaElement',
      });
      const ep = this.props.episodes.find(ep => ep.guid === guid);
      fetch(
        `/api/redirectUrl?url=${ep.enclosure.url.replace(
          'http://',
          'https://',
        )}`,
      ).then(rsp => {
        rsp.json().then(json => {
          fetch(
            `https://fetchwave.nickyhajal.co/wave?url=${encodeURIComponent(
              ep.enclosure.url,
            )}`,
          ).then(peakRsp => {
            peakRsp.json().then(peakJson => {
              const rawPeaks = JSON.parse(peakJson.wave).data.filter(
                v => v > 3,
              );
              this.wave.load(json.url, rawPeaks);
              this.wave.setVolume(this.state.volume);
              this.wave.setPlaybackRate(this.speeds[this.state.speed]);
              this.wave.on('audioprocess', this.saveProgress);
              this.wave.on('ready', () => {
                this.setState({ showTime: true });
              });
              if (typeof window !== undefined) {
                const progress = window.localStorage.getItem(ep.guid);
                if (progress !== undefined && progress) {
                  this.wave.on('ready', () => {
                    this.wave.seekTo((parseInt(progress) / 10000).toFixed(1));
                    this.saveProgress();
                  });
                }
              }
            });
          });
        });
      });
    }
  };
  nextSpeed = e => {
    e.stopPropagation();
    e.preventDefault();
    let next = this.state.speed + 1;
    if (next >= this.speeds.length) {
      next = 0;
    }
    this.updateSpeed(next);
  };
  updateSpeed = speed => {
    if (this.wave) {
      this.updateStore('speed', speed);
      this.setState({ speed });
      this.wave.setPlaybackRate(this.speeds[speed]);
    }
  };
  toggleVolume = () => {
    this.setState({ volumeOpen: !this.state.volumeOpen });
  };
  volumeClick = e => {
    const y = e.nativeEvent.offsetY - 5;
    this.volumeSet(y);
  };
  volumeDrag = e => {
    if (this.state.volumeMouseDown) {
      const y = e.nativeEvent.offsetY - 5;
      this.volumeSet(y);
    }
  };
  volumeSet = y => {
    if (y >= -1 && y <= 80) {
      const volume = (80 - y) / 80;
      this.updateStore('volume', volume);
      this.wave.setVolume(volume);
      this.setState({ volume });
    }
  };
  select = selected => {
    this.wave.destroy();
    this.updateWave(selected);
    this.setState({ selected });
  };
  getStore() {
    let player = false;
    if (typeof window !== 'undefined') {
      player = window.localStorage.getItem('player');
    }
    return JSON.parse(player) || {};
  }
  updateStore(key, val) {
    const store = this.getStore();
    store[key] = val;
    window.localStorage.setItem('player', JSON.stringify(store));
  }
  timeFromSeconds(seconds) {
    const hval = Math.floor((seconds % 86400) / 3600)
      .toString()
      .padStart(2, '0');
    const mval = Math.floor(((seconds % 86400) % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sval = Math.floor(((seconds % 86400) % 3600) % 60)
      .toString()
      .padStart(2, '0');
    return `${hval}:${mval}:${sval}`;
  }
  getProgressTime() {
    return this.timeFromSeconds(this.state.currentTime);
  }
  render() {
    const { strings } = this.props.content;
    const ep = defaults(
      this.props.episodes.find(ep => ep.guid === this.state.selected),
      { title: '' },
    );
    const [Icon, left] = this.state.playing
      ? [IoIosPause, '0']
      : [IoIosPlay, '2px'];
    const volume = this.state.volume;
    let volumeIcon = 'volMute';
    if (volume > 0.6) {
      volumeIcon = 'volHigh';
    } else if (volume > 0.3) {
      volumeIcon = 'volMedium';
    } else if (volume > 0) {
      volumeIcon = 'volLow';
    }
    return (
      <Shell>
        <Content>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Logo />
            <Buttons>
              <IconButton
                href={strings.urlItunes}
                icon="apple"
                className="playerButton"
                bg={C.color.blue}
              >
                iTunes
              </IconButton>
              <IconButton
                href={strings.urlSoundcloud}
                icon="soundcloud"
                textStyle={{ top: '2px', left: '4px' }}
                className="playerButton"
                bg={C.color.orange}
              >
                SoundCloud
              </IconButton>
              <IconButton
                href={strings.urlRss}
                icon="rss"
                className="playerButton"
                bg={C.color.red}
              >
                Rss Feed
              </IconButton>
            </Buttons>
          </div>
          <PlayerSection>
            <div className="title">{ep.title}</div>
            <MainControls>
              <PlayPause onClick={this.playPause}>
                <Icon
                  color={C.color.beige}
                  size={24}
                  style={{ position: 'relative', left, top: '0px' }}
                />
              </PlayPause>
              {this.state.showTime ? (
                <Time
                  onClick={() => {
                    this.setState({ showDuration: !this.state.showDuration });
                  }}
                >
                  {this.state.showDuration
                    ? ep.itunes ? ep.itunes.duration : ''
                    : this.getProgressTime()}
                </Time>
              ) : (
                ''
              )}
              <Wave id="wave" />
            </MainControls>
            <SubControls>
              <SubControlsSection>
                <IconButton
                  icon="downloadOutline"
                  color={C.color.beige}
                  iconSize={24}
                  href={ep && ep.enclosure ? ep.enclosure.url : ''}
                />
              </SubControlsSection>
              <SubControlsSection>
                <Speed onClick={this.nextSpeed}>
                  <IconButton
                    icon="speedometer"
                    color={C.color.beige}
                    iconSize={24}
                  />
                  <span>{this.speeds[this.state.speed]}x</span>
                </Speed>
                <Volume>
                  <IconButton
                    icon={volumeIcon}
                    color={C.color.beige}
                    iconSize={24}
                    onClick={this.toggleVolume}
                  />
                  <VolumeControl
                    open={this.state.volumeOpen}
                    onMouseDown={e => {
                      this.volumeClick(e);
                      this.setState({ volumeMouseDown: true });
                    }}
                    onMouseUp={() => this.setState({ volumeMouseDown: false })}
                    onMouseMove={this.volumeDrag}
                    volume={this.state.volume}
                  />
                </Volume>
              </SubControlsSection>
            </SubControls>
            <FeedList
              episodes={this.props.episodes}
              selected={this.state.selected}
              onSelect={this.select}
            />
          </PlayerSection>
        </Content>
      </Shell>
    );
  }
}
export default Player;
