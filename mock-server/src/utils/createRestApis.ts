import { Express } from 'express';
import uuid from 'uuid/v4';

const join = (...pathes: string[]) => {
  let result = pathes[0];
  for (let i = 1; i < pathes.length; i++) {
    result += result.endsWith('/') || pathes[i].startsWith('/') ? '' : '/';
    result += pathes[i];
  }

  return result;
};

export interface Options {
  baseUrl: string;
  keyName?: string;
}

/**
 * 创建Rest风格的接口
 *
 * @param initialItems 初始化数据
 * @param options 接口配置
 */
export default function createRestApis<T>(initialItems: T[], options: Options) {
  let items = [...initialItems];
  const keyName = options.keyName || 'id';

  return (app: Express) => {
    app.get(options.baseUrl, (req, res) => {
      res.json(items);
    });

    app.get(join(options.baseUrl, ':id'), (req, res) => {
      const foundItem = items.find((item) => item[keyName] === req.params.id);
      if (foundItem) {
        res.json(foundItem);
      } else {
        res.sendStatus(404);
      }
    });

    app.post(options.baseUrl, (req, res) => {
      const id = uuid();
      const item = { [keyName]: id, ...req.body };
      items = [...items, item];

      res.json(item);
      //res.sendStatus(404);
    });

    app.put(join(options.baseUrl), (req, res) => {
      // TODO: 尚未实现。田艳秋补充

      res.json(req.body);
    });

    app.put(join(options.baseUrl, ':id'), (req, res) => {
      const item = req.body;
      const idx = items.findIndex((i) => i[keyName] === item[keyName]);
      items = [items.slice(0, idx), item, items.slice(idx + 1)];

      res.json(item);
    });

    app.delete(join(options.baseUrl, ':id'), (req, res) => {
      const ids = req.params.id.split(',');
      items = items.filter((item) => ids.indexOf(item[keyName]) === -1);

      res.sendStatus(201);
    });
  };
}
