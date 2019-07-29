import React from 'react';
import { Button } from 'antd';
// import http from '@commons/http';
import logo from './logo.svg';
function proxyRequest() {
  // http.get(
  //   '/oa/info/periodicalset/column?idff808081693d263801694635ddd10011',
  // );
}
function getOther() {
  //
}
export default function TestAjax() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Button
        type="primary"
        onClick={() => {
          proxyRequest();
        }}
      >
        获取116
      </Button>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          getOther();
        }}
      >
        获取124
      </Button>
    </div>
  );
}
