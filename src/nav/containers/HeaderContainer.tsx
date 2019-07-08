import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '@auth/user';
import { ActionCreators as messageActionCreators } from '@message/message';
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
  Tooltip,
} from 'antd';
import { withRouter } from 'react-router-dom';
import ChangePwdModal from '../components/ChangePwdModal';
import NewsFast from './NewsFast';
import { getNewsQuery } from './apis';
import styles from './NewsList.css';
const { Header } = Layout;

class AppHeader extends React.PureComponent {
  private timer;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
      this.props.dispatch(messageActionCreators.messageinSuccess(result.data));
      console.log(this.props);
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
      <div>
        {(this.props.messageList || []).map((item, index) => {
          return (
            index < 10 && (
              <NewsFast news={item} refreshNews={this.refreshNews} />
            )
          );
        })}
      </div>
    );

    const title = (
      <Row>
        <Col span={22}>消息列表</Col>
        <Col span={2}>
          <Tooltip placement="left" title="更多消息">
            <a
              onClick={() => {
                this.props.history.push('/notice/list');
              }}
            >
              <Icon type="double-right" />
            </a>
          </Tooltip>
        </Col>
      </Row>
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
          <a className={styles.newsList}>
            <Popover
              content={content}
              title={title}
              trigger="click"
              placement="bottom"
              arrowPointAtCenter
              autoAdjustOverflow={false}
            >
              <Badge
                count={this.props.messageList && this.props.messageList.length}
              >
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    messageList: state.message && state.message.messageList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
  dispatch,
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppHeader),
);
