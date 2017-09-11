import Head from 'next/head';
import styled from 'styled-components';
import C from '../constants';
import Header from '../components/Header';
import Player from '../components/Player';

const Index = ({ episodes, live }) => (
  <div>
    <Header live={live} />
    <Player episodes={episodes} />
  </div>
);
Index.getInitialProps = async () => {
  const rsp = await fetch('http://localhost:3000/api/assets');
  const json = await rsp.json();
  return json;
};

export default Index;
