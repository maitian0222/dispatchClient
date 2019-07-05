import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '@auth/user';
import http from '@sinoui/http';
import {
  Layout,
  Modal,
  Icon,
  Menu,
  Dropdown,
  Avatar,
  Divider,
  Badge,
  Popover,
  Row,
  Col,
  Button,
} from 'antd';
import { withRouter } from 'react-router-dom';
import ChangePwdModal from '../components/ChangePwdModal';
import NewsFast from './NewsFast';
import { getNewsQuery } from './apis';
const { Header } = Layout;

class AppHeader extends React.PureComponent {
  private timer;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      newsData: [],
    };
  }

  public componentWillMount() {
    this.refreshNews();
    this.timer = setInterval(() => {
      this.refreshNews();
    }, 20000);
  }
  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * 刷新消息列表和消息数量
   */
  private refreshNews = () => {
    getNewsQuery().then((result) => {
      this.setState({
        newsData: result.data,
      });
    });
  };

  private showConfirm = () => {
    const logout = this.props.onLogout;
    const history = this.props.history;
    Modal.confirm({
      title: '提示',
      content: '确定退出？',
      onOk() {
        http.post('/admin/logout').then(() => {
          logout();
          history.replace('/');
        });
      },
    });
  };

  public showChangePwdModal = () => {
    this.setState({
      visible: true,
    });
  };
  public render() {
    const { currentUser } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="0" disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="1" onClick={this.showChangePwdModal}>
          <Icon type="setting" />
          密码修改
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={this.showConfirm}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const content = (
      <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
        {this.state.newsData.map((item, index) => {
          return (
            index < 10 && (
              <NewsFast news={item} refreshNews={this.refreshNews} />
            )
          );
        })}
        <Button
          style={{ margin: '10px 0' }}
          type="primary"
          block
          onClick={() => {
            this.props.history.push('/notice/list');
          }}
        >
          更多
        </Button>
      </div>
    );

    return (
      <React.Fragment>
        <Header style={{ background: '#fff', padding: '0 20px' }}>
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.changeMenuCollapsed}
          />
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              href="javascript:;"
              style={{ float: 'right' }}
            >
              <span>{currentUser.username}</span>
            </a>
          </Dropdown>
          <a style={{ float: 'right', marginRight: '20px' }}>
            <Popover
              content={content}
              title="消息列表"
              trigger="click"
              placement="bottom"
              arrowPointAtCenter
            >
              <Badge count={this.state.newsData && this.state.newsData.length}>
                <Icon type="bell" style={{ fontSize: '18px' }} />
              </Badge>
            </Popover>
          </a>
        </Header>
        <ChangePwdModal
          visible={this.state.visible}
          onClose={() =>
            this.setState({
              visible: false,
            })
          }
          currentUser={currentUser}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
});
export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(AppHeader),
);
