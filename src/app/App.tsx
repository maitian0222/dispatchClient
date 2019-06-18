import '@babel/polyfill';
import * as React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from './store';
import LayoutContainer from '../nav/containers/LayoutContainer';
export default function App() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zh_CN}>
        <LayoutContainer />
      </LocaleProvider>
    </Provider>
  );
}
