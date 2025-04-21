const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
  { path: `${prefix}role`, file: 'role' },
  { path: `${prefix}scope`, file: 'scope' },
  { path: `${prefix}furnace`, file: 'furnace' },
  { path: `${prefix}pouring`, file: 'pouring' },
  { path: `${prefix}downTime`, file: 'downTime' },
];
module.exports = routes;
