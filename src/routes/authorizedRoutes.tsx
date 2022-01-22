import React from 'react';

export const authorizedRouteConfigs = [
 
  {
    path: '/admin/dashboard',
    component: React.lazy(() => import('../pages/dashboard')),
  },
  {
    path: '/admin/collections',
    component: React.lazy(() => import('../pages/collections')),
  },
  {
    path: '/admin/collections/view-collection',
    component: React.lazy(() => import('../pages/collections/ViewCollection/index')),
  },
  {
    path: '/admin/battles',
    component: React.lazy(() => import('../pages/battles')),
  },
  {
    path: '/admin/players',
    component: React.lazy(() => import('../pages/players')),
  },
  {
    path: '/admin/players/view-collection',
    component: React.lazy(() => import('../pages/players/ViewCollections/index')),
  },
  {
    path: '/admin/my-account',
    component: React.lazy(() => import('../pages/Account')),
  },
];
