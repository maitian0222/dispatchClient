import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, PageHeader } from 'antd';

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
}

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },

  {
    path: '/announcement/list',
    breadcrumbName: '公告管理',
  },
];

function Home() {
  return (
    <PageHeader style={{ padding: '15px', marginBottom: '20px' }}>
      <Breadcrumb itemRender={itemRender} routes={routes} />
    </PageHeader>
  );
}
export default Home;
