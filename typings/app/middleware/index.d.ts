// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminauth = require('../../../app/middleware/adminauth');
import ExportCrossDomain = require('../../../app/middleware/crossDomain');

declare module 'egg' {
  interface IMiddleware {
    adminauth: typeof ExportAdminauth;
    crossDomain: typeof ExportCrossDomain;
  }
}
