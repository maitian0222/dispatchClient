import { Express } from 'express';

export default function setup(app: Express) {
  app.get(`/dispute/roleManagement`, (req, res) => {
    const { page = 0, size = 10 } = req.query;
    if (req.body.fileName) {
      res.json({ conent: [] });
    }
    const data = [];
    for (let i = 1; i <= size; i++) {
      data.push({
        id: `${i}`,
        name: `角色名称${i}`,
      });
    }
    res.json({
      content: data,
      success: true,
      message: '成功',
      totalElements: 540,
      size: parseInt(size), // 页大小，可以没有，默认与请求中的size一致
      number: parseInt(page), // 当前第几页的意思，可以没有，默认与请求的page一致
      totalPages: 540 / parseInt(size), // 一共多少页，可以没有，默认为`Math.ceil(totalElements / size)`
    });
  });

  app.post(`/dispute/roleManagement`, (req, res) => {
    res.json({
      name: '角色名称',
    });
  });

  app.get(`/dispute/userTree`, (req, res) => {
    res.json([
      { key: '1', title: '测试人1' },
      {
        key: '2',
        title: '测试部门',
        children: [
          { key: '2-0', title: '测试人2' },
          { key: '2-1', title: '测试人3' },
        ],
      },
      { key: '3', title: '测试人4' },
    ]);
  });

  app.get(`/dispute/resourcesTree`, (req, res) => {
    const { id } = req.query;
    if (id) {
      res.json([
        { key: '2-0', title: '信息公告' },
        { key: '2-1', title: '公告板' },
      ]);
    } else {
      res.json([
        { key: '1', title: '公文管理', isLeaf: true },
        {
          key: '2',
          title: '信息管理',
        },
        { key: '3', title: '用户管理', isLeaf: true },
      ]);
    }
  });

  app.put(`/dispute/roleManagement/:id`, (req, res) => {
    res.json({
      id: '1',
      name: '角色名称',
    });
  });

  app.get(`/dispute/roleManagement/:id`, (req, res) => {
    res.json({
      name: '角色名称',
    });
  });

  app.delete(`/dispute/roleManagement/:id`, (req, res) => {
    res.json({});
  });
}
