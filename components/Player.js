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
const Controls = styled.div`
  display: flex;
  padding: 0 30px;
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
  width: 404px;
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
    this.wave = false;
    this.state = {
      selected: 0,
      playing: false,
    };
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
      if (playing) this.wave.pause();
      else this.wave.play();
      this.setState({ playing: !playing });
    }
  };
  updateWave = guid => {
    if (typeof window !== undefined) {
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
              this.wave.setVolume(0.5);
            });
          });
        });
      });
    }
  };
  select = selected => {
    this.wave.destroy();
    this.updateWave(selected);
    this.setState({ selected });
  };
  render() {
    const { strings } = this.props.content;
    const ep = defaults(
      this.props.episodes.find(ep => ep.guid === this.state.selected),
      { title: '' },
    );
    const [Icon, left] = this.state.playing
      ? [IoIosPause, '0']
      : [IoIosPlay, '2px'];
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
            <Controls>
              <PlayPause onClick={this.playPause}>
                <Icon
                  color={C.color.beige}
                  size={24}
                  style={{ position: 'relative', left, top: '0px' }}
                />
              </PlayPause>
              <Wave id="wave" />
            </Controls>
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
