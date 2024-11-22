import { RouteRecordRaw } from "vue-router";
import { homeRoute } from './modules/home';
import { featureRoute } from './modules/feature';
import { examplesRoute } from './modules/examples';
import { toolsRoute } from './modules/tools';
import { settingRoute } from './modules/setting';
import { profileRoutes } from './modules/profile';

const routeMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  homeRoute,
  featureRoute,
  profileRoutes,
  toolsRoute,
  examplesRoute,
  settingRoute
];

export default routeMap;