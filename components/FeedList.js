import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import IoBack from 'react-icons/lib/io/ios-arrow-back';
import IoFwd from 'react-icons/lib/io/ios-arrow-forward';
import C from '../constants';
import Container from './Container';
import FeedRow from './FeedRow';
import media from '../utils/media';

let blockWidth = 543;
let isMobile = false;
if (
  typeof window !== 'undefined' &&
  window.innerWidth !== undefined &&
  window.innerWidth < 456
) {
  isMobile = true;
  blockWidth = window.innerWidth - 12;
}

const FeedShell = styled.div`
  background: ${C.color.darkgray};
  width: ${blockWidth}px;
  height: 284px;
  border-radius: 10px;
  overflow: hidden;
  ${media.handheld`
    width: 100%;
  `};
`;
const Shell = styled.div`
  width: ${blockWidth}px;
  height: 328px;
  overflow: hidden;
  ${media.handheld`
    width: 100%;
  `};
`;
const FeedBlock = styled.div`width: ${blockWidth}px;`;
const EpisodeWrap = styled.div`
  display: flex;
  left: ${({ page }) => page * blockWidth * -1}px;
  position: relative;
  transition: left 0.2s;
  width: ${({ episodes }) => `${blockWidth * (episodes.length / 3 + 1)}px`};
`;
const NavBtn = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  transition: opacity 0.2s;
`;

class FeedList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      page: 0,
    };
    this.perBlock = 3;
  }
  rowClick = () => {};
  renderItems() {
    const { perBlock } = this;
    const { episodes } = this.props;
    return (
      <FeedShell>
        <EpisodeWrap page={this.state.page} episodes={episodes}>
          {episodes
            .map(
              (ep, i) =>
                i % perBlock === 0 ? episodes.slice(i, i + perBlock) : null,
            )
            .filter(item => item)
            .map((block, bInx) => {
              return (
                <FeedBlock key={`block-${bInx}`}>
                  {block.map((ep, i) => {
                    return (
                      <FeedRow
                        ep={ep}
                        selected={this.props.selected === ep.guid}
                        key={ep.guid}
                        isMobile={isMobile}
                        onClick={() => this.props.onSelect(ep.guid)}
                      />
                    );
                  })}
                </FeedBlock>
              );
            })}
        </EpisodeWrap>
      </FeedShell>
    );
  }
  movePage = (dir = 1) => {
    const { page } = this.state;
    const newPage = page + dir;
    const max = Math.ceil(this.props.episodes.length / this.perBlock) - 1;
    if (newPage >= 0 && newPage <= max) {
      this.setState({ page: page + dir });
    }
  };
  render() {
    const max = Math.ceil(this.props.episodes.length / this.perBlock);
    const { page } = this.state;
    return (
      <Shell>
        {this.renderItems()}
        <div style={{ textAlign: 'center', width: '100%', marginTop: '15px' }}>
          <NavBtn
            onClick={() => this.movePage(-1)}
            style={{ opacity: page === 0 ? '0.3' : '1' }}
          >
            <IoBack color={C.color.beige} size={34} />
          </NavBtn>
          <NavBtn
            onClick={() => this.movePage(1)}
            style={{ opacity: page === max - 1 ? '0.3' : '1' }}
          >
            <IoFwd color={C.color.beige} size={34} />
          </NavBtn>
        </div>
      </Shell>
    );
  }
}
export default FeedList;
