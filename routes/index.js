const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
  { path: `${prefix}role`, file: 'role' },
  { path: `${prefix}scope`, file: 'scope' },
  { path: `${prefix}master`, file: 'master' },
  { path: `${prefix}comm`, file: 'comm' },
  { path: `${prefix}task`, file: 'taskManager' },
];
module.exports = routes;
