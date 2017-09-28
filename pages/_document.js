import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import styles from '../styles';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    // append value to props
    // return { ...props, value: 'hi' }
    return props;
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html>
        <Head>
          {styleTags}
          <script src="//use.edgefonts.net/open-sans.js" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/static/fonts.css" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="/static/wavesurfer.js" />
        </Head>
        {/* set className to body */}
        <body className="technicalalpha">
          {this.props.value}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
