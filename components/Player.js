import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import C from '../constants';
import IoIosPlay from 'react-icons/lib/io/ios-play';
import IoIosPause from 'react-icons/lib/io/ios-pause';
import Container from './Container';
import FeedList from './FeedList';
import IconButton from './IconButton';

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
`;
const Controls = styled.div`
  display: flex;
  padding: 0 30px;
`;
const PlayPause = styled.button`
  border: 0;
  height: 50px;
  width: 50px;
  background: ${C.color.red};
  border-radius: 50%;
  margin-top: 16px;
  cursor: pointer;
`;
const Wave = styled.div`
  height: 85px;
  width: 404px;
  margin-left: 10px;
`;
const PlayerSection = styled.div`padding-left: 28px;`;
const Logo = styled.div`
  position: relative;
  background: url(/static/logo.png);
  width: 348px;
  height: 400px;
  background-size: 100% auto;
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
    this.updateWave(this.state.selected);
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
  updateWave = episode => {
    if (typeof window !== undefined) {
      this.wave = window.WaveSurfer.create({
        container: '#wave',
        waveColor: C.color.tan,
        progressColor: C.color.red,
        cursorColor: C.color.black,
        curserWidth: 0,
        height: 85,
        barWidth: 3,
        background: 'MediaElement',
      });
      const ep = this.props.episodes[episode];
      fetch(
        `/api/redirectUrl?url=${ep.enclosure.url.replace(
          'http://',
          'https://',
        )}`,
      ).then(rsp => {
        rsp.json().then(json => {
          this.wave.load(json.url);
          this.wave.setVolume(0.5);
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
    const ep = this.props.episodes[this.state.selected];
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
                href="http://aol.com"
                href={strings.urlItunes}
                icon="apple"
                className="playerButton"
                bg={C.color.blue}
              >
                iTunes
              </IconButton>
              <IconButton
                href={strings.urlRss}
                icon="soundcloud"
                textStyle={{ top: '2px', left: '4px' }}
                className="playerButton"
                bg={C.color.orange}
              >
                SoundCloud
              </IconButton>
              <IconButton
                href={strings.urlSoundcloud}
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
