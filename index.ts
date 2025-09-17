import { GET as healthHandler } from './app/api/health/route';

Bun.serve({
  port: 3000,
  routes: {
    '/api/health': healthHandler,
  },
});
