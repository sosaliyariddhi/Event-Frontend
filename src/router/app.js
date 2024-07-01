import { lazy } from "react";

const RoutesArray = [
  // ============= UnAuthenticated Routes =============

  {
    path: "/",
    component: lazy(() => import("@page/auth/Login/Login")),
    exact: true,
    type: "unauth",
  },
  {
    path: "/register",
    component: lazy(() => import("@page/auth/Register/Register")),
    exact: true,
    type: "unauth",
  },

  // ============= Auth  Routes =============
  {
    path: "/event",
    component: lazy(() => import("@page/admin/Event/Event")),
    exact: true,
    type: "auth",
  },
  {
    path: "/event/create",
    component: lazy(() => import("@page/admin/Event/EventForm")),
    exact: true,
    type: "auth",
  },
  // ============= Admin  Routes =============
  {
    path: "/organizers",
    component: lazy(() => import("@page/admin/organizers/Organizers")),
    exact: true,
    type: "admin",
  },
 
];

export default RoutesArray;
