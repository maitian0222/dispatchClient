import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '@auth/user';
import http from '@sinoui/http';
import { Layout, Modal, Icon, Menu, Dropdown, Avatar } from 'antd';
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
    Modal.confirm({
      title: '提示',
      content: '确定退出？',
      onOk() {
        http.post('/admin/logout').then(() => {
          logout();
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
              href="#"
              style={{ float: 'right' }}
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span>{currentUser.username}</span>
            </a>
          </Dropdown>
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
export default connect(
  null,
  mapDispatchToProps,
)(AppHeader);
