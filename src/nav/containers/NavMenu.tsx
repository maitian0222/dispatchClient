import React, { Component } from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';
import http from '@commons/http';
import logo from '../images/logo.svg';
import Resource from '../../page/resource/types/Resource';
interface Props {
  collapsed: boolean;
  currentUser: {
    userId: string;
    username: string;
  };
}

interface State {
  menuList: Resource[];
  selectedKeys: string[];
  openKeys: string[];
}
class NavMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuList: [],
      selectedKeys: [],
      openKeys: [],
    };
  }

  public componentDidMount() {
    const path = location.pathname;
    http
      .get(`/admin/menu/${this.props.currentUser.username}`)
      .then((result: { content?: Resource[] }) => {
        if (result && result.content) {
          const data: Resource[] = result.content || [];
          this.setState({
            menuList: data,
          });
          // 设置菜单默认选中项
          const selectedMenu = data.find(
            (item: Resource) => path.indexOf(item.path) !== -1,
          );
          if (selectedMenu) {
            if (selectedMenu.children && selectedMenu.children.length > 0) {
              const ziMenu = selectedMenu.children.find(
                (item: Resource) => path.indexOf(item.path) !== -1,
              );
              this.setState({
                openKeys: [selectedMenu.path],
              });
              this.setState({
                selectedKeys: [ziMenu.path],
              });
            } else {
              this.setState({
                selectedKeys: [selectedMenu.path],
              });
            }
          } else {
            let parentMenu: Resource;
            let ziMenu: Resource;
            for (let i = 0; i < data.length; i++) {
              ziMenu =
                data[i].children &&
                data[i].children.find(
                  (item: Resource) => path.indexOf(item.path) !== -1,
                );
              if (ziMenu) {
                parentMenu = data[i];
                break;
              }
            }

            if (parentMenu) {
              this.setState({
                openKeys: [parentMenu.path],
              });
              if (ziMenu) {
                this.setState({
                  selectedKeys: [ziMenu.path],
                });
              }
            } else {
              this.setState({
                selectedKeys: ['/'],
              });
            }
          }
        }
      })
      .catch((error) => {
        // 拦截到异常后重定向
        // if (error.response && error.response.status === 401) {
        //   // message.error('会话超时,请重新登录！');
        //   // 跳转到登录页
        //   this.props.onLogout();
        // } else if (error.response && error.response.status === 403) {
        //   this.props.history.push('/tip');
        //   // message.error('无权限访问此页面！');
        // }
      });
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.collapsed) {
      this.setState({
        selectedKeys: [],
        openKeys: [],
      });
    }
  }

  public onChangeSelectMenu = (path: string) => {
    this.setState({
      selectedKeys: [path],
    });
  };

  // 点击含有子菜单的菜单节点
  public onChangeSubMenu = (path: string) => {
    if (this.state.openKeys.toString().indexOf(path) !== -1) {
      this.setState({
        openKeys: [],
      });
    } else {
      this.setState({
        openKeys: [path],
      });
    }
  };
  public render() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    // 导航菜单折叠或取消折叠时 动态设置属性
    const menuProps = this.props.collapsed
      ? {}
      : {
          selectedKeys: this.state.selectedKeys,
          openKeys: this.state.openKeys,
        };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        width={240}
        theme="light"
      >
        <div className="nav-header">
          <img src={logo} width="32" />
          <Typography.Title
            level={4}
            style={{ marginBottom: '0', marginLeft: '10px' }}
          >
            金融纠纷解决平台
          </Typography.Title>
        </div>
        <Menu mode="inline" theme="light" {...menuProps}>
          {/* <Menu.Item key="/" onClick={() => this.onChangeSelectMenu('/')}>
            <Link to="/">
              <Icon type="desktop" />
              <span>系统首页</span>
            </Link>
          </Menu.Item> */}
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
                onTitleClick={() => this.onChangeSubMenu(item.path)}
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
