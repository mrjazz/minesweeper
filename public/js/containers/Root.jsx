import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import GameUI from '../components/GameUI.jsx';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <GameUI/>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
