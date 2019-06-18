import { Express } from 'express';

export default function setup(app: Express) {
  app.get(`/dispute/menu`, (req, res) => {
    const { page = 0, size = 10 } = req.query;
    if (req.body.fileName) {
      res.json({ conent: [] });
    }
    const data = [];
    for (let i = 1; i <= size; i++) {
      data.push({
        menuId: `${i}`,
        menuName: `系统管理配置${i}`,
        type: '0',
        path: '/sys/setting',
        order: '10',

        children: [
          {
            menuId: `11${i}`,
            menuName: '法院管理',
            type: '0',
            path: '/sys/fy',
            order: '10',

            children: [],
          },
          {
            menuId: `12${i}`,
            menuName: '新增',
            type: '权限',
            path: '/sys/fy',
            order: '10',
          },
          {
            menuId: 13,
            menuName: '编辑',
            type: '权限',
            path: '',
            order: '10',
          },
        ],
      });
    }
    res.json({
      content: data,
      success: true,
      message: '成功',
      totalElements: 540,
    });
  });

  app.post(`/dispute/menu`, (req, res) => {
    res.json({
      menuName: '系统管理配置save',
      type: '0',
      path: '/sys/setting',
      order: '10',
    });
  });

  app.put(`/dispute/menu/:menuId`, (req, res) => {
    res.json({
      menuId: '1',
      menuName: '系统管理配置put',
      type: '0',
      path: '/sys/setting',
      order: '10',
    });
  });

  app.get(`/dispute/menu/:menuId`, (req, res) => {
    res.json({
      menuName: '系统管理配置',
      type: '0',
      path: '/sys/setting',
      order: '10',
    });
  });

  app.delete(`/dispute/menu/:menuId`, (req, res) => {
    res.json({});
  });
}
