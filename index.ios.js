import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { Provider } from 'react-redux';

import Main from './App/Components/Main';
import store from './App/Data';

class CrankyCoasterMobile extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('CrankyCoasterMobile', () => CrankyCoasterMobile);
