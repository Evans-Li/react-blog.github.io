// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminauth = require('../../../app/middleware/adminauth');
import ExportCrossDomain = require('../../../app/middleware/crossDomain');
import ExportLikeauth = require('../../../app/middleware/likeauth');

declare module 'egg' {
  interface IMiddleware {
    adminauth: typeof ExportAdminauth;
    crossDomain: typeof ExportCrossDomain;
    likeauth: typeof ExportLikeauth;
  }
}
