import Head from 'next/head';
import styled from 'styled-components';
import C from '../constants';
import Header from '../components/Header';
import Player from '../components/Player';
import About from '../components/About';
import Patrons from '../components/Patrons';
import Footer from '../components/Footer';

const Index = ({ episodes, live, content, patrons }) => {
  return (
    <div>
      <Head>
        <title>{content.strings.siteTitle}</title>
      </Head>
      <Header live={live} content={content} />
      <Player episodes={episodes} content={content} />
      <About content={content} />
      <Patrons patrons={patrons} />
      <Footer content={content} />
    </div>
  );
};
Index.getInitialProps = async () => {
  const rsp = await fetch('http://localhost:3000/api/assets');
  const json = await rsp.json();
  return json;
};

export default Index;
