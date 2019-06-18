import * as React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavMenu from '../containers/NavMenu';
import HeaderContainer from '../containers/HeaderContainer';
import GlobalFooter from '@commons/GlobalFooter';
import routes from '../../app/routes';
import styles from '../Layout.css';
const { Header, Content } = Layout;

export default class MainLayout extends React.PureComponent {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  public changeMenuCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  public render() {
    return (
      <Router>
        <Layout>
          <NavMenu collapsed={this.state.collapsed} />
          <Content>
            <HeaderContainer
              collapsed={this.state.collapsed}
              changeMenuCollapsed={this.changeMenuCollapsed}
            />
            <div className={styles.appContent}>
              <div
                style={{
                  background: '#ffffff',
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <Switch>
                  <Route path="/" exact component={() => <div>首页!</div>} />{' '}
                  {routes.map((item, index) => (
                    <Route
                      key={index}
                      path={item.path}
                      component={item.component}
                    />
                  ))}
                  {/*path为空用来匹配任意路由 */}
                  <Route component={() => <div>Page not found!</div>} />{' '}
                </Switch>
              </div>
            </div>
            <GlobalFooter links="default" copyright="default" />;
          </Content>
        </Layout>
      </Router>
    );
  }
}
