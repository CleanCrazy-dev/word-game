import React from 'react';
import App from 'next/app';
import {Provider} from 'react-redux';
import 'isomorphic-fetch';
import withReduxStore from '../utils/with-redux-store';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
class ImaginaWord extends App {
  render() {
    const {Component, pageProps, reduxStore} = this.props;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default withReduxStore(ImaginaWord);
