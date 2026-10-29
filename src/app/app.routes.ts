import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';
import { guestGuard } from '@core/guards/guest-guard';
import { APP_ROUTES } from './core/constants/app-routes';

export const routes: Routes = [
  // Full-screen pages WITHOUT the shell
  {
    path: `${APP_ROUTES.agents}/:id`,
    title: 'Agent',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/agents/pages/agent-details-page/agent-details-page').then(
        (m) => m.AgentDetailsPage,
      ),
  },
  {
    path: `${APP_ROUTES.products}/:id`,
    title: 'Product',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/product-details-page/product-details-page').then(
        (m) => m.ProductDetailsPage,
      ),
  },
  // Pages WITH the shell (top bar + bottom nav)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/main-shell/main-shell').then((m) => m.MainShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: APP_ROUTES.inbox },
      {
        path: APP_ROUTES.inbox,
        title: 'Inbox',
        loadComponent: () =>
          import('./features/inbox/pages/inbox-page/inbox-page').then((m) => m.InboxPage),
        children: [
          {
            path: ':id',
            title: 'Chat',
            loadComponent: () =>
              import('./features/chat/pages/chat-page/chat-page').then((m) => m.ChatPage),
          },
        ],
      },
      {
        path: APP_ROUTES.agents,
        title: 'Agents',
        loadComponent: () =>
          import('./features/agents/pages/agents-page/agents-page').then((m) => m.AgentsPage),
      },
      {
        path: APP_ROUTES.products,
        title: 'Products',
        loadComponent: () =>
          import('./features/products/pages/products-page/products-page').then(
            (m) => m.ProductsPage,
          ),
      },
      {
        path: APP_ROUTES.profile,
        title: 'Profile',
        loadComponent: () =>
          import('./features/profile/pages/profile-page/profile-page').then((m) => m.ProfilePage),
      },
    ],
  },

  // Full-screen pages WITHOUT the shell
  {
    path: APP_ROUTES.login,
    title: 'Login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },

  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./features/not-found/pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage,
      ),
  },
];
