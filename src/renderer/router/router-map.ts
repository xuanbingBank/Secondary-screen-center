import { RouteRecordRaw } from "vue-router";
import { homeRoute } from './modules/home';
import { featureRoute } from './modules/feature';
import { examplesRoute } from './modules/examples';
import { toolsRoute } from './modules/tools';
import { settingRoute } from './modules/setting';

const routeMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  homeRoute,
  featureRoute,
  examplesRoute,
  toolsRoute,
  settingRoute
];

export default routeMap;