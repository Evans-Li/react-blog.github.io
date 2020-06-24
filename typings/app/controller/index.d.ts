// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminIndex = require('../../../app/controller/admin/index');
import ExportDefaultIndex = require('../../../app/controller/default/index');

declare module 'egg' {
  interface IController {
    admin: {
      index: ExportAdminIndex;
    }
    default: {
      index: ExportDefaultIndex;
    }
  }
}
