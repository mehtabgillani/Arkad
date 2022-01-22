import React from "react";

export const unauthorizedRouteConfigs = [
  {
    path: "/admin/signin",
    component: React.lazy(() => import("../pages/auth/Signin/index")),
  },
  {
    path: "/admin/signup",
    component: React.lazy(() => import("../pages/auth/Signup/index")),
  },
  {
    path: "/admin/forget-password",
    component: React.lazy(() => import("../pages/auth/ForgetPassword")),
  },
  {
    path: "/admin/confirm-signup",
    component: React.lazy(() => import("../pages/auth/ConfirmSignupAwsCognito")),
  },
  {
    path: "/admin/reset-password",
    component: React.lazy(() => import("../pages/auth/ResetPassword/ResetPage")),
  },
  
];
