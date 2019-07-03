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
} from 'antd';
import { withRouter } from 'react-router-dom';
import ChangePwdModal from '../components/ChangePwdModal';
const { Header } = Layout;

class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
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
        <Row>
          <Col span={22}>123</Col>
          <Col span={2}>
            <Icon type="close" />
          </Col>
          <Col span={24}>
            <div
              style={{
                width: '200px',
                wordBreak: 'break-all',
                wordWrap: 'break-word',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            >
              alksjdlaksjdlaskjdlaksjdlksajdlkasjdlakjsdlasjdoiquepqowepqo
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={22}>123</Col>
          <Col span={2}>
            <Icon type="close" />
          </Col>
          <Col span={24}>
            <div
              style={{
                width: '200px',
                wordBreak: 'break-all',
                wordWrap: 'break-word',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            >
              alksjdlaksjdlaskjdlaksjdlksajdlkasjdlakjsdlasjdoiquepqowepqoiepqowiepqowjrpjaslkjdl;mczxlkclskjf
            </div>
          </Col>
        </Row>
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
          <a style={{ float: 'right', marginRight: '40px' }}>
            <Badge count={5}>
              <Popover
                content={content}
                title="消息列表"
                trigger="click"
                placement="bottom"
              >
                <Icon type="bell" style={{ fontSize: '18px' }} />
              </Popover>
            </Badge>
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
