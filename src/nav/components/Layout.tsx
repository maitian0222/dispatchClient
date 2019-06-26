import React from 'react';
import Login from '@auth/user';
import MainLayout from './MainLayout';
import http from '@sinoui/http';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
export interface LayoutPageProps {
  isLoggined: boolean;
  onRequestFresh: (item1: object, item2?: string) => void;
}

export interface LayoutPageState {
  refreshing: boolean;
}

class LayoutPage extends React.Component<LayoutPageProps, LayoutPageState> {
  constructor(props: LayoutPageProps) {
    super(props);
    this.state = {
      refreshing: true,
    };
  }

  public componentDidMount() {
    http.interceptors.response.use(undefined, (error) => {
      if (error.response && error.response.status === 401) {
        // message.error('会话超时,请重新登录！');
        // 跳转到登录页
        this.props.onLogout();
      } else if (error.response && error.response.status === 403) {
        this.props.history.push('/');
        message.error('无权限访问此页面！');
      }

      this.setState({
        refreshing: false,
      });

      throw error;
    });
    // this.props.onRequestFresh({
    //   userId: 21,
    //   username: 'wang5',
    // });
    // return;
    http.get('/admin/check').then((result) => {
      this.setState({
        refreshing: false,
      });
      if (result && result.data && result.data.user) {
        this.props.onRequestFresh(result.data.user);
      }
    });
  }

  public renderChildren() {
    const { currentUser } = this.props;
    if (this.props.isLoggined) {
      return <MainLayout currentUser={currentUser} />;
    } else if (this.state.refreshing) {
      return <div />;
    }
    return (
      <>
        <Login />
      </>
    );
  }

  public render() {
    return this.renderChildren();
  }
}

export default withRouter(LayoutPage);
