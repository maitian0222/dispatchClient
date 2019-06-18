import React, { Component } from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';
import http from '@commons/http';
import logo from '../images/logo.svg';
import Resource from '../../page/resource/types/Resource';
interface Props {
  collapsed: boolean;
}

interface State {
  menuList: Resource[];
  selectedKeys: string[];
}
class NavMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuList: [],
      selectedKeys: ['/'],
    };
  }

  public componentDidMount() {
    const path = location.pathname;
    http.get('/dispute/menu/list').then((data: Resource[]) => {
      this.setState({
        menuList: data,
      });

      // 设置菜单默认选中项
      const selectedMenu = data.find((item: Resource) => item.path === path);
      if (selectedMenu) {
        this.setState({
          selectedKeys: [selectedMenu.path],
        });
      }
    });
  }

  public onChangeSelectMenu = (path: string) => {
    this.setState({
      selectedKeys: [path],
    });
  };
  public render() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        width={240}
      >
        <div className="nav-header">
          <img src={logo} width="32" />
          <Typography.Title
            level={4}
            style={{ color: '#fff', marginBottom: '0', marginLeft: '10px' }}
          >
            金融纠纷解决平台
          </Typography.Title>
        </div>
        <Menu theme="dark" selectedKeys={this.state.selectedKeys} mode="inline">
          <Menu.Item key="/" onClick={() => this.onChangeSelectMenu('/')}>
            <Link to="/">
              <Icon type="desktop" />
              <span>系统首页</span>
            </Link>
          </Menu.Item>
          {this.state.menuList.map((item: Resource) =>
            !item.children || item.children.length === 0 ? (
              <Menu.Item
                key={item.path}
                onClick={() => this.onChangeSelectMenu(item.path)}
              >
                <Link to={item.path}>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.menuName}</span>
                </Link>
              </Menu.Item>
            ) : (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.menuName}</span>
                  </span>
                }
              >
                {item.children.map((item: Resource) => (
                  <Menu.Item
                    key={item.path}
                    onClick={() => this.onChangeSelectMenu(item.path)}
                  >
                    <Link to={item.path}>{item.menuName}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ),
          )}
        </Menu>
      </Sider>
    );
  }
}

export default NavMenu;
