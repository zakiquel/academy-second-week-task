import { AppRoutes, getRouteMain } from '@/shared/const/router'
import { type RouteProps } from 'react-router-dom'
import {MainPage} from "@/pages/MainPage";
import {NotFoundPage} from "@/pages/NotFoundPage";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />
  }
}
