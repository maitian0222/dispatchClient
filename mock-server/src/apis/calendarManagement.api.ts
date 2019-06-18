import { Express } from 'express';

export default function setup(app: Express) {
  app.get(`/dispute/calendar`, (req, res) => {
    const { courtId, time } = req.query;
    res.json([
      {
        id: '0',
        courtId,
        time: `${time}-01`,
      },
      {
        id: '0',
        courtId,
        time: `${time}-11`,
      },
      {
        id: '0',
        courtId,
        time: `${time}-21`,
      },
      {
        id: '0',
        courtId,
        time: `${time}-30`,
      },
    ]);
  });

  app.post(`/dispute/calendar`, (req, res) => {
    const { isStop } = req.body;
    res.json({
      ...req.body,
    });
  });

  app.delete(`/dispute/calendar/:id`, (req, res) => {
    res.json({});
  });

  app.get(`/dispute/court`, (req, res) => {
    const { courtId, time } = req.query;
    const data = [];
    for (let i = 1; i <= 40; i++) {
      data.push({
        id: `${i}`,
        name: `法院${i}`,
      });
    }
    res.json(data);
  });
}
