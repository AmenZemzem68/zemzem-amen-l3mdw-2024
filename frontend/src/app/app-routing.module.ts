import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'client' }
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
  path: 'reset',
    loadChildren: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
  },

  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'client' }

  },
  {
    path: 'listcommandes',
    loadChildren: () => import('./pages/listcommandes/listcommandes.module').then( m => m.ListcommandesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'client' }
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-agents',
    loadChildren: () => import('./pages/manage-agents/manage-agents.module').then( m => m.ManageAgentsPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-clients',
    loadChildren: () => import('./pages/manage-clients/manage-clients.module').then( m => m.ManageClientsPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-articles',
    loadChildren: () => import('./pages/manage-articles/manage-articles.module').then( m => m.ManageArticlesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-famille',
    loadChildren: () => import('./pages/manage-famille/manage-famille.module').then( m => m.ManageFamillePageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-tables',
    loadChildren: () => import('./pages/manage-tables/manage-tables.module').then( m => m.ManageTablesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'manage-tirasses',
    loadChildren: () => import('./pages/manage-tirasses/manage-tirasses.module').then( m => m.ManageTirassesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'agentui',
    loadChildren: () => import('./pages/agentui/agentui.module').then( m => m.AgentuiPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'agent' }
  },
  {
    path: 'agentcommandes',
    loadChildren: () => import('./pages/agentcommandes/agentcommandes.module').then( m => m.AgentcommandesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'agent' }
  },
  {
    path: 'agentdemandes',
    loadChildren: () => import('./pages/agentdemandes/agentdemandes.module').then( m => m.AgentdemandesPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'agent' }
  },
  
 
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
