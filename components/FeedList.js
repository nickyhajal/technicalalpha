import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import C from '../constants';
import Container from './Container';
import FeedRow from './FeedRow';

const Shell = styled.div`
  background: ${C.color.darkgray};
  width: 543px;
  height: 297px;
  border-radius: 10px;
  overflow-y: auto;
  margin-left: 28px;
`;

class FeedList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  rowClick = () => {};
  renderItems() {
    return this.props.episodes.map(ep => (
      <FeedRow ep={ep} key={ep.guid} onClick={this.rowClick} />
    ));
  }
  render() {
    return <Shell>{this.renderItems()}</Shell>;
  }
}
export default FeedList;
