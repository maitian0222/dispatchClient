import { Express } from 'express';

export default function setup(app: Express) {
  app.get(`/dispute/courtManagement`, (req, res) => {
    const { page = 0, size = 10 } = req.query;
    const data = [];
    for (let i = 1; i <= size; i++) {
      data.push({
        id: `${i}`,
        name: '互联网法院' + i,
        status: i % 2 === 0 ? '1' : '2',
        description: new Date().toLocaleString(),
      });
    }
    res.json({
      data: {
        content: data,
        success: true,
        message: '成功',
        totalElements: 540,
        size: parseInt(size), // 页大小，可以没有，默认与请求中的size一致
        number: parseInt(page), // 当前第几页的意思，可以没有，默认与请求的page一致
        totalPages: 540 / parseInt(size), // 一共多少页，可以没有，默认为`Math.ceil(totalElements / size)`
      },
    });
  });
  app.put(`/dispute/courtManagement/:id`, (req, res) => {
    const result = req.body;
    res.json(result);
  });
  app.post(`/dispute/courtManagement`, (req, res) => {
    const result = req.body;
    res.json({
      id: new Date().getTime(),
      ...result,
    });
  });
  app.delete(`/dispute/courtManagement/:id`, (req, res) => {
    res.json({});
  });
}
