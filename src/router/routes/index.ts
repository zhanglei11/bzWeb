import { RouteRecordRaw } from 'vue-router';
import baseRoutes from './base'; //基础
import pagesRoutes from '@/pages/router'; //基础
import DS from './DS' //基础

const routes: RouteRecordRaw[] = [...baseRoutes, ...pagesRoutes, ...DS]

export default routes;
