import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body className="image-page">
          <Main />
          <div id="modal" />
          <NextScript />
          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/2147080.js"></script>
        </body>
      </Html>
    );
  }
}
