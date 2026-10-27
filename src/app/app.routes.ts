import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/constants/app-routes';

export const routes: Routes = [
  // Pages WITH the shell (top bar + bottom nav)
  {
    path: '',
    loadComponent: () => import('./core/layout/main-shell/main-shell').then((m) => m.MainShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: APP_ROUTES.inbox },
      {
        path: APP_ROUTES.inbox,
        title: 'Inbox',
        loadComponent: () =>
          import('./features/inbox/pages/inbox-page/inbox-page').then((m) => m.InboxPage),
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
    ],
  },

  // Full-screen pages WITHOUT the shell
  {
    path: APP_ROUTES.login,
    title: 'Login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: `${APP_ROUTES.chat}/:id`,
    title: 'Chat',
    loadComponent: () =>
      import('./features/chat/pages/chat-page/chat-page').then((m) => m.ChatPage),
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
