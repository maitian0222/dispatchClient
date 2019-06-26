import express from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import loadApis from './src/loadApis';
import { AddressInfo } from 'net';

const app = express();
const path = join(__dirname, '../devtools/newoa-build/build');
app.use('/oa/static', express.static(join(__dirname, 'public')));
app.use('/', express.static(path));
app.use(
  '/helpcenter/faq',
  express.static(join(__dirname, '../docs/帮助中心/常见问题/dist')),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

loadApis(app);

const server = app.listen(5001, () => {
  const { address: host, port } = server.address() as AddressInfo;

  // tslint:disable-next-line:no-console
  console.log(
    'newoa-api-mock-server app listening as http://%s:%s',
    host,
    port,
  );
});
