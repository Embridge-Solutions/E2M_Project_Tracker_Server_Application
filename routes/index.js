const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
  { path: `${prefix}role`, file: 'role' },
  { path: `${prefix}scope`, file: 'scope' },
];
module.exports = routes;
