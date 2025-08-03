import { Router } from 'express';
import { UserRoute } from '../app/module/user/user.route';
import { AuthRoute } from '../app/module/auth/auth.route';

const router = Router();

const modelRoute = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/jwt',
    route: AuthRoute,
  },
];

modelRoute.forEach((route) => router.use(route.path, route.route));

export default router;
