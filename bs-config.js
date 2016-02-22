'use strict';

module.exports = {
  ui: false,
  files: [ 'dist/**/*', 'demo/**/*' ],
  server: {
    baseDir: [ 'demo', 'dist' ]
  },
  port: 3000,
  ghostMode: false,
  notify: false,
};
