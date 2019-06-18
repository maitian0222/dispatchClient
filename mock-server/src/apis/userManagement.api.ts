import { Express } from 'express';

export default function setup(app: Express) {
  const user = {
    userId: `9999`,
    username: `hellen`,
    truename: `海伦凯勒`,
    sex: `1`,
    status: `1`,
    password: '123',
    mobile: '15035239977',
    email: '123@qq.com',
    createTime: '2019-06-13 09:21:32',
  };
  app.get(`/upms/user`, (req, res) => {
    const { page = 0, size = 10 } = req.query;
    if (req.body.username) {
      res.json({ conent: [] });
    }
    const data = [];
    for (let i = 1; i <= size; i++) {
      data.push({
        userId: `${i}`,
        username: `用户名${i}`,
        truename: `真实姓名${i}`,
        sex: `${i % 2 === 0 ? '0' : '1'}`,
        status: `${i % 2 === 0 ? '0' : '1'}`,
        password: '123',
        mobile: '15035239977',
        email: '123@qq.com',
        createTime: '2019-06-13 09:21:32',
        roleId: [`roleId${i}`, `roleId${i + 1}`],
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

  app.post(`/upms/user`, (req, res) => {
    res.json({
      ...user,
      userId: user.username,
    });
  });

  app.put(`/upms/user/:id`, (req, res) => {
    const { userId } = req.body;
    res.json({
      ...user,
      userId,
    });
  });

  app.delete(`/upms/user/:id`, (req, res) => {
    res.json({});
  });

  app.get('/upms/user/check/:username', (req, res) => {
    const { username } = req.params;
    res.json(username === 'hellen' ? false : true);
  });

  app.get('/upms/user/:username', (req, res) => {
    const { username } = req.params;
    res.json({
      ...user,
      roleId: [`roleId1`, `roleId2`],
    });
  });
}
