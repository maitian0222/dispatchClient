import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '@auth/user';
import http from '@sinoui/http';
import { Layout, Button, Icon, Modal, Menu, Dropdown, Avatar } from 'antd';
const { Header } = Layout;

class AppHeader extends React.PureComponent {
  private showConfirm = () => {
    const logout = this.props.onLogout;
    Modal.confirm({
      title: '提示',
      content: '确定退出？',
      onOk() {
        http.post('/upms/logout').then(() => {
          logout();
        });
      },
    });
  };
  public render() {
    const menu = (
      <Menu>
        <Menu.Item key="0" disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="1" disabled>
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={this.showConfirm}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.changeMenuCollapsed}
        />
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#" style={{ float: 'right' }}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <span>admin</span>
          </a>
        </Dropdown>
      </Header>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader);
