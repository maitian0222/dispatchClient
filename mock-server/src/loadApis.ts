import { Express } from 'express';
import menu from './apis/menu.api';
import resourceManagement from './apis/resourceManagement.api';
import courtManagement from './apis/courtManagement.api';
import userManagement from './apis/userManagement.api';
import roleManagement from './apis/roleManagement.api';

import calendarManagement from './apis/calendarManagement.api';
export default function loadApis(app: Express) {
  menu(app);
  resourceManagement(app);
  courtManagement(app);
  userManagement(app);
  roleManagement(app);
  calendarManagement(app);
  userManagement(app);
  // 警告： 放在最后，放在最后，放在最后
}
