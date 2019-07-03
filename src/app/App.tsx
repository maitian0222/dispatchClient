import '@babel/polyfill';
import * as React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import store from './store';
import LayoutContainer from '../nav/containers/LayoutContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import history from './history';

export default function App() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zh_CN}>
        <Router history={history}>
          <ConfigProvider
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          >
            <LayoutContainer />
          </ConfigProvider>
        </Router>
      </LocaleProvider>
    </Provider>
  );
}
